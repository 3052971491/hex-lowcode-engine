<template>
  <collapse-Item-wrapper :label="t(`el.property.${props.attribute}`)" :name="props.attribute" :option="option">
    <hex-draggable v-model:value="modelValue" :put="false" :sort="true" :pull="false" ghost-class="">
      <template #item="{ element, index }">
        <div class="listitem">
          <div class="listitem-content">
            <holder-outlined class="hex-draggable-handle move" />
            <a-radio-group disabled class="info">
              <a-radio :value="element.value">
                No {{ index + 1 }}: {{ t(`el.component.${element.componentType}`) }}
              </a-radio>
            </a-radio-group>
          </div>
          <div>
            <delete-outlined class="icon" @click="handleDeleteClick(element, index)" />
          </div>
        </div>
      </template>
    </hex-draggable>
    <a-button block type="primary" @click="handleAddOptionClick">{{ t('el.addAnItem') }}</a-button>
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
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
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
    case 'Row':
      element = buildElementSchemaByType('LAYOUT', 'Column');
      break;
    case 'Collapse':
      element = buildElementSchemaByType('LAYOUT', 'CollapsePanel');
      break;
    case 'Tabs':
      element = buildElementSchemaByType('LAYOUT', 'TabPane');
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
  width: 100%;
  border: 1px solid rgba(31, 56, 88, 0.2);
  border-radius: 3px;
  color: #00000073;
  background: #fff;
  outline: none;

  .listitem-content {
    flex: 1 1 0%;
    display: flex;

    .info {
      display: block;
      width: 100%;
    }
  }

  &:hover {
    background: transparent;
  }

  .move {
    margin-right: 6px;
    margin-left: 3px;
    cursor: move;
  }

  .icon {
    margin-left: 0.25rem;
    cursor: pointer;
  }
  .hex-draggable-handle {
    display: flex;
    align-items: center;
  }
}
</style>
