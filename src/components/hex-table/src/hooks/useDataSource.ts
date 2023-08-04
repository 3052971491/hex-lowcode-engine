import { ComputedRef, computed, onMounted, reactive, ref, unref } from 'vue';
import { PaginationProps } from 'ant-design-vue';
import { cloneDeep, get, merge } from 'lodash';
import { useTimeoutFn } from '@vueuse/core';
import { isBoolean, isFunction } from '/@/utils/is';
import { buildUUID } from '/@/utils/common';
import { BasicTableProps, EmitType, FetchParams, Recordable } from '../types/table';
import { FETCH_SETTING, NO_KEY, PAGE_SIZE, ROW_KEY } from '../../const';

interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  //   getFieldsValue: () => Recordable;
  //   clearSelectedRowKeys: () => void;
  //   tableData: Ref<Recordable[]>;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}

export default function useDataSource(
  propsRef: ComputedRef<BasicTableProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
  }: // getFieldsValue,
  // clearSelectedRowKeys,
  // tableData,
  ActionType,
  emit: EmitType,
) {
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });
  const dataSourceRef = ref<Recordable[]>([]);
  const rawDataSourceRef = ref<Recordable>({});

  async function fetch(opt?: FetchParams) {
    const { api, searchInfo, defSort, beforeFetch, afterFetch, pagination, fetchSetting } = unref(propsRef);
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = {
        ...FETCH_SETTING,
        ...fetchSetting,
      };
      let pageParams: Recordable = {};

      const { current = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo) as PaginationProps;

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || current;
        pageParams[sizeField] = pageSize;
      }

      const { sortInfo = {}, filterInfo } = searchState;

      let params: Recordable = merge(
        pageParams,
        // useSearchForm ? getFieldsValue() : {},
        searchInfo,
        opt?.searchInfo ?? {},
        defSort,
        sortInfo,
        filterInfo,
        opt?.sortInfo ?? {},
        opt?.filterInfo ?? {},
      );
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params;
      }

      const res = await api(params);
      rawDataSourceRef.value = res;

      const isArrayResult = Array.isArray(res);

      let resultItems: any = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? 0 : get(res, totalField);

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems)) || resultItems;
      }
      dataSourceRef.value = resultItems;
      setPagination({
        total: resultTotal || 0,
      });
      if (opt && opt.page) {
        setPagination({
          current: opt.page || 1,
        });
      }
      emit('fetch-success', {
        items: unref(resultItems),
        total: resultTotal,
      });
      // eslint-disable-next-line consistent-return
      return resultItems;
    } catch (error) {
      emit('fetch-error', error);
      dataSourceRef.value = [];
      setPagination({
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) return;
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = buildUUID();
      }
      if (item.children && item.children.length) {
        setTableKey(item.children);
      }
    });
  }

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
  });

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0];
      const lastItem = dataSource[dataSource.length - 1];

      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY] || !firstItem[NO_KEY] || !lastItem[NO_KEY]) {
          const data = cloneDeep(unref(dataSourceRef));
          data.forEach((item, index) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = buildUUID();
            }
            if (!item[NO_KEY]) {
              if (!unref(propsRef).pagination) {
                item[NO_KEY] = index + 1;
              } else {
                const { current = 1, pageSize = PAGE_SIZE } = unref(getPaginationInfo) as PaginationProps;
                item[NO_KEY] = (current - 1) * pageSize + (index + 1);
              }
            }
            if (item.children && item.children.length) {
              setTableKey(item.children);
            }
          });
          dataSourceRef.value = data;
        }
      }
    }
    return unref(dataSourceRef);
  });
  function reload(opt?: FetchParams) {
    return fetch(opt);
  }
  onMounted(() => {
    useTimeoutFn(() => {
      if (unref(propsRef).immediate) {
        fetch();
      }
    }, 16);
  });
  return {
    getDataSourceRef,
    // getDataSource,
    // getRawDataSource,
    getRowKey,
    // setTableData,
    getAutoCreateKey,
    fetch,
    reload,
    // updateTableData,
    // updateTableDataRecord,
    // deleteTableDataRecord,
    // insertTableDataRecord,
    // findTableDataRecord,
    // handleTableChange
  };
}
