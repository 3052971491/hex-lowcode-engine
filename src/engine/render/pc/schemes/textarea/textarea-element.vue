<template>
  <ElementWrapper :schema="schema">
    <a-textarea v-bind="ectypeProps"></a-textarea>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import { computed, defineComponent } from 'vue';
import ElementWrapper from '../../components/element-wrapper.vue';
import type { LowCodeSchema } from '/@/types/schema.d';

interface Props {
  schema: LowCodeSchema.Schema;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});

const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  const obj = ectype.value.props;
  return {
    allowClear: obj.allowClear,
    bordered: obj.bordered,
    disabled: obj.behavior === 'disabled',
    placeholder: obj.placeholder,
    size: obj.size,
    maxlength: obj.maxlength,
    showCount: obj.showCount,
    addonBefore: obj.addonBefore,
    addonAfter: obj.addonAfter,
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'TextareaElement',
});
</script>
