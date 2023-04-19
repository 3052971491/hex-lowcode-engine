<template>
  <collapse-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <hex-draggable v-model:value="modelValue" :put="false" :sort="true" :pull="false" ghost-class="a">
      <template #item="{ element }">
        <div class="listitem w-full flex align-items">
          <div class="flex-1">
            <holder-outlined class="hex-draggable-handle move" />
            <a-radio v-model:checked="defaultValue" :value="element.value">{{ element.label }}</a-radio>
          </div>
          <div>
            <form-outlined class="icon ml-1" />
            <delete-outlined class="icon ml-1" />
          </div>
        </div>
      </template>
    </hex-draggable>
    <a-button block type="primary">新增一项</a-button>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="OptionsEditor">
import { inject, computed, ref } from 'vue';
import { HolderOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set } from '/@/utils/schema';

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
const modelValue = computed<any[]>({
  set(val) {
    set('options', val, schema.value);
  },
  get() {
    return schema.value.props?.options ?? [];
  },
});

const defaultValue = ref('');

const arr = ref(['选项1', '选项2', '选项3']);
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
}
</style>
