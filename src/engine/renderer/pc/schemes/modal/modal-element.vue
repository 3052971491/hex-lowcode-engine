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
        <component
          :is="`${item.componentType}Element`"
          :schema="item"
          :parent-schema="footerSchema"
          :parent-schema-list="footerSchema.children"
          :index-of-parent-list="index"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue';
import { LowCode } from '/@/types/schema';
import useModal from '/@/utils/shared/modal-helper';

import {
  RedactStateInjectionKey,
  HexCoreInjectionKey,
  DataEngineInjectionKey,
  ElementInstanceInjectionKey,
  ComponentBreadcrumbs,
} from '/@/engine/renderer/render-inject-key';
import { useHexCore } from '../../../central/useHexCore';
import { useInstanceCore } from '../../../central/useInstanceCore';
import { useComponentBreadcrumbs } from '../../hooks/useComponentBreadcrumbs';
import { Context } from '/@/utils/utils';
import { run } from '/@/utils/func';

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
if (core.state.projectConfig) {
  // 运行JS-Function
  const result = run(props.projectSchema?.originCode ?? '');
  core.state.__js__ = result;

  const __this__ = new Context(instanceCore!);
  core.state.__this__ = __this__;

  // 注册当前视图实例
  instanceCore?.setInstance(props.projectSchema);
}

const contentSchema = computed(() => {
  return props.schema?.children && props.schema?.children[0];
});

const footerSchema = computed(() => {
  return props.schema?.children && props.schema?.children[1];
});

const { success, close } = useModal(props);
function onSubmit() {}
</script>
