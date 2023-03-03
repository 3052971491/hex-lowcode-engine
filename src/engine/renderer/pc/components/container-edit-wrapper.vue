<template>
  <div class="container-edit-wrapper" :class="classMap" @click.stop="handleSelectCurrentComponentClick()">
    <div v-if="isSelect" class="instance-node-selector">
      <span
        v-for="(item, index) in breadcrumbsArr"
        :key="index"
        class="instance-node-selector-current"
        @click.stop="handleSelectElement(item, index)"
      >
        {{ item?.componentName }}
      </span>
    </div>
    <div v-if="isSelect" class="borders-actions">
      <a-tooltip placement="bottom">
        <template #title>
          <span>复制</span>
        </template>
        <div class="borders-action" @click.stop="($event) => handleCopyCurrentElementClick($event)">
          <CopyOutlined />
        </div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>删除</span>
        </template>
        <div class="borders-action" @click.stop="($event) => handleDeleteCurrentElementClick($event)">
          <DeleteOutlined />
        </div>
      </a-tooltip>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, inject, nextTick } from 'vue';
import {
  HexCoreInjectionKey,
  RedactStateInjectionKey,
  ComponentBreadcrumbs,
} from '/@/engine/renderer/render-inject-key';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useFormItem } from '../hooks/useFormItem';

interface Props {
  schema: LowCode.Schema;
  parentSchema: LowCode.Schema;
  parentSchemaList: LowCode.Schema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});

const core = inject(HexCoreInjectionKey);

const redactState = inject(RedactStateInjectionKey);

const breadcrumbs = inject(ComponentBreadcrumbs);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});
const breadcrumbsArr = computed(() => {
  return breadcrumbs?.getBreadcrumbs().reverse();
});

const { getRules, onCopy, onDelete } = useFormItem(props.schema, props);
getRules();

const isSelect = computed(() => {
  if (!redactState || !selectedScheme.value || !props.schema) return false;
  return props.schema.id === selectedScheme.value.id;
});

const classMap = computed<string[]>(() => {
  const map: string[] = [];
  if (isSelect.value) {
    map.push('selected');
  }
  return map;
});

const handleSelectElement = (item: LowCode.Schema, index: number) => {
  // 除当前组件
  if (index !== 0) {
    core?.handleUpdateSelectData(item);
  }
};

/**
 * 选中当前组件
 */
const handleSelectCurrentComponentClick = () => {
  if (props.schema) {
    core?.handleUpdateSelectData(props.schema);
  }
};
/** 删除当前组件 */
const handleDeleteCurrentElementClick = (event: Event) => {
  const nextSelected = onDelete(event);
  if (nextSelected) {
    core?.handleUpdateSelectData(nextSelected);
    core?.handleUpdateHistoryData();
  }
};
/** 复制当前组件 */
const handleCopyCurrentElementClick = (event: Event) => {
  const copySelected = onCopy(event);
  if (copySelected) {
    core?.handleUpdateSelectData(copySelected);
    core?.handleUpdateHistoryData();
  }
};
</script>

<style lang="less" scoped>
.container-edit-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 68px;
  border: 1px rgba(0, 0, 0, 0.25) solid;

  &:hover {
    // border: 1px #1890ff dashed;
    &::before {
      position: relative;
      top: calc(100%);
      left: 0;
      color: #1890ff;
      content: '';
    }
  }

  .borders-actions {
    position: absolute;
    right: 0;
    bottom: -28px;
    z-index: 999;
    display: flex;
    border-radius: 4px;

    .borders-action {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 26px;
      height: 26px;
      color: #fff;
      background-color: #1890ff;
      opacity: 1;
      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      &:first-child {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      &:last-child {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
  .instance-node-selector {
    position: absolute;
    top: calc(100% + 2px);
    right: 54px;
    z-index: 999;
    display: flex;
    align-items: flex-end;
    width: auto;
    border-radius: 4px;
    flex-direction: column;

    .instance-node-selector-current {
      display: none;
      margin-bottom: 4px;
      padding: 2px 4px;
      width: max-content;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #1890ff;
      cursor: pointer;

      &:first-child {
        display: flex;
      }

      &:not(:first-child) {
        background-color: #79889b;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    &:hover {
      .instance-node-selector-current {
        &:not(:first-child) {
          display: flex;
        }
      }
    }
  }
}
.selected {
  border: 1px #1890ff solid !important;
}
</style>
