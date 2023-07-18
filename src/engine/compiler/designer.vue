<template>
  <a-config-provider>
    <a-layout class="hex-lowcode-engine-compiler">
      <sider-area></sider-area>
      <a-layout>
        <a-layout-content class="hex-lowcode-engine-compiler-content">
          <toolbar-area ref="toolbar" class="toolbar"></toolbar-area>
          <main-area></main-area>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="360" theme="light">
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
import { localeContextKey } from '/@/hooks/use-loacle';
import zhCn from '/@/locale/lang/zh-CN';
import en from '/@/locale/lang/en';
import { useKeyboard } from '/@/hooks/use-keyboard';

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

const lowcodeOptions = computed({
  set(val) {
    emit('update:config', val);
  },
  get() {
    return props.config;
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

const i18n = computed(() => {
  return modelValue.value?.config.i18n === 'zh-CN' ? zhCn : en;
});
provide(localeContextKey, i18n as any);

if (modelValue.value && lowcodeOptions.value) {
  Object.assign(modelValue.value.config, lowcodeOptions.value);
}

const { registerKeyboard } = useKeyboard(core, i18n);

onMounted(() => {
  registerKeyboard();
});
</script>
<script lang="ts">
export default defineComponent({
  name: 'HexLowcodeEngineCompiler',
});
</script>

<style lang="less" scoped>
.hex-lowcode-engine-compiler {
  width: 100%;
  height: 100%;

  &-content {
    display: flex;
    flex-direction: column;
    margin: 0.5rem;

    .toolbar {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
../../hooks/use-locale
