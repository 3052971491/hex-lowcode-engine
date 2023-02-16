<template>
  <div class="w-full h-full">
    <div class="settings-navigator">
      <a-breadcrumb>
        <a-breadcrumb-item>布局</a-breadcrumb-item>
        <a-breadcrumb-item>容器</a-breadcrumb-item>
        <a-breadcrumb-item>文本</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="settings-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup name="setting-area"></script>

<style lang="less" scoped>
.settings-navigator {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  padding: 6px 0.5rem;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
  background-color: #fff;
}
</style>
