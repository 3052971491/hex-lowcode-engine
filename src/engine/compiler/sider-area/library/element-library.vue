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
                <div class="item" :class="menuTheme(i)">{{ element.componentName }}</div>
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
import { computed, inject, onMounted, ref } from 'vue';
import { Empty } from 'ant-design-vue';
import type { LowCode } from '/@/types/schema.d';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { BasicComponents, BusinessComponents, LayoutComponents, AdvancedComponents } from '/@/schema/pc';
import { buildElementSchema } from '/@/utils/draggable-api';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';

interface ElementList {
  /** 组件类型名称 */
  label: string;
  /** 组件列表 */
  list: LowCode.Schema[];
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
    list: AdvancedComponents.filter((item) => {
      if (item.hasOwnProperty('internal')) {
        return item.internal;
      }
      return true;
    }),
  },
];

const menuTheme = computed(() => (index: number) => {
  if (index === 0) {
    return 'basic-theme';
  }
  if (index === 1) {
    return 'basic-theme';
  }
  if (index === 2) {
    return 'container-theme';
  }
  if (index === 3) {
    return 'advanced-theme';
  }
  return 'basic-theme';
});

const loading = ref(true);

const onClone = (e: LowCode.Schema) => {
  return buildElementSchema(e);
};

const handleAddElementDbClick = (e: LowCode.Schema) => {
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
    color: #314666;
    background-color: rgba(9, 96, 189, 0.1);
    transition: background-color 0.2s ease;
    cursor: move;
    user-select: none;
  }

  .basic-theme {
    background-color: rgba(0, 102, 255, 0.08);
    &:hover {
      background-color: rgba(0, 45, 113, 0.125);
    }
  }

  .container-theme {
    background-color: #eaf9f4;

    &:hover {
      background-color: #deede8;
    }
  }

  .advanced-theme {
    background-color: #fffaf2;

    &:hover {
      background-color: #f2eee6;
    }
  }
}

.hex-draggable {
  :deep(.draggable-item) {
    width: 100%;

    &:nth-child(2n) {
      margin-left: 4px;
    }

    &:nth-child(2n + 1) {
      margin-right: 4px;
    }
  }
  :deep(.draggable) {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    row-gap: 4px;
  }
}
</style>
