import { ComputedRef, Ref, computed, nextTick, ref, toRaw, unref, watch } from 'vue';
// import { TableRowSelection } from 'ant-design-vue';

import { BasicTableProps, EmitType, Recordable } from '../types/table';
import { ROW_KEY } from '../../const';

export default function useRowSelection(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  emit: EmitType,
) {
  const selectedRowKeysRef = ref<(string | number)[]>([]);
  const selectedRowRef = ref<Recordable[]>([]);

  function setSelectedRows(rows: Recordable[]) {
    selectedRowRef.value = rows;
  }

  function clearSelectedRowKeys() {
    selectedRowRef.value = [];
    selectedRowKeysRef.value = [];
  }

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
  });

  function deleteSelectRowByKey(key: string) {
    const selectedRowKeys = unref(selectedRowKeysRef);
    const index = selectedRowKeys.findIndex((item) => item === key);
    if (index !== -1) {
      unref(selectedRowKeysRef).splice(index, 1);
    }
  }

  function setSelectedRowKeys(rowKeys: (string | number)[]) {
    if (!rowKeys) {
      clearSelectedRowKeys();
      return;
    }
    selectedRowKeysRef.value = rowKeys;
    const trueSelectedRows: any[] = [];

    const allSelectedRows = toRaw(unref(tableData)).concat(toRaw(unref(selectedRowRef)));
    rowKeys.forEach((key: string | number) => {
      const found = allSelectedRows.find((item) => item[unref(getRowKey) as string] === key);
      if (found) {
        trueSelectedRows.push(found);
      }
    });

    setSelectedRows(trueSelectedRows);
  }

  function getSelectRowKeys() {
    return unref(selectedRowKeysRef);
  }

  function getSelectRows<T = Recordable>() {
    return unref(selectedRowRef) as T[];
  }

  const getRowSelectionRef = computed(() => {
    const { rowSelection } = unref(propsRef);
    if (!rowSelection) {
      return null;
    }

    return {
      ...rowSelection,
      selectedRowKeys: unref(selectedRowKeysRef),
    };
  });

  function getRowSelection() {
    return unref(getRowSelectionRef);
  }

  watch(
    () => unref(propsRef).rowSelection?.selectedRowKeys,
    (v) => {
      setSelectedRowKeys(v as any);
    },
  );

  watch(
    () => unref(selectedRowKeysRef),
    () => {
      nextTick(() => {
        emit('selection-change', {
          keys: getSelectRowKeys(),
          rows: getSelectRows(),
        });
      });
    },
    { deep: true },
  );

  return {
    getRowSelection,
    getRowSelectionRef,
    getSelectRows,
    clearSelectedRowKeys,
    getSelectRowKeys,
    deleteSelectRowByKey,
    setSelectedRowKeys,
  };
}
