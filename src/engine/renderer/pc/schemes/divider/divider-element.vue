<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-divider ref="__instance__" class="w-full" v-bind="prop" :class="[ectype.props.className]">
      {{ ectype.props.content }}
    </a-divider>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { computed, defineComponent, ref } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.DividerSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.DividerSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.DividerSchemaProps) => {
    return {
      type: obj.type,
      dashed: obj.dashed,
      orientation: obj.orientation,
      plain: obj.plain,
      // orientationMargin: `${obj.orientationMargin}px`,
    };
  }),
);
</script>

<script lang="ts">
export default defineComponent({
  name: 'DividerElement',
});
</script>
