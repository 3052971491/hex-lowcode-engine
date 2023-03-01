<template>
  <ElementWrapper :schema="schema">
    <a-input v-bind="ectypeProps"></a-input>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCodeSchema } from '/@/types/schema.d';

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
  name: 'InputElement',
});
</script>
