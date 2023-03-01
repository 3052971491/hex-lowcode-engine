<template>
  <div class="element-library">
    <a-skeleton active :loading="loading">
      <div v-for="(menu, i) in elementList" :key="i" class="w-full mb-6">
        <div class="text-lg font-bold mb-2">{{ menu.label }}</div>
        <template v-if="menu.list.length > 0">
          <hex-draggable
            v-model:value="menu.list"
            pull="clone"
            :put="false"
            :sort="false"
            ghost-class=""
            :clone="onClone"
          >
            <template #item="{ element }">
              <div class="hex-draggable-handle" @dblclick="handleAddElementDbClick(element)">
                <div class="item">{{ element.componentName }}</div>
              </div>
            </template>
          </hex-draggable>
        </template>
        <template v-else>
          <div class="w-full p-3">
            <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无组件"></a-empty>
          </div>
        </template>
      </div>
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue';
import { Empty } from 'ant-design-vue';
import type { LowCodeSchema } from '/@/types/schema.d';
import HexDraggable from '../hex-draggable/hex-draggable.vue';
import { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents } from '/@/schema/pc';
import { buildElementSchema } from '/@/utils/draggable-api';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';

interface ElementList {
  /** 组件类型名称 */
  label: string;
  /** 组件列表 */
  list: LowCodeSchema.Schema[];
}

const core = inject(HexCoreInjectionKey);

const elementList: ElementList[] = [
  { label: '基础控件', list: BasicComponents },
  {
    label: '业务控件',
    list: BusinessComponents,
  },
  {
    label: '布局控件',
    list: LayoutComponents.filter((item) => {
      if (item.hasOwnProperty('internal')) {
        return item.internal;
      }
      return true;
    }),
  },
  {
    label: '高级控件',
    list: AdvancedComponents,
  },
];

const loading = ref(true);

const onClone = (e: LowCodeSchema.Schema) => {
  return buildElementSchema(e);
};

const handleAddElementDbClick = (e: LowCodeSchema.Schema) => {
  const newEl = buildElementSchema(e);
  core?.state.projectConfig?.componentsTree.push(newEl);
  core?.handleUpdateSelectData(newEl);
  core?.handleUpdateHistoryData();
};

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped>
.element-library {
  .item {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0px 10px;
    height: 36px;
    border: 1px solid #f1faff;
    border-radius: 2px;
    background-color: rgba(9, 96, 189, 0.1);
    cursor: move;
    user-select: none;

    &:hover {
      border-color: #0960bd;
    }
  }
}

.hex-draggable {
  :deep(.draggable-item) {
    flex: 1;
    max-width: 50%;

    &:nth-child(2n) {
      margin-left: 4px;
    }

    &:nth-child(2n + 1) {
      margin-right: 4px;
    }
  }
  :deep(.draggable) {
    display: flex;
  }
}
</style>
