<template>
  <div class="hex-modal-helper-action btn-group">
    <div class="arco-modal-fullscreen-btn">
      <span class="arco-icon-hover">
        <FullscreenOutlined v-if="!fullscreen" class="arco-icon" @click="aaa" />
        <FullscreenExitOutlined v-else class="arco-icon" @click="aaa" />
      </span>
    </div>
    <div class="arco-modal-close-btn">
      <span class="arco-icon-hover">
        <CloseOutlined class="arco-icon arco-icon-close" @click="onCancel" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FullscreenOutlined, FullscreenExitOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    onCancel: any;
    onFullscreen: any;
  }>(),
  {},
);
const fullscreen = ref(false);
function aaa(e: Event) {
  e?.stopPropagation();
  e?.preventDefault();
  fullscreen.value = !fullscreen.value;
  props.onFullscreen(e);
}
</script>

<style lang="less" scoped>
.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;

  .arco-icon {
    &:hover {
      color: rgba(0, 0, 0, 0.75);
    }
  }
}
</style>
