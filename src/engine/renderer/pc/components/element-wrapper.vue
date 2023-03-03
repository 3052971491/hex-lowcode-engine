<template>
  <div class="element-wrapper">
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
      <ElementViewWrapper :schema="schema">
        <template v-if="isDefault">
          <div v-show="!isHidden">
            <slot></slot>
          </div>
        </template>
        <template v-else-if="isReadonly"> 只读状态(待完善) </template>
      </ElementViewWrapper>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject, provide } from 'vue';
import ElementEditWrapper from './element-edit-wrapper.vue';
import ContainerEditWrapper from './container-edit-wrapper.vue';
import ElementViewWrapper from './element-view-wrapper.vue';
import { useElementWrapper } from '../hooks/useElementWrapper';
import {
  HexCoreInjectionKey,
  RedactStateInjectionKey,
  ComponentBreadcrumbs,
} from '/@/engine/renderer/render-inject-key';
import { useComponentBreadcrumbs } from '../hooks/useComponentBreadcrumbs';
import { cloneDeep } from 'lodash';

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

// 开始一次新的面包屑, 由于赋值是引用类型, 所以不影响属性面板修改
const arr = breadcrumbs?.getBreadcrumbs().slice();
const componentBreadcrumbs = useComponentBreadcrumbs(arr);
componentBreadcrumbs.setBreadcrumbs(props.schema);
provide(ComponentBreadcrumbs, componentBreadcrumbs);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});

const { isSelect, isDefault, isPreview, isReadonly, isHidden } = useElementWrapper(
  props.schema,
  selectedScheme.value,
  redactState,
);
</script>