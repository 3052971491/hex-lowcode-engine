<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-space ref="__instance__" v-bind="ectypeProps" class="w-full h-full" :class="[ectype.props.className]">
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
          <component
            :is="`${item.componentType}Element`"
            :schema="item"
            :parent-schema="ectype"
            :parent-schema-list="ectype.children"
            :index-of-parent-list="index"
          />
        </div>
      </template>
    </a-space>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, reactive, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCode } from '/@/types/schema.d';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { PcSchema } from '/@/schema/common/interface';
import { useElementWrapper } from '../../hooks/useElementWrapper';

const __instance__ = ref<any>();

const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.SpaceScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const state = reactive({
  schema: props.schema,
});
const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
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
const { isPreview } = useElementWrapper(props.schema, selectedScheme.value, redactState);
const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  if (!ectype.value) return {};
  const obj = ectype.value.props;
  return {
    align: obj.align,
    direction: obj.direction,
    size: obj.size,
  };
});

const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'SpaceElement',
});
</script>
<style lang="less" scoped>
:deep(.draggable) {
  padding-bottom: 12px;
  min-height: 68px;
}

:deep(.ant-space-item) {
  width: 100%;
  height: 100%;
}
</style>
