<template>
  <a-config-provider>
    <a-layout class="hex-editor w-full h-full">
      <sider-area></sider-area>
      <a-layout>
        <a-layout-content class="m-2 flex flex-col">
          <toolbar-area class="mb-2"></toolbar-area>
          <main-area></main-area>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="332" theme="light">
        <config-area></config-area>
      </a-layout-sider>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { computed, defineComponent, onMounted, provide } from 'vue';
import SiderArea from './sider-area/index.vue';
import MainArea from './main-area/index.vue';
import ToolbarArea from './toolbar-area/index.vue';
import ConfigArea from './config-area/index.vue';
import { useHexCore } from '/@/engine/renderer/central/useHexCore';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { LowCode } from '/@/types/schema';

interface Props {
  value?: LowCode.ProjectSchema;
  /** 设备类型 */
  device?: LowCode.Device;
  /** 当前渲染器是否是编辑状态 */
  redactState?: boolean;
  /** 引擎配置 */
  config?: {
    /** 语言 */
    i18n?: string;
    /** 绝对 URL */
    remoteUrl?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  device: 'PC',
  redactState: true,
  config: () => {
    return {};
  },
});
const emit = defineEmits(['update:value', 'update:config']);
const core = useHexCore();
provide(HexCoreInjectionKey, core);

const lowcodeOptions = computed<{
  /** 当前语种 */
  i18n: string;
}>({
  set(val) {
    emit('update:config', val);
  },
  get() {
    return { i18n: 'zh-CN', remoteUrl: 'http://www.baodu.com', ...props.config };
  },
});

const modelValue = computed({
  get() {
    return core?.state.projectConfig;
  },
  set(val) {
    if (core?.state.projectConfig) {
      core.state.projectConfig = val;
      emit('update:value', val);
    }
  },
});

core.buildProjectConfig(modelValue.value);
core.buildHistory();
core.buildSelectedData();
core.loadHistoryDataStorage();
if (modelValue.value && lowcodeOptions.value) {
  modelValue.value.config = lowcodeOptions.value;
}
</script>
<script lang="ts">
export default defineComponent({
  name: 'HexFormEditor',
});
</script>

<style lang="less">
@import '/@/styles/hex-lowcode-engine.less';
</style>
