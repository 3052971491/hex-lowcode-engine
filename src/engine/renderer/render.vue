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
import { computed, defineComponent, inject, onMounted, provide, ref } from 'vue';
import type { LowCode } from '/@/types/schema.d';
import PcRender from './pc/pc-render.vue';
import MobileRender from './mobile/mobile-render.vue';
import { useHexCore, HexCoreFactory } from './central/useHexCore';
import { RedactStateInjectionKey, HexCoreInjectionKey, DataEngineInjectionKey } from './render-inject-key';

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
  provide(DataEngineInjectionKey, {});
  core.buildProjectConfig(props.value);
  if (core.state.projectConfig) {
    modelValue.value = core.state.projectConfig;
  }
}
provide(HexCoreInjectionKey, core);

onMounted(() => {
  setTimeout(() => {
    pageSpinning.value = false;
  }, 500);
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'HexFormRender',
});
</script>

<style lang="less" scoped>
@import '/@/engine/components/hex-draggable/hex-draggable.less';

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
