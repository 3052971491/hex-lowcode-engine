<template>
  <div class="element-wrapper" :class="schema.props?.className">
    <template v-if="isPreview">
      <ElementEditWrapper
        v-if="schema?.tag !== 'LAYOUT'"
        :schema="schema"
        :parent-schema="parentSchema"
        :parent-schema-list="parentSchemaList"
        :index-of-parent-list="indexOfParentList"
      >
        <slot></slot>
      </ElementEditWrapper>
      <ContainerEditWrapper
        v-else
        :schema="schema"
        :parent-schema="parentSchema"
        :parent-schema-list="parentSchemaList"
        :index-of-parent-list="indexOfParentList"
      >
        <slot></slot>
      </ContainerEditWrapper>
    </template>
    <template v-else>
      <ElementViewWrapper v-show="!isHidden" :schema="schema">
        <template v-if="isDefault">
          <slot></slot>
        </template>
        <template v-else-if="isReadonly"> {{ getReadonlyData }} </template>
      </ElementViewWrapper>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject, provide, watch } from 'vue';
import ElementEditWrapper from './element-edit-wrapper.vue';
import ContainerEditWrapper from './container-edit-wrapper.vue';
import ElementViewWrapper from './element-view-wrapper.vue';
import { useElementWrapper } from '../hooks/useElementWrapper';
import {
  HexCoreInjectionKey,
  RedactStateInjectionKey,
  ComponentBreadcrumbs,
  DataEngineInjectionKey,
} from '/@/engine/renderer/render-inject-key';
import { useComponentBreadcrumbs } from '../hooks/useComponentBreadcrumbs';
import { useElementDataEngine } from '../hooks/useElementDataEngine';

interface Props {
  schema: LowCode.Schema;
  parentSchema: LowCode.Schema;
  parentSchemaList: LowCode.Schema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});

const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);
const breadcrumbs = inject(ComponentBreadcrumbs);
const dataEngine = inject(DataEngineInjectionKey);

// 开始一次新的面包屑, 由于赋值是引用类型, 所以不影响属性面板修改
const arr = breadcrumbs?.getBreadcrumbs().slice();
const componentBreadcrumbs = useComponentBreadcrumbs(arr);
componentBreadcrumbs.setBreadcrumbs(props.schema);
provide(ComponentBreadcrumbs, componentBreadcrumbs);
if (core?.state.selectedData) {
  // 此处watch是了更新面包屑, 缺陷是每个组件都会有一个watch, 消耗性能
  // 此处待优化
  watch(core?.state.selectedData, () => {
    if (core?.state.selectedData?.selectedId === props.schema.id) {
      core.handleUpdateBreadcrumbs(core?.state.selectedData?.selectedId ? componentBreadcrumbs.getBreadcrumbs() : []);
    }
  });
}

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});

const { isSelect, isDefault, isPreview, isReadonly, isHidden } = useElementWrapper(
  props.schema,
  selectedScheme.value,
  redactState,
);

const { getReadonlyData } = useElementDataEngine<LowCode.Schema>(props.schema, dataEngine);
</script>
