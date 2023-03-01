<template>
  <a-col v-bind="ectypeProps">
    <ElementWrapper :schema="schema" :class="classMap">
      <template v-if="isPreview">
        <hex-draggable v-model:value="ectype.children" @add="onAdd" @update="onUpdate">
          <template #item="{ element }">
            <div class="item hex-draggable-handle">
              <component :is="`${ectype.componentType}Element`" :schema="element"></component>
            </div>
          </template>
        </hex-draggable>
      </template>
      <template v-else>
        <template v-for="item in ectype.children" :key="item.id">
          <component :is="`${item.componentType}Element`" :schema="item"></component>
        </template>
      </template>
    </ElementWrapper>
  </a-col>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { computed, defineComponent, inject } from 'vue';
import { cloneDeep } from 'lodash-es';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useElementWrapper } from '../../hooks/useElementWrapper';
import ElementWrapper from '../../components/element-wrapper.vue';

interface Props {
  schema: LowCode.Schema;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
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
  // if (props.schema?.children && props.schema?.children[newIndex]) {
  //   core?.handleUpdateSelectData(props.schema.children[newIndex]);
  //   core?.handleUpdateHistoryData();
  // }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};

const classMap = computed(() => {
  return ['border'];
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'ColumnElement',
});
</script>
<style lang="less" scoped>
.border {
  border: 1px #00000073 dashed;
}
:deep(.draggable) {
  min-height: 68px;
}
</style>
