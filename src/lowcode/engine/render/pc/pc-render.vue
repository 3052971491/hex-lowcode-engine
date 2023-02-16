<template>
  <div class="pc-render w-full h-full">
    <!-- 编辑模式 -->
    <template v-if="redactState">
      <hex-draggable v-model:value="modelValue.componentsTree" class="w-full h-full" @add="onAdd" @update="onUpdate">
        <template #item="{ element }">
          <div class="item hex-draggable-handle">
            <component :is="`${element.componentType}Element`" :scheme="element"></component>
          </div>
        </template>
      </hex-draggable>
    </template>
    <!-- 预览模式 -->
    <template v-else>
      <template v-for="item in modelValue.componentsTree" :key="item.id">
        <component :is="`${item.componentType}Element`" :scheme="item"></component>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { LowCodeScheme } from '/@/types/scheme.d';
import { computed, inject } from 'vue';
import HexDraggable from '/@lowcode-engine/components/hex-draggable/hex-draggable.vue';
import { HexCoreInjectionKey } from '/@lowcode-engine/render/render-inject-key';

const core = inject(HexCoreInjectionKey);

interface Props {
  value?: LowCodeScheme.ProjectScheme;
  /** 当前渲染器是否是编辑状态 */
  redactState?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  redactState: false,
});
const emit = defineEmits(['update:value']);

const modelValue = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit('update:value', val);
  },
});

const onAdd = ({ newIndex }: { newIndex: number }) => {
  if (core?.state.projectConfig?.componentsTree[newIndex]) {
    core?.handleUpdateSelectData(core?.state.projectConfig?.componentsTree[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};
</script>

<style lang="less" scoped></style>
