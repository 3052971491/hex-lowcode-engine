<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <a-image
      ref="__instance__"
      v-bind="prop"
      :fallback="fallbackImage"
      :style="{
        width: ectype.props.autoWidth ? 'auto' : false,
        height: ectype.props.autoHeight ? 'auto' : false,
      }"
      :class="[ectype.props.className]"
    />
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { defineComponent, ref, computed } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';
import fallbackImage from './fallback-img.svg';

interface Props {
  schema: PcSchema.ImageSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectype, ectypeProps } = useElement<PcSchema.ImageSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.ImageSchemaProps) => {
    const { src, width, height, title, alt, preview } = obj;
    return {
      src,
      width: obj.autoWidth ? '' : width,
      height: obj.autoHeight ? '' : height,
      title,
      alt,
      preview,
    };
  }),
);
</script>

<script lang="ts">
export default defineComponent({
  name: 'ImageElement',
});
</script>
<style lang="less" scoped>
:deep(.ant-image-img) {
  width: inherit;
  height: inherit;
  object-fit: v-bind('ectype.props.fit');
}
</style>
