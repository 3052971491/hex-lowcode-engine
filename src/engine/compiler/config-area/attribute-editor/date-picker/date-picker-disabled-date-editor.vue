<template>
  <collapse-Item-wrapper :label="t('el.disabledDate')" :name="props.attribute" :option="props.option">
    <form-item-wrapper :label="t('el.rangeOfLimits')" :name="props.attribute" :option="option">
      <a-select v-model:value="modelValue">
        <a-select-option value="">{{ t('el.unlimited') }}</a-select-option>
        <a-select-option value="afterToday">{{ t('el.afterToday') }}</a-select-option>
        <a-select-option value="beforeToday">{{ t('el.beforeToday') }}</a-select-option>
        <a-select-option v-if="schema.componentType !== 'RangePicker'" value="duration">
          {{ t('el.duration') }}
        </a-select-option>
        <a-select-option value="interselectable">{{ t('el.interselectable') }}</a-select-option>
      </a-select>
    </form-item-wrapper>
    <template v-if="arr.includes(modelValue)">
      <a-form-item label="start">
        <a-date-picker
          v-model:value="start"
          class="w-full"
          show-time
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item label="end">
        <a-date-picker
          v-model:value="end"
          class="w-full"
          show-time
          value-format="YYYY-MM-DD HH:mm:ss"
          @change="handleChange"
        />
      </a-form-item>
    </template>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="DatePickerDisabledDateEditor">
import { inject, computed, unref, ref } from 'vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import FormItemWrapper from '../../components/form-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../interface';
import { set, get } from '/@/utils/schema';
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
const arr = ['interselectable', 'duration'];
const start = ref<any>(null);
const end = ref<any>(null);
const modelValue = computed({
  set(val: string) {
    if (arr.includes(val)) {
      const obj = {
        type: val,
        start: unref(start),
        end: unref(end),
      };
      set(props.attribute, obj, schema.value, core?.state.projectConfig);
    } else {
      set(props.attribute, val, schema.value, core?.state.projectConfig);
    }
  },
  get() {
    return !arr.includes(get(props.attribute, schema.value)) && !arr.includes(get(props.attribute, schema.value).type)
      ? get(props.attribute, schema.value)
      : get(props.attribute, schema.value).type;
  },
});

const handleChange = () => {
  const obj = {
    type: unref(modelValue),
    start: unref(start),
    end: unref(end),
  };
  set(props.attribute, obj, schema.value, core?.state.projectConfig);
};
</script>
