<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-alert ref="__instance__" v-bind="prop" :class="[ectype.props.className]" />
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { defineComponent, ref, computed } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.AlertSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.AlertSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.AlertSchemaProps) => {
    return {
      type: obj.type,
      message: obj.message,
      description: obj.description,
      showIcon: obj.showIcon,
      closable: obj.closable,
      banner: obj.banner,
    };
  }),
);
</script>

<script lang="ts">
export default defineComponent({
  name: 'AlertElement',
});
</script>
