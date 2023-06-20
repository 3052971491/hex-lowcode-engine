<template>
  <a-collapse-panel v-bind="ectypeProps" :class="[ectype.props.className]">
    <template #header>{{ ectypeProps.header }}</template>
    <ElementWrapper
      :schema="schema"
      :parent-schema="parentSchema"
      :parent-schema-list="parentSchemaList"
      :index-of-parent-list="indexOfParentList"
      :class="classMap"
    >
      <template v-if="isPreview">
        <hex-draggable v-model:value="state.schema.children" @add="onAdd" @update="onUpdate">
          <template #item="{ element, index }">
            <div class="item hex-draggable-handle">
              <component
                :is="`${element.componentType}Element`"
                :schema="element"
                :parent-schema="state.schema"
                :parent-schema-list="state.schema.children"
                :index-of-parent-list="index"
              ></component>
            </div>
          </template>
        </hex-draggable>
      </template>
      <template v-else>
        <div v-for="(item, index) in ectype.children" :key="item.id">
          <template v-if="true">
            <component
              :is="`${item.componentType}Element`"
              :schema="item"
              :parent-schema="ectype"
              :parent-schema-list="ectype.children"
              :index-of-parent-list="index"
            />
          </template>
        </div>
      </template>
    </ElementWrapper>
  </a-collapse-panel>
</template>

<script lang="ts" setup>
import { defineComponent, computed, inject, reactive } from 'vue';
import { cloneDeep } from 'lodash-es';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useElementWrapper } from '../../hooks/useElementWrapper';
import ElementWrapper from '../../components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';

interface Props {
  schema: PcSchema.CollapsePanelScheme;
  parentSchema: PcSchema.CollapseScheme;
  parentSchemaList: PcSchema.CollapsePanelScheme[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const state = reactive({
  schema: props.schema,
});
const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});
const { isPreview } = useElementWrapper(props.schema, selectedScheme.value, redactState);

const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  if (!ectype.value) return {};
  const obj = ectype.value.props;
  return {
    header: obj.header,
    key: obj.key,
    forceRender: obj.forceRender,
    collapsible: obj.collapsible,
    showArrow: obj.showArrow,
  };
});

const onAdd = ({ newIndex }: { newIndex: number }) => {
  if (props.schema?.children && props.schema?.children[newIndex]) {
    core?.handleUpdateSelectData(props.schema.children[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};

const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'CollapsePanelElement',
});
</script>
<style lang="less" scoped>
:deep(.draggable) {
  min-height: 68px;
}
</style>
