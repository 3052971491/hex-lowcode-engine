<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <div
      ref="__instance__"
      class="button-group"
      :style="{
        justifyContent: ectype.props.align,
      }"
      :class="[ectype.props.className]"
    >
      <template v-if="schema?.children && schema?.children?.length > 0">
        <template v-for="(item, index) in schema.children" :key="item.id">
          <template v-if="redactState">
            <ButtonElement
              :schema="item"
              :parent-schema="schema"
              :parent-schema-list="schema.children"
              :index-of-parent-list="index"
            />
          </template>
          <template v-else>
            <ButtonElement
              v-if="item.condition"
              :schema="item"
              :parent-schema="schema"
              :parent-schema-list="schema.children"
              :index-of-parent-list="index"
            />
          </template>
        </template>
      </template>
    </div>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { LowCode } from '/@/types/schema.d';
import { PcSchema } from '/@/schema/common/interface';
import ElementWrapper from '../../components/element-wrapper.vue';
import ButtonElement from './button-element.vue';
import { defineComponent, computed, inject, ref } from 'vue';
import { RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElement } from '../../hooks/useElement';

const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.ButtonGroupSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectype } = useElement<PcSchema.ButtonGroupSchema>(props, __instance__);

const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'ButtonGroupElement',
});
</script>
<style lang="less" scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
}
</style>
