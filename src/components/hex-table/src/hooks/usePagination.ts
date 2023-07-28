import { ComputedRef, computed, ref, unref, watch } from 'vue';
import { PaginationProps } from 'ant-design-vue';
import { isBoolean } from '/@/utils/is';
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from '../../const';
import { BasicTableProps } from '../types/table';

export default function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});

  watch(
    () => unref(refProps).pagination,
    (pagination: unknown) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {}),
        };
      }
    },
  );
  /** 是否显示 */
  const show = ref(true);
  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {
      current: 1,
      pageSize: PAGE_SIZE,
      size: 'small',
      defaultPageSize: PAGE_SIZE,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showQuickJumper: true,
      // showTotal: (total) => `总共 ${total} 条`,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    };
  });

  /** 设置分页 */
  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  }

  /** 获取分页 */
  function getPagination() {
    return unref(getPaginationInfo);
  }

  /** 是否显示分页器 */
  function getShowPagination() {
    return unref(show);
  }

  /** 设置是否显示分页器 */
  async function setShowPagination(flag: boolean) {
    show.value = flag;
  }

  return {
    getPagination,
    getPaginationInfo,
    setShowPagination,
    getShowPagination,
    setPagination,
  };
}
