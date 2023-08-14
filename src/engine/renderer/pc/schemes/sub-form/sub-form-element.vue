<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <HexTable @register="register">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column">
          <template v-if="column.dataIndex === 'action'">
            <TableAction :actions="tableAction(column, record, index)" />
          </template>
          <template v-else-if="column.dataIndex === 'no'">
            <template v-if="isBoolean(methods.getPaginationRef())">
              {{ index + 1 }}
            </template>
            <template v-else>
              {{
                ((methods.getPaginationRef() as any).current - 1) * (methods.getPaginationRef() as any).pageSize +
                index +
                1
              }}
            </template>
          </template>
          <template v-else>
            <component
              :is="`${findSchemaByField(column.dataIndex).componentType}Element`"
              :schema="findSchemaByField(column.dataIndex)"
              :parent-schema="state.schema"
              :parent-schema-list="state.schema.children"
              :index-of-parent-list="index"
            />
          </template>
        </template>
      </template>
    </HexTable>
    <a-button block @click="onAddItemData">新增一行</a-button>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, onMounted, reactive, ref, unref, watch } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';
import { isBoolean } from '/@/utils/is';
import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';
import { ActionItem, BasicColumn, BasicTableProps, HexTable, TableAction } from '/@/components/hex-table';
import useTable from '/@/components/hex-table/src/hooks/useTable';
import { BasicColumnDto } from '/@/schema/common/schema';

interface Props {
  schema: PcSchema.SubFormScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const state = reactive({
  schema: props.schema,
});

const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.SubFormScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.SubFormScheme>(props.schema, dataEngine);

const prop = computed(
  () =>
    ectypeProps((obj: PcSchema.SubFormSchemeProps) => {
      return {
        title: obj.title,
        rowKey: obj.rowKey,
        bordered: obj.bordered,
        columns: obj.columns,
        actionItem: obj.actionItem,
        noPadding: obj.noPadding,
      };
    }) as PcSchema.SubFormSchemeProps,
);

// 此处监听属性变化, 并比较第一层差异进行赋值
watch(
  prop,
  (newVal) => {
    //  因为setProps会重新覆盖整个表格配置, 且列配置是动态生成的, 所以将columns排除
    const { columns, ...opt } = newVal;
    methods.setProps(opt as unknown as Partial<BasicTableProps>);
  },
  {
    deep: true,
  },
);

/** 渲染真实的列配置 */
const realColumns = computed(() => {
  return [
    ...unref(prop).columns,
    ...unref(props.schema).children.map((item) => {
      return new BasicColumnDto({
        title: item.props?.label,
        dataIndex: item.props?.field,
      }) as BasicColumn;
    }),
  ];
});

// 监听children是否变化, 变化即更新表格列配置
// 期望: 只存在编辑状态下
watch(props.schema.children, (val) => {
  methods.setColumns([
    ...unref(prop).columns,
    ...val.map((item) => {
      return new BasicColumnDto({
        title: item.props?.label,
        dataIndex: item.props?.field,
      }) as BasicColumn;
    }),
  ]);
});

const [register, methods] = useTable({
  title: (unref(prop).title || '') as string,
  rowKey: unref(prop).rowKey,
  immediate: true,
  api: () => {
    return Promise.resolve(modelValue.value);
  },
  bordered: unref(prop).bordered,
  columns: unref(realColumns),
  noPadding: unref(prop).noPadding,
});

/** 操作列配置 */
const tableAction = computed(() => (column: BasicColumn, record: any, index: number) => {
  return prop.value.actionItem.map((item) => {
    const { events, ...option } = item;
    const result: ActionItem = { ...option };
    // 动作
    const opt: any = {};

    return {
      ...result,
      ...opt,
    };
  });
});

/** 根据字段名找出子表单-children中的Schema配置 */
const findSchemaByField = computed(() => (filterValue: string) => {
  return unref(ectype).children?.find((item) => item.props?.field === filterValue)!;
});

const onAddItemData = () => {
  modelValue.value.push({
    id: '123',
    Field_jQiN1e2N: '123123',
  });
};

onMounted(() => {
  // 替换原型方法
  unref(ectype).getValue = () => {
    return unref(modelValue);
  };
  unref(ectype).setValue = (data: any) => {
    modelValue.value = data;
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'SubFormElement',
});
</script>
<style lang="less" scoped>
:deep(.ant-form-item) {
  margin-bottom: 0;
}
:deep(.ant-form-item-label) {
  display: none;
}
</style>
