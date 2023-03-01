<template>
  <div class="toolbar-area w-full flex justify-between">
    <a-space class="ml-2 mt-2 mb-2">
      <a-tooltip title="后退">
        <a-button :disabled="core?.undoDisabled()" @click="core?.undoHistoryStep()">
          <template #icon><undo-outlined /></template>
        </a-button>
      </a-tooltip>
      <a-tooltip title="前进">
        <a-button :disabled="core?.redoDisabled()" @click="core?.redoHistoryStep()">
          <template #icon><redo-outlined /></template>
        </a-button>
      </a-tooltip>
      <a-tooltip title="清空">
        <a-button @click="handleClearClick">
          <template #icon><delete-outlined /></template>
        </a-button>
      </a-tooltip>
      <a-tooltip title="暂存">
        <a-button @click="handleSaveClick">
          <template #icon><cloud-upload-outlined /></template>
        </a-button>
      </a-tooltip>
    </a-space>
    <a-space class="mr-2 mt-2 mb-2" :size="0">
      <a-button type="link" size="small" @click="handlePreviewClick"> 预览 </a-button>
      <a-button type="link" size="small" @click="handlePreviewJsonClick"> 查看JSON </a-button>
    </a-space>
    <hex-modal v-model:visible="visible" :name="modalTitle" :is-footer="false">
      <render v-if="modalType === ComponentTypeEnum.RENDER_PREVIEW" v-model:value="element" />
      <hex-json-pretty v-else-if="modalType === ComponentTypeEnum.JSON_PREVIEW" v-model:value="element" />
    </hex-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { UndoOutlined, RedoOutlined, CloudUploadOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import HexModal from '/@/components/hex-modal/index.vue';
import Render from '/@/engine/render/render.vue';
import HexJsonPretty from '/@/components/hex-json-pretty/index.vue';
import { HexCoreInjectionKey } from '/@/engine/render/render-inject-key';
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';

const core = inject(HexCoreInjectionKey);

enum ComponentTypeEnum {
  /** 渲染器预览 */
  RENDER_PREVIEW = 'render-preview',
  /** JSON预览 */
  JSON_PREVIEW = 'json-preview',
}
const modalType = ref('');
const modalTitle = ref('');

const visible = ref(false);

function handlePreviewClick() {
  modalType.value = ComponentTypeEnum.RENDER_PREVIEW;
  modalTitle.value = '预览';
  visible.value = true;
}

function handlePreviewJsonClick() {
  modalType.value = ComponentTypeEnum.JSON_PREVIEW;
  modalTitle.value = '查看JSON';
  visible.value = true;
}

const element = computed(() => {
  return cloneDeep(core?.state.projectConfig);
});

function handleSaveClick() {
  core?.saveCurrentHistoryData();
  message.success('存档成功', 100);
}
function handleClearClick() {
  core?.clear();
  // core?.handleUpdateHistoryData();
}
</script>

<style lang="less" scoped>
.toolbar-area {
  background-color: #fff;
}
</style>
