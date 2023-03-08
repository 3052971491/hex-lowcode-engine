<template>
  <div class="w-full h-full">
    <a-form
      layout="horizontal"
      label-align="left"
      :label-wrap="true"
      :label-col="{
        style: { width: '70px' },
      }"
    >
      <!-- 基础 -->
      <template v-for="(item, index) in currentFieldAttributes" :key="index">
        <component :is="getAttrEditorName(item)" :label="item.label" :attribute="item.name" :option="item" />
      </template>
      <!-- 高级 -->
      <collapse-Item-wrapper
        v-if="currentFieldAdvancedAttributes && currentFieldAdvancedAttributes.length > 0"
        label="高级"
      >
        <template v-for="(item, index) in currentFieldAdvancedAttributes" :key="'Advanced' + index">
          <component :is="getAttrEditorName(item)" :label="item.label" :attribute="item.name" :option="item" />
        </template>
      </collapse-Item-wrapper>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject } from 'vue';
import { AttributeItem } from '../attribute-editor/interface';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { editor } from '../attribute-editor/register-glob-comp';
import Attributes from '../attribute-editor/index';
import CollapseItemWrapper from './collapse-item-wrapper.vue';

const core = inject(HexCoreInjectionKey);

/**  当前选中组件的属性值集合 */
const currentFieldAttributes = computed(() => {
  if (!core?.state.selectedData?.selectedScheme) {
    return [];
  }
  const arr = Attributes[core?.state.selectedData?.selectedScheme?.componentType!]?.filter((item) => {
    return !item.hasOwnProperty('advanced');
  });
  return arr;
});

/**  当前选中组件的高级属性值集合 */
const currentFieldAdvancedAttributes = computed(() => {
  if (!core?.state.selectedData?.selectedScheme) {
    return [];
  }
  const arr = Attributes[core?.state.selectedData?.selectedScheme?.componentType!]?.filter((item) => {
    return item.hasOwnProperty('advanced') && item.advanced;
  });
  return arr;
});

// 获取选中组件属性
// const element = computed(() => {
//   return core?.state.selectedData?.selectedScheme;
// });

/** 获取属性编辑器名称 */
const getAttrEditorName = computed(() => (item: AttributeItem): string => {
  if (item.merge) return `${item.type}-${item.editor}`;
  return item.editor;
});
</script>
<script lang="ts">
export default defineComponent({
  components: { ...editor },
});
</script>
<style lang="less" scoped></style>
