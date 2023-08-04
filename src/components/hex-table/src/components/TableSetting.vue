<template>
  <div class="table-settings">
    <RedoSetting v-if="getSetting.redo" />
    <SizeSetting v-if="getSetting.size" />
    <ColumnSetting v-if="getSetting.setting" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import RedoSetting from './RedoSetting.vue';
import SizeSetting from './SizeSetting.vue';
import ColumnSetting from './ColumnSetting.vue';
import { TableSetting } from '../types/table';

interface Props {
  setting?: TableSetting;
}
const props = withDefaults(defineProps<Props>(), {});
const getSetting = computed((): TableSetting => {
  return {
    redo: true,
    size: true,
    setting: false,
    fullScreen: false,
    ...props.setting,
  };
});
</script>

<style lang="less" scoped>
.table-settings {
  display: flex;
  align-items: center;

  :deep(.anticon) {
    margin-right: 12px;
    width: 1.3em;
    height: 1.3em;
    cursor: pointer;
  }
}
</style>
