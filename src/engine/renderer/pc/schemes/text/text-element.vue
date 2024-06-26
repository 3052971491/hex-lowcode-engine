<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <div
      ref="__instance__"
      class="w-full"
      v-bind="privateProp"
      :title="prop.showTitle ? prop.content : ''"
      :class="[ectype.props.className, textWrapperStyle ? 'textWrapper' : '']"
    >
      {{ prop.content }}
    </div>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { defineComponent, ref, computed, toRefs } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';

interface Props {
  schema: PcSchema.TextSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.TextSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.TextSchemaProps) => {
    return {
      content: obj?.content ?? '',
      showTitle: obj.showTitle,
      maxLine: obj.maxLine > 0 ? obj.maxLine : 0,
    };
  }),
);

const privateProp = computed(() => ectypeProps(() => {}));

const textWrapperStyle = computed(() => {
  return prop.value.maxLine >= 0;
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'TextElement',
});
</script>
<style lang="less" scoped>
.textWrapper {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: v-bind('prop.maxLine');
  box-sizing: border-box;
}
</style>
