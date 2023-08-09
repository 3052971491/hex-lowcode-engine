import { computed, ComputedRef, ref, unref } from 'vue';
import { UploadProps } from 'ant-design-vue';
import { FetchParams, FileItem, HexUploadProps, Recordable, UploadResultStatus } from '../types';

export default function useDataSource(propsRef: ComputedRef<HexUploadProps>) {
  const dataSourceRef = ref<UploadProps['fileList']>([]);
  const fileListRef = ref<Partial<FileItem>[]>([]);
  //   是否正在上传
  const isUploadingRef = ref(false);

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef);
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef);
    }
    return unref(dataSourceRef);
  });

  const getIsSelectFile = computed(() => {
    return (
      fileListRef.value.length > 0 && !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
    );
  });

  async function fetch(opt?: FetchParams) {
    //
    console.log('回显数据');
  }

  function reload(opt?: FetchParams) {
    return fetch(opt);
  }

  return { isUploadingRef, dataSourceRef, getDataSourceRef, fileListRef, getIsSelectFile, reload };
}
