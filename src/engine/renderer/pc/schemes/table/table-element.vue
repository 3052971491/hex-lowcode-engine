<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <HexTable @register="register">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'action'">
          <TableAction
            :actions="[
              {
                label: '编辑',
                onClick: () => handleEdit(record),
              },
              {
                label: '删除',
                onClick: () => handleDelete(record),
              },
            ]"
          />
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
      </template>
      <!--  -->
    </HexTable>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { defineComponent, ref, computed, unref, watch, inject } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

import { isBoolean } from '/@/utils/is';
import { BasicTableProps, HexTable, TableAction } from '/@/components/hex-table';
import useTable from '/@/components/hex-table/src/hooks/useTable';

interface Props {
  schema: PcSchema.TableSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const core = inject(HexCoreInjectionKey);

const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectype, ectypeProps } = useElement<PcSchema.TableSchema>(props, __instance__);

const prop = computed(
  () =>
    ectypeProps((obj: PcSchema.TableSchemaProps) => {
      return {
        title: obj.title,
        api: obj.api,
        rowKey: obj.rowKey,
        bordered: obj.bordered,
        columns: obj.columns,
        rowSelection: obj.rowSelection,
      };
    }) as PcSchema.TableSchemaProps,
);

// 此处监听属性变化, 并比较第一层差异进行赋值
watch(
  prop,
  (newVal) => {
    console.log(newVal);

    methods.setProps(newVal as unknown as Partial<BasicTableProps>);
  },
  {
    deep: true,
  },
);

const [register, methods] = useTable({
  title: unref(prop).title,
  api: (params = {}) => {
    console.log(params);

    const arr = [];
    const total = 100;
    for (let index = 0; index < total; index++) {
      arr.push({
        id: `${index}`,
        userName: '好想看樱花',
        name: '俊杰',
        surname: '袁',
        emailAddress: '3052971491@qq.com',
      });
    }
    return Promise.resolve({
      content: arr,
      totalPages: total,
    });
    // if (!core?.state.__this__) return Promise.reject(new Error(`内部错误: 未检测到全局上下文`));
    // return core?.state.__this__?.http(unref(prop).api, params, 'id');
  },
  rowKey: unref(prop).rowKey,
  bordered: unref(prop).bordered,
  columns: unref(prop).columns,
  actionColumn: {
    width: 160,
    title: '操作栏',
    fixed: 'right',
    align: 'center',
    dataIndex: 'action',
  },
  rowSelection: unref(prop).rowSelection,
});
const handleDelete = ({ record }: any) => {
  console.log(record);
};
const handleEdit = ({ record }: any) => {
  console.log(record);
};
</script>

<script lang="ts">
export default defineComponent({
  name: 'TableElement',
});
</script>

<style lang="less" scoped></style>
