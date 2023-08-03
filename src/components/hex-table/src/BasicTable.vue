<template>
  <div ref="wrapRef" class="dynamic-table">
    <div class="main padding-0">
      <div ref="table" class="basic-table">
        <div class="basic-table-container">
          <div class="basic-table-header">
            <div class="title">
              <span>{{ getProps.title || '' }}</span>
            </div>
            <template v-if="getProps.showTableSetting">
              <TableSettings :setting="getProps.tableSetting"></TableSettings>
            </template>
          </div>
          <a-table
            :height="extraHeight"
            v-bind="getBindValues"
            :row-selection="getBindRowSelectionValues"
            @change="handleTableChangeClick"
          >
            <template v-for="item in Object.keys($slots)" #[item]="data" :key="item">
              <slot :name="item" v-bind="data || {}"> </slot>
            </template>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, unref, toRaw } from 'vue';
import ResizeObserver from 'resize-observer-polyfill';
import TableSettings from './components/TableSetting.vue';
// eslint-disable-next-line import/no-cycle
import { BasicTableProps, Recordable, TableActionType, TableSetting } from '../index';

import useLoading from './hooks/useLoading';
import useRowSelection from './hooks/useRowSelection';
import usePagination from './hooks/usePagination';
import useColumns from './hooks/useColumns';
import useDataSource from './hooks/useDataSource';
import useTableForm from './hooks/useTableForm';
import { createTableContext } from './hooks/useTableContext';

interface Props {
  title?: string;
  loading?: boolean;
  /** 立即请求接口 */
  immediate?: boolean;
  showTableSetting?: boolean;
  tableSetting?: TableSetting;
  size?: string;
  clickToRowSelect?: boolean;
  autoCreateKey?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  loading: false,
  immediate: true,
  showTableSetting: true,
  size: 'small',
  clickToRowSelect: true,
  autoCreateKey: true,
});

const emit = defineEmits(['fetch-success', 'fetch-error', 'selection-change', 'register', 'rowClick']);

const wrapRef = ref(null);
const innerPropsRef = ref<Partial<BasicTableProps>>();

const tableData = ref<Recordable[]>([]);

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
});

const { getLoading, setLoading } = useLoading(getProps);

// 分页
const { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination } =
  usePagination(getProps);
// 选择行数据

const {
  getRowSelection,
  getRowSelectionRef,
  getSelectRows,
  clearSelectedRowKeys,
  getSelectRowKeys,
  deleteSelectRowByKey,
  setSelectedRowKeys,
} = useRowSelection(getProps, tableData, emit);

// 数据
const { getDataSourceRef, reload, fetch, getRowKey } = useDataSource(
  getProps,
  {
    getPaginationInfo,
    setLoading,
    setPagination,
  },
  emit,
);
// 列
const { getViewColumns, getColumns, setCacheColumnsByField, setColumns, getCacheColumns } = useColumns(getProps); // getPaginationInfo

const { handleSearchInfoChange } = useTableForm(getProps, fetch);

const table = ref<HTMLElement>();

const getBindValues = computed(() => {
  const dataSource = unref(getDataSourceRef);
  return {
    // ...unref(getProps),
    size: unref(getProps).size,
    loading: unref(getLoading),
    columns: toRaw(unref(getViewColumns)),
    pagination: toRaw(unref(getPaginationInfo)),
    dataSource,
    rowKey: unref(getRowKey),
    scroll: {
      y: '600px',
      x: '100%',
    },
    bordered: unref(getProps).bordered,
  } as any;
});

const getBindRowSelectionValues = computed(() => {
  if (!unref(getRowSelectionRef)) return null;
  return {
    ...unref(getRowSelectionRef),
    onChange: handleTableRowClick,
  };
});

const noPaddingStyle = computed(() => {
  return unref(getProps).noPadding ? '0px' : `8px 0px`;
});

/** 点击行选择器时触发 */
function handleTableSelect(rowKeys: (string | number)[]) {
  setSelectedRowKeys(rowKeys);
}

/** 点击行数据时触发 */
function handleTableRowClick(selectedRowKeys: any[], selectedRows: any[]) {
  if (getProps.value.clickToRowSelect) {
    clearSelectedRowKeys();
    selectedRows.forEach((item) => {
      const key = item[unref(getRowKey) as any];
      if (getRowSelectionRef.value?.selectedRowKeys?.includes(key)) {
        deleteSelectRowByKey(key);
      } else {
        getRowSelectionRef.value?.selectedRowKeys?.push(key);
      }
    });
  }
  emit('rowClick', selectedRows);
}

function handlePageChangeClick(page: number) {
  setPagination({ current: page });
  reload();
}

function handlePageSizeChangeClick(pageSize: number) {
  setPagination({ pageSize });
  reload();
}

function handleTableChangeClick(pagination: { pageSize: number; current: number }, filters: any, sorter: any) {
  setPagination(pagination);
  reload();
}

const loading = ref(false);
const extraHeight = ref(100);
const resize = () => {
  if (table?.value) {
    const observer = new ResizeObserver((entries) => {
      loading.value = true;
      extraHeight.value = 100;
      setTimeout(() => {
        entries.forEach((entry) => {
          const { height } = entry.contentRect;
          extraHeight.value = Math.trunc(height) - 120 ?? 100;
        });
        loading.value = false;
      }, 0);
    });
    observer.observe(table?.value);
  }
};

function setProps(option: Partial<BasicTableProps>) {
  innerPropsRef.value = { ...unref(innerPropsRef), ...option };
}

const tableAction: TableActionType = {
  reload,
  getSelectRows,
  clearSelectedRowKeys,
  getSelectRowKeys,
  deleteSelectRowByKey,
  setPagination,
  // setTableData,
  // updateTableDataRecord,
  // deleteTableDataRecord,
  // insertTableDataRecord,
  // findTableDataRecord,
  // redoHeight,
  setSelectedRowKeys,
  setColumns,
  setLoading,
  // getDataSource,
  // getRawDataSource,
  setProps,
  getRowSelection,
  getPaginationRef: getPagination,
  getColumns,
  getCacheColumns,
  // updateTableData,
  setShowPagination,
  getShowPagination,
  setCacheColumnsByField,
  // expandAll,
  // collapseAll,
  getSize: () => {
    return unref(getBindValues).size;
  },
};

createTableContext({ ...tableAction, wrapRef, getBindValues });
onMounted(() => {
  resize();
  emit('register', tableAction);
});
</script>

<style lang="less" scoped>
.padding-0 {
  padding: 0 !important;
}

.dynamic-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .button-group {
    margin-bottom: 8px;
  }

  .main {
    padding: 0;
    padding-top: 0;

    .g-query {
      border-bottom: 1px solid var(--color-neutral-3);
    }

    .basic-table {
      flex: 1;
      overflow: hidden;
      // padding: 0 8px;

      .basic-table-container {
        padding: v-bind(noPaddingStyle);
        width: 100%;
        height: auto;
        background-color: var(--color-bg-2);

        .basic-table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;

          .title {
            font-size: 16px;
            font-weight: 500;
            color: #000000d9;
            line-height: 24px;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.spin-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
