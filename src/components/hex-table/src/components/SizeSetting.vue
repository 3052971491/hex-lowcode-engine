<template>
  <ATooltip placement="top" size="small">
    <template #title>
      <span>密度</span>
    </template>
    <ADropdown placement="bottom" :trigger="['click']">
      <column-height-outlined />
      <template #overlay>
        <AMenu v-model:selectedKeys="selectedKeysRef" style="width: 100px" @click="handleTitleClick">
          <!-- <AMenuItem key="mini">
            <span>超小</span>
          </AMenuItem> -->
          <AMenuItem key="small">
            <span>紧凑</span>
          </AMenuItem>
          <AMenuItem key="middle">
            <span>中等</span>
          </AMenuItem>
          <AMenuItem key="large">
            <span>默认</span>
          </AMenuItem>
        </AMenu>
      </template>
    </ADropdown>
  </ATooltip>
</template>

<script lang="ts" setup>
import { ColumnHeightOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useTableContext } from '../hooks/useTableContext';

const table = useTableContext();

const selectedKeysRef = ref<string[]>([table.getSize()]);

function handleTitleClick({ key }: { key: string }) {
  selectedKeysRef.value = [key];
  table.setProps({
    size: key,
  });
}
</script>

<style lang="less" scoped>
:deep(.ant-menu-item) {
  padding: 0 8px;
  line-height: 32px;
}
</style>
