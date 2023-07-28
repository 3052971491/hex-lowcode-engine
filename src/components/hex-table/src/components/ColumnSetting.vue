<template>
  <ATooltip placement="top" size="small">
    <template #title>
      <span>列设置</span>
    </template>
    <SettingOutlined @click="redo" />
  </ATooltip>
</template>

<script lang="ts" setup>
import { SettingOutlined } from '@ant-design/icons-vue';

function redo() {}
</script>
