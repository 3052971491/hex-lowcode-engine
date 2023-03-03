<template>
  <div class="pc-render w-full h-full">
    <!-- 编辑模式 -->
    <template v-if="redactState">
      <hex-draggable v-model:value="modelValue.componentsTree" class="w-full h-full" @add="onAdd" @update="onUpdate">
        <template #item="{ element, index }">
          <div class="item hex-draggable-handle">
            <component
              :is="`${element.componentType}Element`"
              :schema="element"
              :parent-schema="modelValue"
              :parent-schema-list="modelValue.componentsTree"
              :index-of-parent-list="index"
            ></component>
          </div>
        </template>
      </hex-draggable>
    </template>
    <!-- 预览模式 -->
    <template v-else>
      <div v-for="(item, index) in modelValue.componentsTree" :key="item.id">
        <component
          :is="`${item.componentType}Element`"
          :schema="item"
          :parent-schema="modelValue"
          :parent-schema-list="modelValue.componentsTree"
          :index-of-parent-list="index"
        ></component>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject, provide, reactive } from 'vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { HexCoreInjectionKey, ComponentBreadcrumbs } from '/@/engine/renderer/render-inject-key';
import { useComponentBreadcrumbs } from './hooks/useComponentBreadcrumbs';

const core = inject(HexCoreInjectionKey);

interface Props {
  value: LowCode.ProjectSchema;
  /** 当前渲染器是否是编辑状态 */
  redactState?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  redactState: false,
});
const emit = defineEmits(['update:value']);

const modelValue = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  },
});

const onAdd = ({ newIndex }: { newIndex: number }) => {
  if (core?.state.projectConfig?.componentsTree[newIndex]) {
    core?.handleUpdateSelectData(core?.state.projectConfig?.componentsTree[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};

// 面包屑开始的地方
const breadcrumbs = useComponentBreadcrumbs([]);
provide(ComponentBreadcrumbs, breadcrumbs);
</script>

<style lang="less" scoped></style>
