<template>
  <ElementWrapper :schema="schema">
    <a-input v-bind="ectypeProps"></a-input>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.InputScheme;
}
const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});
const { ectype, ElementWrapper } = useElement<PcSchema.InputScheme>(props);

const ectypeProps = computed(() => {
  const obj = ectype.value.props;
  if (!obj) return {};

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
