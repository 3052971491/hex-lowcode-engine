<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <div v-if="redactState" ref="__instance__" class="hex-code-view-compiler">（预览时渲染）Vue 组件</div>
    <div v-else class="hex-code-view-renderer">
      <hex-code-view v-bind="prop" />
    </div>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema';
import { defineComponent, ref, computed, inject } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';
import { useElement } from '../../hooks/useElement';
import { RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import HexCodeView from '/@/components/hex-code-view/hex-code-view';

interface Props {
  schema: PcSchema.VueSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}
const redactState = inject(RedactStateInjectionKey);
const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectypeProps } = useElement<PcSchema.VueSchema>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj: PcSchema.VueSchemaProps) => {
    return {
      value: obj?.render ?? '',
    };
  }),
);
</script>

<script lang="ts">
export default defineComponent({
  name: 'VueElement',
});
</script>

<style lang="less" scoped>
.hex-code-view-compiler {
  padding: 10px;
  border: 1px dashed #e6e6e6;
  background-color: #fbfcfd;
}
</style>
