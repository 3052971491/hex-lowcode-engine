<template>
  <div class="menu-item w-full flex justify-center" :class="active ? 'menu-item-active' : ''">
    <a-tooltip placement="right" :destroy-tooltip-on-hide="true">
      <template #title>
        <span>{{ config.label }}</span>
      </template>
      <component :is="config.icon" class="aside-action-icon" :class="active ? 'active-icon' : ''"></component>
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
  padding: 14px;
  font-size: 20px;
  color: #8e8ea9;
  cursor: pointer;

  &:hover {
    color: #1890ff;
  }
}

.menu-item {
  // padding: 14px 0;
  border-left: 3px solid transparent;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
    cursor: pointer;
  }
}
.menu-item-active {
  border-left: 3px solid #1890ff;
  background-color: rgba(0, 0, 0, 0.06);
}
</style>
