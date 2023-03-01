<template>
  <ElementWrapper :schema="schema" :class="classMap">
    <a-row v-bind="ectypeProps" class="p-1">
      <template v-if="schema?.children && schema?.children?.length > 0">
        <ColumnElement v-for="item in schema.children" :key="item.id" :schema="item"></ColumnElement>
      </template>
    </a-row>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCodeSchema } from '/@/types/schema.d';
import ColumnElement from './column-element.vue';

interface Props {
  schema: LowCodeSchema.PCSchema;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});

const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  if (!ectype.value) return {};
  const obj = ectype.value.props;
  return {
    align: obj.align,
    justify: obj.justify,
    wrap: obj.wrap,
    gutter: [`${obj.rowGutter}`, `${obj.columnGutter}`],
  };
});

const classMap = computed(() => {
  return ['border'];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'RowElement',
});
</script>
<style lang="less" scoped>
.border {
  border: 1px #00000073 dashed;
}
</style>
