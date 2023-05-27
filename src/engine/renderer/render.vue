<template>
  <a-spin wrapper-class-name="engine-render" :spinning="pageSpinning">
    <!-- PC 渲染器 -->
    <template v-if="device === 'PC'">
      <pc-render v-model:value="modelValue" :redact-state="redactState" />
    </template>
    <!-- Mobile 渲染器 -->
    <template v-else>
      <mobile-render />
    </template>
  </a-spin>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue';
import type { LowCode } from '/@/types/schema.d';
import PcRender from './pc/pc-render.vue';
import MobileRender from './mobile/mobile-render.vue';
import { useHexCore, HexCoreFactory } from './central/useHexCore';
import { useInstanceCore, InstanceCoreFactory } from './central/useInstanceCore';
import {
  RedactStateInjectionKey,
  HexCoreInjectionKey,
  DataEngineInjectionKey,
  ElementInstanceInjectionKey,
} from './render-inject-key';
import { run, registerGlobalStyle, removeGlobalStyle } from '/@/utils/func';
import { Context } from '/@/utils/utils';
import { Scheme } from '/@/schema/common/FieldSchemaBase';

interface Props {
  value?: LowCode.ProjectSchema;
  /** 设备类型 */
  device?: LowCode.Device;
  /** 当前渲染器是否是编辑状态 */
  redactState?: boolean;
}

interface StateType {
  config?: LowCode.ProjectSchema;
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  device: 'PC',
  redactState: false,
});
const emit = defineEmits(['update:value']);
let core: HexCoreFactory | undefined;
let instanceCore: InstanceCoreFactory | undefined;
const modelValue = computed({
  get() {
    return core?.state.projectConfig;
  },
  set(val) {
    if (core?.state.projectConfig) {
      emit('update:value', core.state.projectConfig);
    }
  },
});

const pageSpinning = ref(true);
provide(RedactStateInjectionKey, props.redactState);
if (props.redactState) {
  core = inject(HexCoreInjectionKey);
} else {
  core = useHexCore();
  instanceCore = useInstanceCore();
  core.buildProjectConfig(props.value);
  if (core.state.projectConfig) {
    modelValue.value = core.state.projectConfig;

    // 运行JS-Function
    const result = run(modelValue.value?.originCode ?? '');
    core.state.__js__ = result;

    // 注册模态框Schema
    if (core.state.projectConfig.dialogComponentsTree.length > 0) {
      core.state.projectConfig.dialogComponentsTree.forEach((item) => {
        instanceCore?.setInstance(new Scheme(item));
      });
    }
    // 注册当前视图实例
    instanceCore?.setInstance(modelValue.value);
  }
}

provide(HexCoreInjectionKey, core);
provide(DataEngineInjectionKey, null);
provide(ElementInstanceInjectionKey, instanceCore);

if (!props.redactState && core?.state) {
  registerGlobalStyle(core?.state.__css__);

  // 实例, 全局变量, 远程API
  console.log(core.state.projectConfig?.dataSource);

  const __this__ = new Context(instanceCore!);
  core.state.__this__ = __this__;
}

onBeforeUnmount(() => {
  if (!props.redactState) {
    removeGlobalStyle();
  }
});

onMounted(() => {
  nextTick(() => {
    pageSpinning.value = false;
  });
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'HexFormRender',
});
</script>

<style lang="less" scoped>
@import '/@/components/hex-draggable/hex-draggable.less';

:deep(.hex-draggable) {
  height: 100%;
}

.engine-render {
  width: 100%;
  height: 100%;

  :deep(.ant-spin-container) {
    height: 100%;
  }

  :deep(.ant-spin-spinning) {
    max-height: 100%;
  }
}
</style>
