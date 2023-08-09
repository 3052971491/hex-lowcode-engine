<template>
  <div class="element-library flex flex-col overflow-hidden">
    <a-skeleton active :loading="loading">
      <a-input-search
        v-model:value="filterText"
        :placeholder="t('el.placeholder.search')"
        enter-button
        class="mb-2"
        @search="onSearch"
      />
      <div class="flex-1 overflow-y-auto overflow-x-hidden">
        <div v-for="(menu, i) in elementList" :key="i" class="w-full mb-6">
          <div class="text-lg font-bold mb-2">{{ t(menu.key) }}</div>
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
                  <div class="item" :class="menuTheme(menu.label)">
                    {{ t(`el.component.${element.componentType}`) }}
                  </div>
                </div>
              </template>
            </hex-draggable>
          </template>
          <template v-else>
            <div class="w-full p-3">
              <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" :description="t('el.common.noData')"></a-empty>
            </div>
          </template>
        </div>
      </div>
      <template v-if="elementList.length < 1">
        <div class="w-full p-3">
          <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" :description="t('el.common.noData')"></a-empty>
        </div>
      </template>
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref } from 'vue';
import { Empty } from 'ant-design-vue';
import type { LowCode } from '/@/types/schema.d';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import {
  BasicComponents,
  FormComponents,
  BusinessComponents,
  LayoutComponents,
  AdvancedComponents,
} from '/@/schema/pc';
import { buildElementSchema } from '/@/utils/draggable-api';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useLocale } from '/@/hooks/use-loacle';
import { HexIconPicker } from '/@/components/hex-icon-picker';

const { t } = useLocale();
interface ElementList {
  /** 组件类型名称 */
  label: string;
  key: string;
  /** 组件列表 */
  list: LowCode.Schema[];
}

const core = inject(HexCoreInjectionKey);
const filterText = ref('');
const elementList = ref<ElementList[]>([]);

const menuTheme = computed(() => (index: string) => {
  if (index === '基础控件') {
    return 'basic-theme';
  }
  if (index === '表单控件') {
    return 'form-theme';
  }
  if (index === '业务控件') {
    return 'business-theme';
  }
  if (index === '布局控件') {
    return 'container-theme';
  }
  if (index === '高级控件') {
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
const onSearch = () => {
  elementList.value = [
    {
      label: '基础控件',
      key: 'el.component.category.basic',
      list: BasicComponents.filter((item) => {
        let flag = false;
        if (!filterText.value || item.componentName.includes(filterText.value)) {
          flag = true;
        }
        if (item.hasOwnProperty('internal') && !item.internal) {
          flag = !!item.internal;
        }
        return flag;
      }),
    },
    {
      label: '表单控件',
      key: 'el.component.category.form',
      list: FormComponents.filter((item) => {
        let flag = false;
        if (!filterText.value || item.componentName.includes(filterText.value)) {
          flag = true;
        }
        if (item.hasOwnProperty('internal') && !item.internal) {
          flag = !!item.internal;
        }
        return flag;
      }),
    },

    {
      label: '布局控件',
      key: 'el.component.category.layout',
      list: LayoutComponents.filter((item) => {
        let flag = false;
        if (!filterText.value || item.componentName.includes(filterText.value)) {
          flag = true;
        }
        if (item.hasOwnProperty('internal') && !item.internal) {
          flag = !!item.internal;
        }
        return flag;
      }),
    },
    {
      label: '高级控件',
      key: 'el.component.category.advanced',
      list: AdvancedComponents.filter((item) => {
        let flag = false;
        if (!filterText.value || item.componentName.includes(filterText.value)) {
          flag = true;
        }
        if (item.hasOwnProperty('internal') && !item.internal) {
          flag = !!item.internal;
        }
        return flag;
      }),
    },
    {
      label: '业务控件',
      key: 'el.component.category.business',
      list: BusinessComponents.filter((item) => {
        let flag = false;
        if (!filterText.value || item.componentName.includes(filterText.value)) {
          flag = true;
        }
        if (item.hasOwnProperty('internal') && !item.internal) {
          flag = !!item.internal;
        }
        return flag;
      }),
    },
  ];
  elementList.value = elementList.value.filter((item) => item.list.length > 0);
};

onMounted(() => {
  setTimeout(() => {
    onSearch();
    loading.value = false;
  }, 180);
});

const aaa = ref('');
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
    border-radius: 6px;
    color: #314666;
    background-color: rgba(9, 96, 189, 0.1);
    transition: background-color 0.2s ease;
    cursor: move;
    user-select: none;
  }

  .advanced-theme {
    background-color: rgba(255, 69, 0, 0.08);
    &:hover {
      background-color: rgba(255, 69, 0, 0.125);
    }
  }

  .form-theme {
    background-color: rgba(0, 102, 255, 0.08);
    &:hover {
      background-color: rgba(0, 102, 255, 0.125);
    }
  }

  .container-theme {
    background-color: #eaf9f4;

    &:hover {
      background-color: #deede8;
    }
  }

  .basic-theme {
    background-color: #fffaf2;

    &:hover {
      background-color: #f2eee6;
    }
  }

  .business-theme {
    background-color: rgba(213, 126, 235, 0.08);
    &:hover {
      background-color: rgba(213, 126, 235, 0.125);
    }
  }
}

.hex-draggable {
  :deep(.draggable-item) {
    margin-bottom: 3px;
    width: auto;

    &:nth-child(2n) {
      margin-left: 3px;
    }

    &:nth-child(2n + 1) {
      margin-right: 3px;
    }
  }
  :deep(.draggable) {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    row-gap: 3px;
  }
}
</style>
