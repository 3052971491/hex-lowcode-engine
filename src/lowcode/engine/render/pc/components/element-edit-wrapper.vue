<template>
  <div v-if="scheme?.tag !== 'LAYOUT'" :class="classMap" class="element-edit-wrapper">
    <!-- 遮罩层 -->
    <div class="mask" @click.stop="handleSelectCurrentComponentClick()"></div>
    <!-- 面包屑列表 -->
    <div v-if="isSelect" class="instance-node-selector">
      <div v-for="item in 4" :key="item" class="instance-node-selector-current" @click.stop="handleSelectElement(item)">
        {{ scheme?.componentName }}
      </div>
    </div>
    <!-- 操作按钮组 -->
    <div v-if="isSelect" class="borders-actions">
      <a-tooltip placement="bottom">
        <template #title>
          <span>复制</span>
        </template>
        <div class="borders-action"><CopyOutlined /></div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>删除</span>
        </template>
        <div class="borders-action"><DeleteOutlined /></div>
      </a-tooltip>
    </div>
    <!-- 是否a-form-item包裹 -->
    <template v-if="scheme?.formItemFlag">
      <a-form-item :rules="getRules()">
        <template #label>
          {{ scheme.props.label }}
        </template>
        <template #extra>{{ scheme.props.tips }}</template>
        <template #help></template>
        <slot></slot>
      </a-form-item>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
  <div v-else class="container-edit-wrapper" :class="classMap" @click.stop="handleSelectCurrentComponentClick()">
    <div v-if="isSelect" class="instance-node-selector">
      <div v-for="item in 4" :key="item" class="instance-node-selector-current" @click.stop="handleSelectElement(item)">
        {{ scheme?.componentName }}
      </div>
    </div>
    <div v-if="isSelect" class="borders-actions">
      <a-tooltip placement="bottom">
        <template #title>
          <span>复制</span>
        </template>
        <div class="borders-action"><CopyOutlined /></div>
      </a-tooltip>
      <a-tooltip placement="bottom">
        <template #title>
          <span>删除</span>
        </template>
        <div class="borders-action"><DeleteOutlined /></div>
      </a-tooltip>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import type { LowCodeScheme } from '/@/types/scheme.d';
import { computed, inject } from 'vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { useFormItem } from '../hooks/useFormItem';

interface Props {
  scheme: LowCodeScheme.Scheme;
}

const props = withDefaults(defineProps<Props>(), {
  scheme: undefined,
});

const core = inject(HexCoreInjectionKey);

const redactState = inject(RedactStateInjectionKey);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});

const { getRules } = useFormItem(props.scheme);
getRules();

const isSelect = computed(() => {
  if (!redactState || !selectedScheme.value || !props.scheme) return false;
  return props.scheme.id === selectedScheme.value.id;
});

const classMap = computed<string[]>(() => {
  const map: string[] = [];
  if (isSelect.value) {
    map.push('selected');
  }
  return map;
});

const handleSelectElement = (item: any) => {
  console.log(`选择的是第 ${item} 个`);
};

/**
 * 选中当前组件
 */
const handleSelectCurrentComponentClick = () => {
  if (props.scheme) {
    core?.handleUpdateSelectData(props.scheme);
  }
};
</script>

<style lang="less" scoped>
.element-edit-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px transparent solid;

  &:hover {
    border: 1px #1890ff dashed;

    &::before {
      position: relative;
      top: calc(100%);
      left: 0;
      color: #1890ff;
      content: '';
    }
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
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
    border-radius: 4px;
    flex-direction: column;

    .instance-node-selector-current {
      display: none;
      margin-bottom: 4px;
      padding: 2px 4px;
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
.container-edit-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 68px;
  border: 1px transparent solid;

  &:hover {
    &::before {
      position: relative;
      top: calc(100%);
      left: 0;
      color: #1890ff;
      content: '';
    }
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 998;
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
    border-radius: 4px;
    flex-direction: column;

    .instance-node-selector-current {
      display: none;
      margin-bottom: 4px;
      padding: 2px 4px;
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
