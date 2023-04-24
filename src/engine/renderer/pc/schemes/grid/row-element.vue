<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-row ref="__instance__" v-bind="prop" :class="[ectype.props.className]">
      <template v-if="schema?.children && schema?.children?.length > 0">
        <ColumnElement
          v-for="(item, index) in schema.children"
          :key="item.id"
          :schema="item"
          :parent-schema="schema"
          :parent-schema-list="schema.children"
          :index-of-parent-list="index"
        ></ColumnElement>
      </template>
    </a-row>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { LowCode } from '/@/types/schema.d';
import { PcSchema } from '/@/schema/common/interface';
import ElementWrapper from '../../components/element-wrapper.vue';
import ColumnElement from './column-element.vue';
import { defineComponent, computed, inject, ref } from 'vue';
import { RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElement } from '../../hooks/useElement';

const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.RowScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectype, ectypeProps } = useElement<PcSchema.RowScheme>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj) => {
    return {
      align: obj.align,
      justify: obj.justify,
      wrap: obj.wrap,
      gutter: [`${obj.rowGutter}`, `${obj.columnGutter}`],
    };
  }),
);

const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'RowElement',
});
</script>
