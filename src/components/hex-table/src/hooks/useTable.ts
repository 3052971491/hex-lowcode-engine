import { onUnmounted, ref, toRaw, unref } from 'vue';
import { PaginationProps } from 'ant-design-vue';
import { BasicColumn, BasicTableProps, FetchParams, TableActionType } from '../types/table';

export default function useTable(
  tableProps: Partial<BasicTableProps>,
): [(instance: TableActionType) => void, TableActionType] {
  const tableRef = ref<TableActionType | null>(null);
  const loadedRef = ref<boolean | null>(false);

  function register(instance: TableActionType) {
    onUnmounted(() => {
      tableRef.value = null;
      loadedRef.value = null;
    });

    if (unref(loadedRef) && instance === unref(tableRef)) return;
    tableRef.value = instance;
    if (tableProps) {
      instance.setProps(tableProps);
    }
    loadedRef.value = true;
  }

  function getTableInstance(): TableActionType {
    const table = unref(tableRef);
    if (!table) {
      // eslint-disable-next-line no-console
      console.error(
        'The table instance has not been obtained yet, please make sure the table is presented when performing the table operation!',
      );
    }
    return table as TableActionType;
  }

  const methods: TableActionType = {
    reload: async (opt?: FetchParams) => {
      return getTableInstance().reload(opt);
    },
    setProps: (props: Partial<BasicTableProps>) => {
      getTableInstance().setProps(props);
    },
    // redoHeight: () => {
    //   getTableInstance().redoHeight();
    // },
    setLoading: (loading: boolean) => {
      getTableInstance().setLoading(loading);
    },
    // getDataSource: () => {
    //   return getTableInstance().getDataSource();
    // },
    // getRawDataSource: () => {
    //   return getTableInstance().getRawDataSource();
    // },
    getColumns: ({ ignoreIndex = false }: { ignoreIndex?: boolean } = {}) => {
      const columns = getTableInstance().getColumns({ ignoreIndex }) || [];
      return toRaw(columns);
    },
    setColumns: (columns: BasicColumn[]) => {
      getTableInstance().setColumns(columns);
    },
    // setTableData: (values: any[]) => {
    //   return getTableInstance().setTableData(values);
    // },
    setPagination: (info: Partial<PaginationProps>) => {
      return getTableInstance().setPagination(info);
    },
    deleteSelectRowByKey: (key: string) => {
      getTableInstance().deleteSelectRowByKey(key);
    },
    getSelectRowKeys: () => {
      return toRaw(getTableInstance().getSelectRowKeys());
    },
    getSelectRows: () => {
      return toRaw(getTableInstance().getSelectRows());
    },
    clearSelectedRowKeys: () => {
      getTableInstance().clearSelectedRowKeys();
    },
    setSelectedRowKeys: (keys: (string | number)[]) => {
      getTableInstance().setSelectedRowKeys(keys);
    },
    getPaginationRef: () => {
      return getTableInstance().getPaginationRef();
    },
    getSize: () => {
      return toRaw(getTableInstance().getSize());
    },
    // updateTableData: (index: number, key: string, value: any) => {
    //   return getTableInstance().updateTableData(index, key, value);
    // },
    // deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => {
    //   return getTableInstance().deleteTableDataRecord(rowKey);
    // },
    // insertTableDataRecord: (
    //   record: Recordable | Recordable[],
    //   index?: number
    // ) => {
    //   return getTableInstance().insertTableDataRecord(record, index);
    // },
    // updateTableDataRecord: (rowKey: string | number, record: Recordable) => {
    //   return getTableInstance().updateTableDataRecord(rowKey, record);
    // },
    // findTableDataRecord: (rowKey: string | number) => {
    //   return getTableInstance().findTableDataRecord(rowKey);
    // },
    getRowSelection: () => {
      return toRaw(getTableInstance().getRowSelection());
    },
    getCacheColumns: () => {
      return toRaw(getTableInstance().getCacheColumns());
    },
    // getForm: () => {
    //   return unref(formRef) as unknown as FormActionType;
    // },
    setShowPagination: async (show: boolean) => {
      getTableInstance().setShowPagination(show);
    },
    getShowPagination: () => {
      return toRaw(getTableInstance().getShowPagination());
    },
    // expandAll: () => {
    //   getTableInstance().expandAll();
    // },
    // collapseAll: () => {
    //   getTableInstance().collapseAll();
    // },
  };
  return [register, methods];
}
