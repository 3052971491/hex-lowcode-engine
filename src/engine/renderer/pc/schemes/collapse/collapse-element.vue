<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-collapse ref="__instance__" v-model:activeKey="activeKey" v-bind="prop" :class="[ectype.props.className]">
      <template v-if="schema?.children && schema?.children?.length > 0">
        <CollapsePanelElement
          v-for="(item, index) in schema.children"
          :key="item.props?.key ?? item.id"
          :schema="item"
          :parent-schema="schema"
          :parent-schema-list="schema.children"
          :index-of-parent-list="index"
        ></CollapsePanelElement>
      </template>
    </a-collapse>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { LowCode } from '/@/types/schema.d';
import { PcSchema } from '/@/schema/common/interface';
import ElementWrapper from '../../components/element-wrapper.vue';
import CollapsePanelElement from './collapse-panel-element.vue';
import { defineComponent, computed, inject, ref, watch, unref } from 'vue';
import { RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElement } from '../../hooks/useElement';

const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.CollapseScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const __instance__ = ref<any>();
const { ectype, ectypeProps } = useElement<PcSchema.CollapseScheme>(props, __instance__);

const prop = computed(() =>
  ectypeProps((obj) => {
    return {
      accordion: obj.accordion,
      bordered: obj.bordered,
      collapsible: obj.collapsible,
      destroyInactivePanel: obj.destroyInactivePanel,
      expandIconPosition: obj.expandIconPosition,
      ghost: obj.ghost,
    };
  }),
);

const activeKey = ref<string | string[]>('');

watch(
  ectype,
  (val) => {
    if (unref(activeKey) !== val.props.defaultValue) {
      activeKey.value = val.props.defaultValue;
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'CollapseElement',
});
</script>
