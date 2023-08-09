<template>
  <div class="hex-upload">
    <a-spin tip="Loading..." :spinning="isUploadingRef">
      <a-upload
        :file-list="fileListRef"
        name="file"
        v-bind="getBindValues"
        :before-upload="beforeUpload"
        @remove="handleRemove"
        @download="handleDownload"
      >
        <!-- 为空时显示 -->
        <div
          v-if="!getBindValues.disabled"
          class="w-full h-full"
          :class="[getProps.listType === 'picture-card' ? 'picture-card-container' : '']"
        >
          <template v-if="getProps.listType === 'picture-card'">
            <div class="item">
              <a-button block> 选择文件 </a-button>
            </div>
            <div class="item">
              <a-button :disabled="!getIsSelectFile" block @click.stop="handleStartUpload()">
                <upload-outlined />
                上传
              </a-button>
            </div>
          </template>
          <template v-else>
            <a-space>
              <a-button>
                <upload-outlined />
                选择文件
              </a-button>
              <a-button :disabled="!getIsSelectFile" @click.stop="handleStartUpload()">
                <upload-outlined />
                上传
              </a-button>
            </a-space>
          </template>
        </div>
        <template v-else></template>
      </a-upload>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, unref, watch } from 'vue';
import { UploadOutlined } from '@ant-design/icons-vue';
import { message, type UploadProps } from 'ant-design-vue';
import { FileItem, HexUploadProps, UploadActionType, UploadResultStatus } from './types';
import useDataSource from './hooks/useDataSource';
import { buildUUID } from '/@/utils/common';
import { checkImgType, getBase64WithFile } from './helper';
import { useLocale } from '/@/hooks/use-loacle';
import { isArray, isFunction } from '/@/utils/is';
import { useUploadType } from './hooks/useUpload';
import { downloadByUrl } from '/@/utils/file/download';

const { t } = useLocale();
interface Props {
  value: string[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits(['update:value', 'register', 'delete', 'change']);

const innerPropsRef = ref<Partial<HexUploadProps>>();

const getProps = computed(() => {
  return { ...props, ...unref(innerPropsRef) } as HexUploadProps;
});

const getBindValues = computed(() => {
  return {
    // ...unref(getProps),
    disabled: unref(getProps).disabled,
    maxCount: unref(getProps).maxCount,
    listType: unref(getProps).listType,
    multiple: unref(getProps).multiple,
    accept: unref(getStringAccept),
  } as any;
});

const { getStringAccept } = useUploadType(getProps);
const { fileListRef, isUploadingRef, reload, getIsSelectFile } = useDataSource(getProps);

const modelValue = computed<any[]>({
  set(val) {
    emit('update:value', val);
    emit('change', val);
  },
  get() {
    if (!isArray(unref(props.value))) return [];
    return unref(props.value)
      .filter((item) => !!item)
      .map((item) => {
        return {
          uuid: `File_${buildUUID()}`,
          status: UploadResultStatus.SUCCESS,
          url: item,
          type: item.split('.').pop() || '',
          name: item.split('/').pop() || '',
          thumbUrl: item,
        };
      });
  },
});
watch(
  modelValue,
  (val) => {
    fileListRef.value = modelValue.value;
  },
  {
    deep: true,
    immediate: true,
  },
);

const beforeUpload: UploadProps['beforeUpload'] = (file, fileList) => {
  const { size, name } = file;
  const { maxFileSize: maxSize, maxCount } = unref(getProps);

  // 设置最大值，则判断
  if (maxSize && file.size / 1024 / 1024 >= maxSize) {
    message.error(t(`component.upload.maxSize: ${maxSize}`));
    return false;
  }

  const commonItem = {
    uuid: `File_${buildUUID()}`,
    file,
    size,
    name,
    percent: 0,
    type: name.split('.').pop(),
    status: UploadResultStatus.UPLOADING,
  };

  // 修改最后一个文件信息
  // 生成图片缩略图
  if (!!maxCount && fileListRef.value.length >= maxCount) {
    const deleteNumber = fileListRef.value.length + 1 - maxCount;
    if (deleteNumber > 0) {
      fileListRef.value.splice(maxCount - 1, deleteNumber);
    }
  }
  if (checkImgType(file)) {
    getBase64WithFile(file).then(({ result: thumbUrl }) => {
      fileListRef.value.push({
        thumbUrl,
        ...commonItem,
      });
    });
  } else {
    fileListRef.value.push(commonItem);
  }
  return false;
};

// 删除
function handleRemove(record: FileItem) {
  const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid);
  if (index !== -1) {
    fileListRef.value.splice(index, 1);
  }
  emit('delete', record);
  handleOk(fileListRef.value);
}

function handleDownload(record: any) {
  // 下载
  const { url = '' } = record;
  downloadByUrl({ url });
}

async function uploadApiByItem(item: Partial<FileItem>) {
  const { api } = unref(getProps);
  if (!api || !isFunction(api)) {
    return message.warn('upload api must exist and be a function');
  }
  try {
    item.status = UploadResultStatus.UPLOADING;
    const ret = await api({
      data: {},
      file: item.file,
      name: item.name,
    });
    item.status = UploadResultStatus.SUCCESS;
    item.responseData = ret;
    return {
      success: true,
      error: null,
      content: ret,
    };
  } catch (e) {
    item.status = UploadResultStatus.ERROR;
    return {
      success: false,
      error: e,
      content: null,
    };
  }
}

// 点击开始上传
async function handleStartUpload() {
  const { maxCount } = unref(getProps);
  if (fileListRef.value.length > (maxCount || 1)) {
    return message.warning(`最大上传数量: ${maxCount}`);
  }
  try {
    isUploadingRef.value = true;
    // 只上传不是成功状态的
    const uploadFileList = fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || [];
    const data = await Promise.all(
      uploadFileList.map((item) => {
        return uploadApiByItem(item);
      }),
    );
    isUploadingRef.value = false;
    handleOk(data);
    // 生产环境:抛出错误
    const errorList = data.filter((item: any) => !item.success);
    if (errorList.length > 0) throw errorList;
  } catch (e) {
    isUploadingRef.value = false;
    throw e;
  }
}

//   点击保存
function handleOk(data: any[]) {
  const fileList: string[] = [];
  data.forEach((item) => {
    if (item.success || item.status === UploadResultStatus.SUCCESS) {
      fileList.push(item.content || item.url);
    }
  });

  // 存在一个上传成功的即可保存
  if (fileList.length > 0) {
    modelValue.value = fileList;
  }
}

function setProps(option: Partial<HexUploadProps>) {
  innerPropsRef.value = { ...unref(innerPropsRef), ...option };
}

const uploadAction: UploadActionType = {
  setProps,
  reload,
};

onMounted(() => {
  emit('register', uploadAction);
});
</script>

<style lang="less" scoped>
.hex-upload {
  .ant-upload-drag-icon {
    margin-bottom: 16px;
  }

  .ant-upload-text {
    margin: 0 0 4px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.88);
  }

  .ant-upload-hint {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }

  .picture-card-container {
    display: flex;
    flex-direction: column;

    .item {
      width: 100%;
      flex: 1;
      height: 100%;

      :deep(.ant-btn) {
        height: 100%;
      }
    }
  }

  :deep(.ant-upload.ant-upload-select) {
    border-width: 0;
    background-color: transparent;

    &:hover {
      border-color: transparent;
      cursor: default;
    }
  }
}
</style>
