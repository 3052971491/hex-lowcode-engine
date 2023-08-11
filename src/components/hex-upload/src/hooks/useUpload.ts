import { ComputedRef, Ref, computed, onUnmounted, ref, unref } from 'vue';
import { FetchParams, HexUploadProps, UploadActionType } from '../types';

export function useUploadType(propsRef: ComputedRef<HexUploadProps>) {
  // 文件类型限制
  const getAccept = computed((): string[] => {
    const { accept } = unref(propsRef);
    if (accept && accept.length > 0) {
      return accept;
    }
    return [];
  });

  const getStringAccept = computed(() => {
    return unref(getAccept)
      .map((item) => {
        if (item.indexOf('/') > 0 || item.startsWith('.')) {
          return item;
        }
        return `.${item}`;
      })
      .join(',');
  });

  // 支持jpg、jpeg、png格式，不超过2M，最多可选择10张图片，。
  const getHelpText = computed(() => {
    const { accept, maxCount, maxFileSize } = unref(propsRef);
    const helpTexts: string[] = [];

    if (unref(accept).length > 0) {
      helpTexts.push('component.upload.accept');
    }

    if (maxFileSize) {
      helpTexts.push('component.upload.maxSize');
    }

    if (maxCount && maxCount !== Infinity) {
      helpTexts.push('component.upload.maxCount');
    }
    return helpTexts.join(', ');
  });
  return { getAccept, getStringAccept, getHelpText };
}

export default function useTable(
  tableProps: Partial<HexUploadProps>,
): [(instance: UploadActionType) => void, UploadActionType] {
  const tableRef = ref<UploadActionType | null>(null);
  const loadedRef = ref<boolean | null>(false);

  function register(instance: UploadActionType) {
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

  function getTableInstance(): UploadActionType {
    const table = unref(tableRef);
    if (!table) {
      // eslint-disable-next-line no-console
      console.error(
        'The Upload instance has not been obtained yet, please make sure the Upload is presented when performing the table operation!',
      );
    }
    return table as UploadActionType;
  }

  const methods: UploadActionType = {
    reload: async (opt?: FetchParams) => {
      return getTableInstance().reload(opt);
    },
    setProps: (props: Partial<HexUploadProps>) => {
      getTableInstance().setProps(props);
    },
  };
  return [register, methods];
}
