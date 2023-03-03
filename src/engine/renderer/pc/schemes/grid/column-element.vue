<template>
  <a-col v-bind="ectypeProps">
    <ElementWrapper :schema="schema" :class="classMap">
      <template v-if="isPreview">
        <hex-draggable v-model:value="state.schema.children" @add="onAdd" @update="onUpdate">
          <template #item="{ element, index }">
            <div class="item hex-draggable-handle">
              <component
                :is="`${element.componentType}Element`"
                :schema="element"
                :parent-schema="ectype"
                :parent-schema-list="ectype.children"
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
    </ElementWrapper>
  </a-col>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject, reactive } from 'vue';
import { cloneDeep } from 'lodash-es';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useElementWrapper } from '../../hooks/useElementWrapper';
import ElementWrapper from '../../components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';

interface Props {
  schema: PcSchema.ColumnScheme;
  parentSchema: PcSchema.RowScheme;
  parentSchemaList: PcSchema.ColumnScheme[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
});
const state = reactive({
  schema: props.schema,
});
const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});
const { isSelect, isDefault, isPreview, isReadonly, isHidden } = useElementWrapper(
  props.schema,
  selectedScheme.value,
  redactState,
);

const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  if (!ectype.value) return {};
  const obj = ectype.value.props;
  if (!obj) return {};
  return {
    flex: obj.flex,
    offset: obj.offset,
    order: obj.order,
    pull: obj.pull,
    push: obj.push,
    span: obj.span,
    xxxl: obj.xxxl,
    xs: obj.xs,
    sm: obj.sm,
    md: obj.md,
    lg: obj.lg,
    xl: obj.xl,
    xxl: obj.xxl,
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
  name: 'ColumnElement',
});
</script>
<style lang="less" scoped>
:deep(.draggable) {
  min-height: 68px;
}
</style>
