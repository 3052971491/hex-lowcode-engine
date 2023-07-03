<template>
  <div class="hex-icon-picker">
    <a-popover ref="popover" v-model:visible="visible" trigger="click" placement="bottomRight">
      <template #content>
        <a-tabs>
          <a-tab-pane v-for="(item, index) in data" :key="index + 1" :tab="item.label">
            <div class="icon-container">
              <div v-for="(i, idx) in item.value" :key="idx">
                <a-divider orientation="left" orientation-margin="0">{{ i.label }}</a-divider>
                <div class="icon_list">
                  <div v-for="(icon, _idx) in i.children" :key="_idx">
                    <i @click="setIcon(icon)">
                      <component :is="antIcons[icon as any]" @click="show"></component>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
      <div ref="triggerWrapper" class="trigger-wrapper">
        <a-input
          ref="input"
          v-model:value="innerValue"
          :placeholder="placeholder"
          :readonly="true"
          @change="handleChange"
          @clear="updateIcon('')"
        >
          <template #addonAfter>
            <slot name="prepend" :icon="state.prefixIcon">
              <component :is="antIcons[state.prefixIcon]" @click="show"></component>
            </slot>
          </template>
        </a-input>
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts" setup name="HexIconPicker">
import { reactive, ref, watch } from 'vue';
import * as antIcons from '@ant-design/icons-vue';
import { data } from './const';

const props = withDefaults(
  defineProps<{
    value: string;
    placeholder?: string;
    defaultIcon?: string;
  }>(),
  {
    placeholder: '请选择图标',
    defaultIcon: '',
  },
);

const emit = defineEmits(['update:value', 'change']);

const visible = ref<boolean>(false);

const innerValue = ref('');

const state = reactive({
  prefixIcon: 'setting-outlined',
});

const show = () => {
  visible.value = true;
};
const hide = () => {
  visible.value = false;
};

const updateIcon = (val: string) => {
  setIcon(val);
};

const setIcon = (item) => {
  const result = item || props.defaultIcon;
  state.prefixIcon = result;
  emit('update:value', result);
  emit('change', result);
  hide();
};

const handleChange = () => {};

watch(
  () => props.value,
  (val) => {
    innerValue.value = val || props.defaultIcon;
    state.prefixIcon = innerValue.value ? innerValue.value : props.defaultIcon;
  },
  { deep: true, immediate: true },
);
</script>

<style lang="less">
.icon-container {
  overflow-y: auto;
  width: 100%;
  max-height: 320px;
}
.trigger-wrapper {
  cursor: pointer;
}
.icon_list {
  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 12px;
  row-gap: 12px;

  i {
    display: inline-block;
    width: 60px;
    height: 45px;
    font-size: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    line-height: 45px;

    &:hover {
      border-color: #1890ff;
      color: #1890ff;
    }
  }
}
</style>
