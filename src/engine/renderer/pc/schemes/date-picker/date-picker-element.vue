<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :extra-props="props"
  >
    <a-date-picker
      ref="__instance__"
      v-model:value="modelValue"
      v-bind="prop"
      class="w-full"
      :class="[ectype.props.className]"
    ></a-date-picker>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, isReactive, onMounted, ref, toRaw, unref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  schema: PcSchema.InputScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
  subForm?: {
    schema: PcSchema.SubFormScheme;
    rowIndex: number;
  };
}
const props = withDefaults(defineProps<Props>(), {
  subForm: undefined,
});
const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.InputScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.InputScheme>(props, dataEngine);

const prop = computed(() =>
  ectypeProps((obj) => {
    return {
      allowClear: obj.allowClear,
      bordered: obj.bordered,
      disabled: obj.behavior === 'disabled',
      placeholder: obj.placeholder,
      size: obj.size,
      format: obj.format,
      valueFormat: obj.valueFormat,
      disabledDate: (current: Dayjs) => {
        if (!obj.disabledDate) {
          return false;
        }
        if (obj.disabledDate === 'afterToday') {
          return current && current < dayjs().endOf('day').subtract(1, 'day');
        }
        if (obj.disabledDate === 'beforeToday') {
          return current && current > dayjs().endOf('day');
        }
        if (obj.disabledDate.type === 'duration') {
          const { start, end } = obj.disabledDate;
          if (start && end) {
            return (
              dayjs(current).unix() > dayjs(start).unix() && dayjs(current).unix() < dayjs(end).add(1, 'day').unix()
            );
          }
          if (start && !end) {
            return dayjs(current).unix() > dayjs(start).unix();
          }
          if (!start && end) {
            return dayjs(current).unix() > dayjs(end).unix();
          }
          return false;
        }
        if (obj.disabledDate.type === 'interselectable') {
          const { start, end } = obj.disabledDate;
          if (start && end) {
            return (
              dayjs(current).unix() < dayjs(start).unix() || dayjs(current).unix() > dayjs(end).add(1, 'day').unix()
            );
          }
          if (start && !end) {
            return dayjs(current).unix() < dayjs(start).unix();
          }
          if (!start && end) {
            return dayjs(current).unix() > dayjs(end).add(1, 'day').unix();
          }
          return false;
        }

        return false;
      },
      mode: obj.picker,
      picker: obj.picker,
      showTime: obj.showTime,
      showNow: obj.showNow,
      showToday: obj.showToday,
    };
  }),
);
onMounted(() => {
  // 替换原型方法
  unref(ectype).getValue = () => {
    return unref(modelValue);
  };
  unref(ectype).setValue = (data: any) => {
    modelValue.value = data;
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'DatePickerElement',
});
</script>
