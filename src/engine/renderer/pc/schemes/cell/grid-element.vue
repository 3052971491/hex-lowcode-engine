<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
  >
    <hex-cell
      ref="__instance__"
      v-model:value="ectype"
      :disabled="!redactState || selectedScheme?.id !== props.schema.id"
      :class="[ectype.props.className]"
    >
      <template #cell="{ item: cell }">
        <template v-if="isPreview">
          <hex-draggable v-model:value="cell.children" @add="onAdd($event, cell as GridCol)" @update="onUpdate">
            <template #item="{ element, index }">
              <div class="item hex-draggable-handle">
                <component
                  :is="`${element.componentType}Element`"
                  :schema="element"
                  :parent-schema="cell"
                  :parent-schema-list="cell.children"
                  :index-of-parent-list="index"
                ></component>
              </div>
            </template>
          </hex-draggable>
        </template>
        <template v-else>
          <div v-for="(item, index) in cell.children" :key="item.id">
            <template v-if="true">
              <component
                :is="`${item.componentType}Element`"
                :schema="item"
                :parent-schema="cell"
                :parent-schema-list="cell.children"
                :index-of-parent-list="index"
              />
            </template>
          </div>
        </template>
      </template>
    </hex-cell>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, onMounted, reactive, ref, watch } from 'vue';
import { useEventBus } from '@vueuse/core';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCode } from '/@/types/schema.d';
import { HexCoreInjectionKey, RedactStateInjectionKey } from '/@/engine/renderer/render-inject-key';
import { gridInstanceKey, gridOperateKey } from '/@/engine/renderer/render-event-bus-key';
import { PcSchema } from '/@/schema/common/interface';
import { useElementWrapper } from '../../hooks/useElementWrapper';
import HexCell from '/@/components/hex-cell/hex-cell.vue';
import { Grid, GridCol } from '/@/schema/common/schema';

const __instance__ = ref<any>();

const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.GridScheme;
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
const onAdd = ({ newIndex }: { newIndex: number }, cell: GridCol) => {
  if (cell?.children && cell?.children[newIndex]) {
    core?.handleUpdateSelectData(cell.children[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};
const { isPreview } = useElementWrapper(props.schema, selectedScheme.value, redactState);
const ectype = computed(() => {
  return (!redactState ? new Grid(props.schema) : state.schema) as Grid;
});

/**
 * 单元格操作事件
 * @description 配合grid-operate-editor.vue完成对单元格的增加, 删除, 合并, 拆分
 */
const onGridOperateCallback = () => {
  if (!redactState) return;
  const bus = useEventBus(gridOperateKey);

  bus.on((org) => {
    if (org.id === ectype.value.id && __instance__.value) {
      __instance__.value.run(org.name);
    }
  });
};

const emitGridOperateCallback = () => {
  if (!redactState) return;
  const bus2 = useEventBus(gridInstanceKey);
  watch(
    () => core?.state.selectedData?.selectedId,
    (val) => {
      if (val !== ectype.value.id) return;
      // 此处加延迟是第一次选中初始化时, 属性编辑器未渲染而导致其接受失败
      setTimeout(() => {
        bus2.emit({ instance: __instance__.value });
      }, 100);
    },
  );
};

onMounted(() => {
  emitGridOperateCallback();
  onGridOperateCallback();
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'GridElement',
});
</script>
<style lang="less" scoped>
.hex-cell-layout {
  :deep(.draggable) {
    padding: 0;
    min-height: 36px;
  }
}

:deep(.ant-form-item) {
  margin-bottom: 0;
}
</style>
