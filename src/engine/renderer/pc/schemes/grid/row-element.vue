<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-row v-bind="ectypeProps">
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
import { computed, defineComponent, inject } from 'vue';
import { cloneDeep } from 'lodash-es';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCode } from '/@/types/schema.d';
import ColumnElement from './column-element.vue';
import { RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { PcSchema } from '/@/schema/common/interface';

const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.RowScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});

const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  if (!ectype.value) return {};
  const obj = ectype.value.props;
  if (!obj) return {};
  return {
    align: obj.align,
    justify: obj.justify,
    wrap: obj.wrap,
    gutter: [`${obj.rowGutter}`, `${obj.columnGutter}`],
  };
});

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
<style lang="less" scoped></style>
