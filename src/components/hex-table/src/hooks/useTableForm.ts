import { ComputedRef, unref } from 'vue';
import { isFunction } from '/@/utils/is';
import { BasicTableProps, FetchParams, Recordable } from '../types/table';

export default function useTableForm(
  propsRef: ComputedRef<BasicTableProps>,
  fetch: (opt?: FetchParams | undefined) => Promise<void>,
) {
  function handleSearchInfoChange(info: Recordable) {
    const { handleSearchInfoFn } = unref(propsRef);
    if (handleSearchInfoFn && isFunction(handleSearchInfoFn)) {
      info = handleSearchInfoFn(info) || info;
    }
    fetch({ searchInfo: info, page: 1 });
  }
  return {
    handleSearchInfoChange,
  };
}
