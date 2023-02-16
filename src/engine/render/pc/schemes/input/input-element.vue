<template>
  <ElementWrapper :scheme="scheme">
    <a-input v-bind="ectypeProps"></a-input>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent } from 'vue';
import { cloneDeep } from 'lodash-es';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCodeScheme } from '/@/types/scheme';
import { Behavior } from '/@lowcode-engine/enum/element-option-enum';

interface Props {
  scheme: LowCodeScheme.Scheme;
}

const props = withDefaults(defineProps<Props>(), {
  scheme: undefined,
});

const ectype = computed(() => {
  return cloneDeep(props.scheme);
});

const ectypeProps = computed(() => {
  const obj = ectype.value.props;
  return {
    allowClear: obj.allowClear,
    bordered: obj.bordered,
    disabled: obj.behavior === Behavior.DISABLED,
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
