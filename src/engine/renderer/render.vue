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
import { RuntimeDataSourceConfig } from '/@/types/data-source/data-source-runtime';
import { Modal } from '/@/schema/common/schema';
import { PcSchema } from '/@/schema/common/interface';
import { localeContextKey } from '/@/hooks/use-loacle';
import zhCn from '/@/locale/lang/zh-CN';
import en from '/@/locale/lang/en';

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
  redactState: false,
  config: () => {
    return {};
  },
});

const emit = defineEmits(['update:value', 'update:config']);

const lowcodeOptions = computed({
  set(val) {
    emit('update:config', val);
  },
  get() {
    return props.config;
  },
});

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
        instanceCore?.setInstance(new Modal(item as PcSchema.ModalSchema));
      });
    }
    // 注册当前视图实例
    instanceCore?.setInstance(modelValue.value);
  }
}
const i18n = computed(() => {
  return modelValue.value?.config.i18n === 'zh-CN' ? zhCn : en;
});

provide(HexCoreInjectionKey, core);
provide(DataEngineInjectionKey, null);
provide(ElementInstanceInjectionKey, instanceCore);
provide(localeContextKey, i18n as any);

/** 全局变量 */
const GlobalVariables: Record<string, unknown> = {};
/** 远程API */
const RemoteAPI: RuntimeDataSourceConfig[] = [];

if (!props.redactState && core?.state) {
  core.state.projectConfig?.dataSource?.list.forEach((item) => {
    if (item.protocal === 'VALUE') {
      GlobalVariables[item.name] = item.initialData;
    } else {
      RemoteAPI.push(item);
    }
  });
  const __this__ = new Context(instanceCore!, GlobalVariables, RemoteAPI);
  core.state.__this__ = __this__;
}

onBeforeUnmount(() => {
  if (!props.redactState) {
    removeGlobalStyle();
  }
});

onMounted(() => {
  nextTick(() => {
    if (!props.redactState) {
      registerGlobalStyle(core?.state.__css__);
      if (modelValue.value && lowcodeOptions.value) {
        Object.assign(modelValue.value.config, lowcodeOptions.value);
      }
      runtimeDataSource(RemoteAPI).then(() => {
        pageSpinning.value = false;
      });
    } else {
      pageSpinning.value = false;
    }
  });
});

function runtimeDataSource(remotes: RuntimeDataSourceConfig[]) {
  return new Promise((resolve) => {
    core?.state?.__this__?.reloadDataSource();
    resolve(true);
  });
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'HexLowcodeEngineRenderer',
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
