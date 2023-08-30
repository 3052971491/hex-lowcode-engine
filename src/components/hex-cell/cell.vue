<template>
  <td
    v-bind="getBindValues"
    :class="[getBindValues.selected ? 'selected' : '']"
    :style="{
      width: getBindValues.width ? getBindValues.width : false,
      height: getBindValues.height ? getBindValues.height : false,
    }"
    @click.ctrl.stop="setSelectCell"
  >
    <slot> </slot>
  </td>
</template>

<script setup lang="ts">
import { computed, unref } from 'vue';
import { GridCol } from '/@/schema/common/schema';

interface Props {
  options: GridCol;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: true,
});
const emit = defineEmits(['select']);

const modelOption = computed<GridCol>(() => {
  return props.options;
});

const getBindValues = computed(() => {
  const { ...opt } = unref(modelOption).props;
  return {
    ...opt,
    selected: props.disabled ? false : opt.selected,
  };
});

/** 设置是否选中单元格 */
function setSelectCell() {
  if (props.disabled) return;
  emit('select', unref(props).options);
}
</script>

<style lang="less" scoped>
td {
  display: table-cell;
  padding: 8px;
  height: 48px;
  border: 1px solid #d9d9d9;
  cursor: default;
}

.selected {
  background: #e6f4ff;
}
</style>
