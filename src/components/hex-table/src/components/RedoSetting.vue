<template>
  <ATooltip placement="top" size="small">
    <template #title>
      <span>刷新</span>
    </template>
    <reload-outlined @click="redo" />
  </ATooltip>
</template>

<script lang="ts" setup>
import { ReloadOutlined } from '@ant-design/icons-vue';
import { useTableContext } from '../hooks/useTableContext';

const table = useTableContext();
function redo() {
  table.reload();
}
</script>
