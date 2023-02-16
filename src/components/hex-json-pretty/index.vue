<template>
  <vue-json-pretty
    :data="val"
    :deep="deep"
    :show-double-quotes="showDoubleQuotes"
    :show-length="true"
    lang="zh"
    :show-select-controller="showSelectController"
    @select-on-click-node="handleChange"
  />
</template>

<script lang="ts" setup name="HexJsonPretty">
// 具体属性参考官网 https://github.com/leezng/vue-json-pretty/tree/master
// Todo
// 添加其他属性配置
import { toRefs, computed } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const props = withDefaults(
  defineProps<{
    value: any;
    /** 数据深度, 大于该深度的数据将不被展开 */
    deep?: number;
    /** 是否显示key上的双引号 */
    showDoubleQuotes?: boolean;
    showSelectController?: boolean;
  }>(),
  {
    value: {},
    deep: 10,
    showDoubleQuotes: false,
    showSelectController: false,
  },
);
const emit = defineEmits(['change', 'update:value']);
const { value } = toRefs(props);
const val = computed({
  get: () => value?.value,
  set: (value: any) => emit('update:value', value),
});
function handleChange(val: any) {
  val.value = val;
  emit('change', val);
  return val;
}
</script>
