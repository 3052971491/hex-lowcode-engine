<template>
  <a-input-group compact>
    <a-input
      v-if="inputType == 'String'"
      v-model:value="inputValue"
      style="width: calc(100% - 32px)"
      placeholder="请输入"
      @change="handleInputValueClick"
    />
    <a-input-number
      v-else-if="inputType == 'Number'"
      v-model:value="inputValue"
      style="width: calc(100% - 32px)"
      placeholder="请输入"
      @change="handleInputValueClick"
    />
    <a-select
      v-else-if="inputType == 'Boolean'"
      v-model:value="inputValue"
      style="width: calc(100% - 32px)"
      :options="inputValueOptions"
      placeholder="请选择"
      @change="handleInputValueClick"
    />
    <a-tooltip title="切换类型: String Number Boolean" placement="topRight">
      <a-button @click="handleInpuTypeClick">
        <template #icon>
          <swap-outlined />
        </template>
      </a-button>
    </a-tooltip>
  </a-input-group>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, toRefs } from 'vue';
import { isNil } from 'lodash-es';
import { SwapOutlined } from '@ant-design/icons-vue';

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    required: true,
    default: null,
  },
});
const emit = defineEmits(['change', 'update:value']);
const { value } = toRefs(props);
// 类型
const inputType: any = ref('String');
// 类型列表
const inputTypeOptions = [
  { label: 'String', value: 'String' },
  { label: 'Number', value: 'Number' },
  { label: 'Boolean', value: 'Boolean' },
];
// Boolean 值列表
const inputValueOptions = [
  { label: 'true', value: true },
  { label: 'false', value: false },
];
const inputValue = computed({
  get() {
    if (isNil(value.value)) return value.value;
    return value.value.toString();
  },
  set(val: any) {
    if (!val) {
      emit('update:value', null);
      emit('change', null);
    }
    if (inputType.value === 'Boolean') {
      emit('update:value', val);
      emit('change', val);
    } else if (inputType.value === 'Number') {
      emit('update:value', val);
      emit('change', val);
    } else {
      emit('update:value', val);
      emit('change', val);
    }
  },
});
// 初始化类型
function initInputType() {
  switch (typeof value.value) {
    case 'string':
      inputType.value = 'String';
      break;
    case 'number':
      inputType.value = 'Number';
      break;
    case 'boolean':
      inputType.value = 'Boolean';
      break;
    default:
      inputType.value = 'String';
      break;
  }
}
function handleInpuTypeClick() {
  const idx: number =
    inputTypeOptions.findIndex((item) => {
      return item.value === inputType.value;
    }) + 1;
  inputType.value = inputTypeOptions[idx >= inputTypeOptions.length ? 0 : idx].value;
  switch (inputType.value) {
    case 'String':
      inputValue.value = '';
      break;
    case 'Number':
      inputValue.value = 0;
      break;
    case 'Boolean':
      inputValue.value = false;
      break;
    default:
      break;
  }
}
function handleInputValueClick(val: string | number | boolean | null) {}
onMounted(() => {
  initInputType();
});
</script>
