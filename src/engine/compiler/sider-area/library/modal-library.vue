<template>
  <div class="element-library">
    <a-skeleton active :loading="loading">
      <a-space class="w-full">
        <a-input-search class="w-full" placeholder="搜索" enter-button></a-input-search>
        <a-button type="primary">添加</a-button>
      </a-space>
      <div class="w-full p-3">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无"></a-empty>
      </div>
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import type { LowCode } from '/@/types/schema.d';
import { Empty } from 'ant-design-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';

const core = inject(HexCoreInjectionKey);
const state = reactive({
  type: '',
});
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped></style>
