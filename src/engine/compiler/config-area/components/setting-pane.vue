<template>
  <div class="w-full h-full">
    <template v-if="core?.state.selectedData?.selectedId">
      <div class="settings-navigator">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" @click="handleSelectComponent(item)">
            <a href="JavaScript:void(0)">{{ item.componentName }}</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="settings-content">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div class="w-full h-full p-3 flex justify-center items-center">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无数据"></a-empty>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup name="setting-area">
import { inject, computed } from 'vue';
import { Empty } from 'ant-design-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { LowCode } from '/@/types/schema';

const core = inject(HexCoreInjectionKey);
const breadcrumbs = computed(() => {
  return (
    core?.state.selectedData?.breadcrumbs
      .filter((item, index) => {
        return index < 3;
      })
      .reverse() ?? []
  );
});

const handleSelectComponent = (schema: LowCode.Schema) => {
  if (schema.id === core?.state.selectedData?.selectedId) return;
  core?.handleUpdateSelectData(schema);
};
</script>

<style lang="less" scoped>
.settings-navigator {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 6px 0.5rem;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
  background-color: #fff;
}
</style>
