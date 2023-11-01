<template>
  <div class="hex-cell-layout">
    <table>
      <tbody>
        <template v-if="modelValue.children!.length > 0">
          <tr v-for="row in modelValue.children" :key="row.id">
            <template v-for="(col, colIndex) in row.children" :key="col.id">
              <Cell
                v-if="!col.props?.merged"
                :options="(col as GridCol)"
                :disabled="props.disabled"
                @select="features.setSelected"
              >
                <slot name="cell" :item="col" :index="colIndex"></slot>
              </Cell>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Cell from './cell.vue';
import { useFeatures } from './useFeatures';
import { Grid, GridCol, GridRow } from '/@/schema/common/schema';

interface Props {
  value: Grid;
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  disabled: true,
});
const emit = defineEmits(['update:value', 'change']);
const modelValue = computed<Grid>({
  set(val) {
    emit('update:value', val);
    emit('change', val);
  },
  get() {
    return props.value;
  },
});

const features = useFeatures(modelValue.value.children as GridRow[], props);

defineExpose(features);
</script>

<style lang="less" scoped>
.hex-cell-layout {
  position: relative;
  overflow: auto;
  width: 100%;
  height: 100%;

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    text-align: left;

    tbody {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
