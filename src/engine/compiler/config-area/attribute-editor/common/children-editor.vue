<template>
  <collapse-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <hex-draggable v-model:value="modelValue" :put="false" :sort="true" :pull="false" ghost-class="">
      <template #item="{ element, index }">
        <div class="listitem w-full">
          <div class="flex-1 flex align-items">
            <holder-outlined class="hex-draggable-handle move" />
            <a-radio-group disabled class="w-full block">
              <a-radio :value="element.value">No {{ index + 1 }}: {{ element.componentName }}</a-radio>
            </a-radio-group>
          </div>
          <div>
            <delete-outlined class="icon ml-1" @click="handleDeleteClick(element, index)" />
          </div>
        </div>
      </template>
    </hex-draggable>
    <a-button block type="primary" @click="handleAddOptionClick">新增一项</a-button>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="ChildrenEditor">
import { inject, computed, unref } from 'vue';
import { HolderOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set } from '/@/utils/schema';
import { LowCode } from '/@/types/schema';
import { buildElementSchemaByType } from '/@/utils/draggable-api';

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
const modelValue = computed<LowCode.NodeSchema[]>({
  set(val) {
    console.log(val);
    schema.value.children = val;
  },
  get() {
    return schema.value.children ?? [];
  },
});

const handleAddOptionClick = () => {
  let element;
  switch (unref(schema).componentType) {
    case 'ButtonGroup':
      element = buildElementSchemaByType('BASIC', 'Button');
      break;
    default:
      break;
  }
  if (element) {
    schema.value?.children?.push(element);
    core?.handleUpdateHistoryData();
  }
};

const handleDeleteClick = (options: RadioGroupChildOption, index: number) => {
  if (schema.value?.children) {
    schema.value?.children.splice(index, 1);
  }
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
