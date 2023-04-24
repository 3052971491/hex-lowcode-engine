<template>
  <collapse-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <hex-draggable v-model:value="modelValue" :put="false" :sort="true" :pull="false" ghost-class="">
      <template #item="{ element, index }">
        <div class="listitem w-full">
          <div class="flex-1 flex align-items">
            <holder-outlined class="hex-draggable-handle move" />
            <a-radio-group v-model:value="defaultValue" class="w-full block">
              <a-radio :value="element.value">{{ element.label }}</a-radio>
            </a-radio-group>
          </div>
          <div>
            <a-tooltip placement="top" :destroy-tooltip-on-hide="true">
              <template #title>
                <span>编辑</span>
              </template>
              <a-popconfirm
                placement="leftBottom"
                :show-cancel="false"
                :destroy-tooltip-on-hide="true"
                :arrow-point-at-center="true"
              >
                <template #icon></template>
                <template #okButton></template>
                <template #title>
                  <a-form
                    :label-col="{
                      style: {
                        width: '60px',
                      },
                    }"
                  >
                    <a-form-item label="名称" style="margin-bottom: 12px">
                      <a-input v-model:value="element.label"></a-input>
                    </a-form-item>
                    <a-form-item label="值" style="margin-bottom: 0">
                      <a-input v-model:value="element.value"></a-input>
                    </a-form-item>
                  </a-form>
                </template>
                <form-outlined class="icon ml-1" />
              </a-popconfirm>
            </a-tooltip>
            <delete-outlined class="icon ml-1" @click="handleDeleteClick(element, index)" />
          </div>
        </div>
      </template>
    </hex-draggable>
    <a-button block type="primary" @click="handleAddOptionClick">新增一项</a-button>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="OptionsEditor">
import { inject, computed } from 'vue';
import { HolderOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set } from '/@/utils/schema';
import { buildUUID } from '/@/utils/common';

interface Props {
  label: string;
  attribute: string;
  option: AttributeItem;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  attribute: '',
});

const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
const modelValue = computed<RadioGroupChildOption[]>({
  set(val) {
    set('options', val, schema.value, core?.state.projectConfig);
  },
  get() {
    return schema.value.props?.options ?? [];
  },
});

const defaultValue = computed<any[]>({
  set(val) {
    set('defaultValue', val, schema.value, core?.state.projectConfig);
  },
  get() {
    return schema.value.props?.defaultValue ?? null;
  },
});

const handleAddOptionClick = () => {
  const option: RadioGroupChildOption = {
    label: '新选项',
    value: `option_${buildUUID()}`,
  };
  schema.value.props?.options.push(option);
};

const handleDeleteClick = (options: RadioGroupChildOption, index: number) => {
  schema.value.props?.options.splice(index, 1);
};
</script>

<style lang="less" scoped>
:deep(.ant-collapse-content) {
  background: #fff;
}
.listitem {
  position: relative;
  display: flex;
  align-items: stretch;
  margin-bottom: 8px;
  padding: 4px;
  border: 1px solid rgba(31, 56, 88, 0.2);
  border-radius: 3px;
  color: #00000073;
  background: #fff;
  outline: none;

  &:hover {
    background: transparent;
  }

  .move {
    margin-right: 6px;
    margin-left: 3px;
    cursor: move;
  }

  .icon {
    cursor: pointer;
  }
  .hex-draggable-handle {
    display: flex;
    align-items: center;
  }
}
</style>
