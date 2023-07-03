<template>
  <div class="hex-icon-picker">
    <a-popover ref="popover" v-model:visible="visible" trigger="click" placement="bottomRight">
      <template #content>
        <!-- <a @click="hide">Close</a> -->
        <a-tabs>
          <a-tab-pane v-for="(item, index) in data" :key="index + 1" :tab="item.label">
            <div class="icon-container">
              <div v-for="(i, idx) in item.value" :key="idx">
                <a-divider orientation="left" orientation-margin="0">{{ i.label }}</a-divider>
                <div class="icon_list">
                  <div v-for="(icon, _idx) in i.children" :key="_idx">
                    <i @click="setIcon(item)">
                      <component :is="icon.value" @click="show"></component>
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </template>
      <div ref="triggerWrapper" class="trigger-wrapper">
        <slot name="default">
          <a-input
            ref="input"
            v-model:value="innerValue"
            :placeholder="placeholder"
            :clearable="clearable"
            :disabled="disabled"
            :readonly="readonly"
            @click.stop="hide"
            @input="handleChange"
            @clear="updateIcon(false)"
          >
            <template #addonAfter>
              <slot name="prepend" :icon="state.prefixIcon">
                <component :is="state.prefixIcon" @click="show"></component>
              </slot>
            </template>
          </a-input>
        </slot>
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts" setup name="HexIconPicker">
import { reactive, ref } from 'vue';
import { data } from './const';

const props = withDefaults(
  defineProps<{
    value: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否只读 */
    readonly?: boolean;
    /** 是否显示清空按钮 */
    clearable?: boolean;
    placeholder?: string;
  }>(),
  {
    disabled: false,
    readonly: false,
    clearable: false,
    placeholder: '请选择图标',
  },
);

const visible = ref<boolean>(false);

const innerValue = ref('');

const state = reactive({
  prefixIcon: 'search-outlined',
});

const show = () => {
  visible.value = true;
};
const hide = () => {
  visible.value = false;
};

const handleChange = (val: string) => {};

const updateIcon = (val: boolean) => {};

const setIcon = (item) => {};

function getKebabCase(str: string) {
  return str.replace(/[A-Z]/g, (item: string) => {
    return `-${item.toLowerCase()}`;
  });
}
</script>

<style lang="less">
.icon-container {
  overflow-y: auto;
  width: 100%;
  max-height: 320px;
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
