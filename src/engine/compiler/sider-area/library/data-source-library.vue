<template>
  <div class="element-library">
    <a-skeleton active :loading="loading">
      <a-row :gutter="[0, 6]">
        <a-col :span="24">
          <a-space class="w-full">
            <a-select v-model:value="state.type" style="width: 80px">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="VALUE">变量</a-select-option>
              <a-select-option value="REMOTE">远程</a-select-option>
            </a-select>
            <a-input-search class="w-full" placeholder="搜索" enter-button></a-input-search>
          </a-space>
        </a-col>
        <a-col :span="24">
          <a-button type="primary">添加</a-button>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import type { LowCode } from '/@/types/schema.d';
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
