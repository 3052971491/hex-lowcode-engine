<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-tabs ref="__instance__" v-model:activeKey="activeKey" v-bind="prop">
      <template v-if="schema?.children && schema?.children?.length > 0">
        <template v-for="(item, index) in schema.children" :key="item.props?.value ?? item.id">
          <TabPaneElement
            :schema="item"
            :parent-schema="schema"
            :parent-schema-list="schema.children"
            :index-of-parent-list="index"
          ></TabPaneElement>
        </template>
      </template>
    </a-tabs>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { LowCode } from '/@/types/schema.d';
import { PcSchema } from '/@/schema/common/interface';
import ElementWrapper from '../../components/element-wrapper.vue';
import TabPaneElement from './tab-pane-element.vue';
import { defineComponent, computed, inject, ref, watch, unref } from 'vue';
import { RedactStateInjectionKey, HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';

import { useElement } from '../../hooks/useElement';

const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.TabsScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const core = inject(HexCoreInjectionKey);
const __instance__ = ref<any>();
const { ectype, ectypeProps } = useElement<PcSchema.TabsScheme>(props, __instance__);

const prop = ectypeProps((obj) => {
  return {
    type: obj.type,
    animated: obj.animated,
    centered: obj.centered,
    destroyInactiveTabPane: obj.destroyInactiveTabPane,
    hideAdd: obj.hideAdd,
    size: obj.size,
    tabBarGutter: obj.tabBarGutter,
    tabPosition: obj.tabPosition,
  };
}, core);

const activeKey = ref<string>('');

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
  return ['tabs-wrapper'];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'TabsElement',
});
</script>
<style lang="less" scoped>
.tabs-wrapper {
  :deep(.ant-tabs-tabpane) {
    padding-bottom: 28px;
  }
}
</style>
