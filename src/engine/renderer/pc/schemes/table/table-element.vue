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
import { ActionItem, BasicColumn, BasicTableProps, HexTable, TableAction } from '/@/components/hex-table';
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
        actionItem: obj.actionItem,
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
    if (!core?.state.__this__) return Promise.reject(new Error(`内部错误: 未检测到全局上下文`));
    return core?.state.__this__?.http(unref(prop).api, params, 'id');
  },
  rowKey: unref(prop).rowKey,
  bordered: unref(prop).bordered,
  columns: unref(prop).columns,
  rowSelection: unref(prop).rowSelection,
});

/** 操作列配置 */
const tableAction = computed(() => (column: BasicColumn, record: any, index: number) => {
  return prop.value.actionItem.map((item) => {
    const { events, ...option } = item;
    const result: ActionItem = { ...option };
    // 动作
    const opt: any = {};
    if (events && core) {
      for (const key in events) {
        if (Object.prototype.hasOwnProperty.call(events, key)) {
          const element = events[key];
          if (element.events.length > 0) {
            element.events.forEach((i: any) => {
              if (core?.state.__js__[i.name]) {
                opt[key] = core.state.__js__[i.name].bind(
                  { ...core.context(), params: JSON.parse(i.params) },
                  { column, record, index },
                );
              }
            });
          }
        }
      }
    }
    return {
      ...result,
      ...opt,
    };
  });
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'TableElement',
});
</script>

<style lang="less" scoped></style>
