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
  }
}

provide(HexCoreInjectionKey, core);
provide(DataEngineInjectionKey, null);
provide(ElementInstanceInjectionKey, instanceCore);

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      pageSpinning.value = false;
      if (!props.redactState) {
        registerGlobalStyle(core?.state.__css__);
      }
    }, 50);
  });
});
onBeforeUnmount(() => {
  if (!props.redactState) {
    removeGlobalStyle();
  }
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
