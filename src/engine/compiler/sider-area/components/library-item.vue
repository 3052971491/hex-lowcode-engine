<template>
  <div class="library-item w-full flex h-full flex-col p-2">
    <div v-if="isTitle" class="title">
      <a-skeleton :paragraph="{ rows: 0 }" active :loading="loading">
        <span>{{ props.config?.label }}</span>
      </a-skeleton>
      <a-divider />
    </div>
    <component :is="props.config?.component" v-if="props.config?.component" class="flex-1 w-full h-full"></component>
  </div>
</template>

<script lang="ts" setup name="library-item">
import { onMounted, ref } from 'vue';
import { IMenuItem } from '../index.vue';

const props = withDefaults(
  defineProps<{
    config: IMenuItem | null;
    isTitle?: boolean;
  }>(),
  {
    config: null,
    isTitle: true,
  },
);

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 12px 0;
}

.library-item {
  .title {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
