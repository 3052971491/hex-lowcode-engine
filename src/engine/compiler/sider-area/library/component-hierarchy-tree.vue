<template>
  <div class="element-library">
    <a-skeleton active :loading="loading">
      <a-input-search
        v-model:value="filterText"
        placeholder="搜索组件"
        class="mb-2"
        :loading="filterTextLoading"
        enter-button
        @search="onSearch"
      />
      <a-tree
        v-model:selectedKeys="selectedKeys"
        show-line
        block-node
        default-expand-all
        :tree-data="treeData"
        :field-names="{
          key: 'id',
        }"
        @select="onSelect"
      >
        <template #title="item">
          <div class="tree-node">
            <span>{{ item.componentName }}</span>
            <div v-if="item.props.hasOwnProperty('behavior')" class="eye">
              <eye-outlined
                v-if="isSelected(item) && item.props.behavior !== 'hidden'"
                @click.stop="onChangeBehavior(false, item)"
              />
              <eye-invisible-outlined
                v-if="isSelected(item) && item.props.behavior === 'hidden'"
                @click.stop="onChangeBehavior(true, item)"
              />
            </div>
          </div>
        </template>
      </a-tree>
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, ref, watch } from 'vue';
import type { LowCode } from '/@/types/schema.d';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons-vue';
import { TreeProps } from 'ant-design-vue';

const core = inject(HexCoreInjectionKey);

const treeData = computed((): LowCode.Schema[] => {
  return core?.state.projectConfig?.componentsTree ?? [];
});
const selectedKeys = ref<string[]>([]);
if (core?.state.selectedData) {
  watch(
    core.state.selectedData,
    (val) => {
      if (val.selectedId) {
        selectedKeys.value = [val.selectedId];
      } else {
        selectedKeys.value = [];
      }
    },
    { immediate: true },
  );
}

const isSelected = computed(() => (currentSchema: LowCode.Schema) => {
  if (core?.state.selectedData?.selectedId) {
    return core?.state.selectedData?.selectedId === currentSchema.id;
  }
  return false;
});
const onSelect = (selectedKeys: string[], { selectedNodes }: { selectedNodes: LowCode.Schema[] }) => {
  if (selectedNodes.length > 0) {
    core?.handleUpdateSelectData(selectedNodes[0]);
  }
};

/**
 * 切换组件状态
 * @param flag
 */
const onChangeBehavior = (flag: boolean, { dataRef }: { dataRef: LowCode.Schema }) => {
  if (dataRef.props && core?.state.selectedData?.selectedId === dataRef.id) {
    if (core.state.selectedData.selectedScheme?.props) {
      core.state.selectedData.selectedScheme.props.behavior = flag ? 'normal' : 'hidden';
    }
  }
};

const filterText = ref<string>('');
const filterTextLoading = ref<boolean>(false);

const getParentKey = (key: string | number, tree: LowCode.Schema[]): LowCode.Schema | undefined => {
  let parentKey;
  if (!tree) return;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      const index = node.children.findIndex((item) => {
        return item?.props?.label === key || item.id === key;
      });
      if (index !== -1) {
        parentKey = node.children[index];
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    } else if (node?.props?.label === key || node.id === key) {
      parentKey = node;
    }
  }
  return parentKey;
};

const onSearch = () => {
  const findSchema = getParentKey(filterText.value, treeData.value);
  if (findSchema) {
    core?.handleUpdateSelectData(findSchema);
  }
};
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped>
:deep(.ant-tree-switcher-noop) {
  display: none;
}

.tree-node {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
