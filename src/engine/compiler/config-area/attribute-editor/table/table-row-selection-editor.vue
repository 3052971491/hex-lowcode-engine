<template>
  <collapse-Item-wrapper
    :label="t(`el.property.Table.${props.attribute}`)"
    :name="props.attribute"
    :option="option"
    active-key="0"
  >
    <div class="transition-container">
      <a-form
        style="width: 100%; height: 100%"
        layout="horizontal"
        label-align="left"
        :label-wrap="true"
        :label-col="{
          style: { width: '86px' },
        }"
        :model="modelValue"
      >
        <a-form-item :label="t('el.property.Table.isOpenRowSelection')">
          <a-switch v-model:checked="isOpenRowSelection" @change="handleOpenRowSelectionClick"></a-switch>
        </a-form-item>
        <template v-if="isOpenRowSelection">
          <!-- 单选或多选 -->
          <a-form-item :label="t('el.property.Table.checkboxOrRadio')" name="title">
            <a-radio-group v-model:value="modelValue.type">
              <a-radio-button value="checkbox">Checkbox</a-radio-button>
              <a-radio-button value="radio">Radio</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </template>
      </a-form>
    </div>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="TableRowSelectionEditor">
import { inject, computed, ref, watch } from 'vue';
import { TableRowSelection } from 'ant-design-vue/lib/table/interface';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
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
const modelValue = computed<TableRowSelection>({
  set(val) {
    if (schema.value.props) {
      schema.value.props[props.attribute] = val;
    }
  },
  get() {
    if (!schema.value.props) return [];
    return schema.value.props[props.attribute] || {};
  },
});

const isOpenRowSelection = ref(Object.keys(modelValue.value).length > 0);

const handleOpenRowSelectionClick = () => {
  if (isOpenRowSelection.value) {
    modelValue.value = {
      type: 'checkbox',
    };
  } else {
    modelValue.value = null as any;
  }
};
</script>

<style lang="less" scoped>
:deep(.ant-collapse-content) {
  background: #fff;
}
</style>
