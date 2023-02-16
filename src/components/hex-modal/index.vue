<template>
  <modal
    v-bind="$props"
    :mask-closable="maskClosable"
    :destroy-on-close="true"
    :width="fullscreen ? '100%' : width"
    :wrap-class-name="fullscreen ? 'full-modal' : 'other-modal'"
    :closable="false"
    @ok="handleOkClick"
    @cancel="handleCancelClick"
  >
    <template #title>
      <div class="hex-modal-title flex justify-between items-center">
        <div>{{ name }}</div>
        <div class="flex justify-between items-center">
          <fullscreen-exit-outlined v-if="fullscreen" class="svg-icon" @click="handleCloseFullScreenClick" />
          <fullscreen-outlined v-else class="svg-icon" @click="handleOpenFullScreenClick" />
          <CloseOutlined class="svg-icon ml-3" @click="handleCancelClick"></CloseOutlined>
        </div>
      </div>
    </template>
    <slot></slot>
    <template #footer>
      <template v-if="isFooter">
        <a-button @click="handleCancelClick">取消</a-button>
        <a-button type="primary" @click="handleOkClick">确认</a-button>
      </template>
    </template>
  </modal>
</template>

<script lang="ts" setup>
import { Modal } from 'ant-design-vue';
import { FullscreenExitOutlined, FullscreenOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { ref, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: '预览',
  },
  visible: {
    type: Boolean,
    default: false,
  },
  /** 点击蒙层是否允许关闭 */
  maskClosable: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 900,
  },
  isFooter: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['ok', 'cancel', 'update:visible']);
const fullscreen = ref(false);
watch(
  () => props.visible,
  (val) => {
    if (val) {
      fullscreen.value = false;
    }
  },
);
/** 开启全屏 */
function handleOpenFullScreenClick() {
  fullscreen.value = true;
}
/** 关闭全屏 */
function handleCloseFullScreenClick() {
  fullscreen.value = false;
}
/** 确认回调 */
function handleOkClick() {
  emit('ok');
  // emit('update:visible', false);
}
/** 取消回调 */
function handleCancelClick() {
  emit('cancel');
  emit('update:visible', false);
}
</script>
<style lang="less">
.full-modal {
  width: 100%;

  .ant-modal {
    top: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    margin: 0;
    width: 100% !important;
    min-width: 100%;
    height: 100%;

    &-content {
      display: flex;
      overflow: hidden;
      height: calc(100vh);
      flex-direction: column;

      .ant-modal-body {
        overflow: auto;
        flex: 1;
      }
    }
  }
}

.other-modal {
  height: 100%;

  .ant-modal {
    top: 100px;
    bottom: 0;
    overflow: hidden;
    padding-bottom: 0;
    height: 100%;
    max-height: calc(100vh - 200px);

    &-content {
      display: flex;
      height: 100%;
      flex-direction: column;

      .ant-modal-body {
        overflow: auto;
        height: 100%;
        max-height: calc(100vh - 250px);
      }
    }
  }
}

.other-modal {
  height: 100%;

  .ant-modal {
    top: 100px;
    bottom: 0;
    overflow: hidden;
    padding-bottom: 0;
    height: 100%;
    max-height: calc(100vh - 200px);

    &-content {
      // display: flex;
      overflow: auto;
      // height: 100%;
      // flex-direction: column;
      .ant-modal-body {
        flex: 1;
        overflow: auto;
      }
    }
  }
}

.hex-modal-title {
  .svg-icon {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.75);
    }
  }
}
</style>
