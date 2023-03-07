<template>
  <div class="element-library">
    <a-skeleton active :loading="loading">
      <a-space class="w-full">
        <a-input-search class="w-full" placeholder="搜索" enter-button></a-input-search>
        <a-button type="primary" @click="onAdd">添加</a-button>
      </a-space>
      <div v-if="state.list.length < 1" class="w-full p-3">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无"></a-empty>
      </div>
      <template v-else>
        <a-list item-layout="vertical" :data-source="state.list" class="overflow-auto">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.description">
                <template #title>
                  <a href="#">{{ item.title }}</a>
                </template>
              </a-list-item-meta>
              <template #actions>
                <CopyOutlined />
                <EditOutlined />
                <DeleteOutlined />
              </template>
            </a-list-item>
          </template>
        </a-list>
      </template>
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref, watch } from 'vue';
import type { LowCode } from '/@/types/schema.d';
import { Empty } from 'ant-design-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons-vue';

const core = inject(HexCoreInjectionKey);
const state = reactive({
  type: '',
  list: [] as any[],
});
/** 新增模态框或者抽屉 */
function onAdd() {
  state.list.push(
    { id: 'Model_qw9j1hi', title: '用户新增模态框', description: '用于新增用户和编辑用户的弹框' },
    { id: 'Model_hj9j4ho', title: '菜单新增模态框', description: '--' },
  );
}
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped>
.element-library {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
