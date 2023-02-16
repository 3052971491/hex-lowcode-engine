<template>
  <div class="menu-item w-full flex justify-center mb-2">
    <a-tooltip placement="right" :destroy-tooltip-on-hide="true">
      <template #title>
        <span>{{ config.label }}</span>
      </template>
      <component :is="config.icon" class="p-1 aside-action-icon mt-1" :class="active ? 'active-icon' : ''"></component>
    </a-tooltip>
  </div>
</template>

<script lang="ts" setup name="menu-item">
import { IMenuItem } from '../index.vue';

withDefaults(
  defineProps<{
    config: IMenuItem;
    active: boolean;
  }>(),
  {
    active: false,
  },
);
</script>

<style lang="less" scoped>
.aside-action-icon {
  font-size: 20px;
  color: #8e8ea9;
  cursor: pointer;

  &:hover {
    color: #1890ff;
  }
}

.active-icon {
  color: #1890ff;
}
</style>
