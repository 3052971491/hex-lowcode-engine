<template>
  <div class="modal-main">
    <template v-if="contentSchema">
      <div v-for="(item, index) in contentSchema.children" :key="item.id">
        <component
          :is="`${item.componentType}Element`"
          :schema="item"
          :parent-schema="contentSchema"
          :parent-schema-list="contentSchema.children"
          :index-of-parent-list="index"
        />
      </div>
    </template>
  </div>
  <div class="modal-footer">
    <template v-if="footerSchema">
      <div v-for="(item, index) in footerSchema.children" :key="item.id">
        <template v-if="true">
          <component
            :is="`${item.componentType}Element`"
            :schema="item"
            :parent-schema="footerSchema"
            :parent-schema-list="footerSchema.children"
            :index-of-parent-list="index"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed, getCurrentInstance, onMounted, nextTick } from 'vue';
import { LowCode } from '/@/types/schema';
import useModal from '/@/utils/shared/modal-helper';

import {
  RedactStateInjectionKey,
  HexCoreInjectionKey,
  DataEngineInjectionKey,
  ElementInstanceInjectionKey,
  ComponentBreadcrumbs,
} from '/@/engine/renderer/render-inject-key';
import { Modal } from '/@/schema/common/schema';
import { useHexCore } from '../../../central/useHexCore';
import { useInstanceCore } from '../../../central/useInstanceCore';
import { useComponentBreadcrumbs } from '../../hooks/useComponentBreadcrumbs';
import { Context } from '/@/utils/utils';
import { run } from '/@/utils/func';
import { PcSchema } from '/@/schema/common/interface';
import { RuntimeDataSourceConfig } from '/@/types/data-source/data-source-runtime';

const props = defineProps<{
  modalRef: any;
  schema: LowCode.Schema;
  redactState: boolean;
  projectSchema: LowCode.ProjectSchema;
}>();
const core = useHexCore();
const instanceCore = useInstanceCore();
const breadcrumbs = useComponentBreadcrumbs([]);

provide(RedactStateInjectionKey, props.redactState);
provide(HexCoreInjectionKey, core);
provide(DataEngineInjectionKey, null);
provide(ElementInstanceInjectionKey, instanceCore);
provide(ComponentBreadcrumbs, breadcrumbs);

core.buildProjectConfig(props.projectSchema);

const { success, close } = useModal(props);

// 替换原型链
Modal.prototype.close = close;
Modal.prototype.success = success;
const ectype = computed(() => {
  return new Modal(props.schema as PcSchema.ModalSchema);
});

/** 全局变量 */
const GlobalVariables: Record<string, unknown> = {};
/** 远程API */
const RemoteAPI: RuntimeDataSourceConfig[] = [];
if (core.state.projectConfig) {
  // 运行JS-Function
  const result = run(props.projectSchema?.originCode ?? '');
  core.state.__js__ = result;

  core.state.projectConfig?.dataSource?.list.forEach((item) => {
    if (item.protocal === 'VALUE') {
      GlobalVariables[item.name] = item.initialData;
    } else {
      RemoteAPI.push(item);
    }
  });
  const __this__ = new Context(instanceCore!, GlobalVariables, RemoteAPI);
  core.state.__this__ = __this__;

  // 注册当前视图实例
  instanceCore?.setInstance(props.projectSchema);

  // 注册当前实例
  instanceCore?.setInstance(ectype.value);
}

const contentSchema = computed(() => {
  return props.schema?.children && props.schema?.children[0];
});

const footerSchema = computed(() => {
  return props.schema?.children && props.schema?.children[1];
});
</script>
