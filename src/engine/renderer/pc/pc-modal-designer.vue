<template>
  <div class="modal-designer">
    <ElementWrapper
      :schema="schema"
      :parent-schema="parentSchema"
      :parent-schema-list="parentSchemaList"
      :index-of-parent-list="indexOfParentList"
      class="h-full"
    >
      <div>
        <a-divider orientation="right" orientation-margin="50px"> 内容区 </a-divider>
      </div>
      <div class="modal-designer-content">
        <hex-draggable
          v-model:value="contentModelValue.children"
          class="w-full h-full"
          @add="onAddContent"
          @update="onUpdate"
        >
          <template #item="{ element, index }">
            <div class="item hex-draggable-handle">
              <component
                :is="`${element.componentType}Element`"
                :schema="element"
                :parent-schema="schema?.children ? schema?.children[0] : undefined"
                :parent-schema-list="schema?.children && schema?.children[0] ? schema.children[0].children : []"
                :index-of-parent-list="index"
              ></component>
            </div>
          </template>
        </hex-draggable>
      </div>
      <div>
        <a-divider orientation="right" orientation-margin="50px"> 底部操作区 </a-divider>
      </div>
      <div class="modal-designer-footer">
        <hex-draggable
          v-model:value="footerModelValue.children"
          class="w-full h-full"
          @add="onAddFooter"
          @update="onUpdate"
        >
          <template #item="{ element, index }">
            <div class="item hex-draggable-handle">
              <component
                :is="`${element.componentType}Element`"
                :schema="element"
                :parent-schema="schema?.children ? schema?.children[1] : undefined"
                :parent-schema-list="schema?.children && schema?.children[1] ? schema.children[1].children : []"
                :index-of-parent-list="index"
              ></component>
            </div>
          </template>
        </hex-draggable>
      </div>
    </ElementWrapper>
  </div>
</template>
<script lang="ts" setup>
import { computed, inject } from 'vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import ElementWrapper from './components/element-wrapper.vue';
import { LowCode } from '/@/types/schema';

const core = inject(HexCoreInjectionKey);
interface Props {
  schema: any;
  parentSchema: any;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});

const modalValue = computed(() => {
  return core?.state.projectConfig?.dialogComponentsTree.find(
    (item: any) => item.id === core?.state.selectedData?.selectedModalScheme?.id,
  );
});
const contentModelValue = computed({
  get() {
    return props.schema?.children ? props.schema?.children[0] : [];
  },
  set(val: any) {
    if (modalValue.value?.children) {
      modalValue.value.children[0] = val;
    }
  },
});

const footerModelValue = computed({
  get() {
    return props.schema?.children ? props.schema?.children[1] : [];
  },
  set(val: any) {
    if (modalValue.value?.children) {
      modalValue.value.children[1] = val;
    }
  },
});

const onAddContent = ({ newIndex }: { newIndex: number }) => {
  if (props.schema?.children[0].children[newIndex]) {
    core?.handleUpdateSelectData(props.schema?.children[0].children[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onAddFooter = ({ newIndex }: { newIndex: number }) => {
  if (props.schema?.children[1].children[newIndex]) {
    core?.handleUpdateSelectData(props.schema?.children[1].children[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};
</script>

<style lang="less" scoped>
.modal-designer {
  :deep(.container-edit-wrapper) {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-content {
    flex: 1;
    overflow: auto;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  &-footer {
    overflow: auto;
    height: 100px;
    min-height: 40px;
  }
}
</style>
