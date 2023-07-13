<template>
  <div class="toolbar-area w-full flex justify-between">
    <template v-if="!core?.state.__isModalDesigner__">
      <a-space class="ml-2">
        <a-tooltip :title="t('el.nav.undo')">
          <a-button :disabled="core?.undoDisabled()" @click="core?.undoHistoryStep()">
            <template #icon><undo-outlined /></template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('el.nav.redo')">
          <a-button :disabled="core?.redoDisabled()" @click="core?.redoHistoryStep()">
            <template #icon><redo-outlined /></template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('el.nav.clear')">
          <a-button @click="handleClearClick">
            <template #icon><delete-outlined /></template>
          </a-button>
        </a-tooltip>
        <a-tooltip :title="t('el.nav.temporaryStorage')">
          <a-button @click="handleSaveClick">
            <template #icon><cloud-upload-outlined /></template>
          </a-button>
        </a-tooltip>
      </a-space>
      <a-space class="mr-2 mt-2 mb-2">
        <a-tooltip :title="t('el.nav.preview')">
          <a-button @click="handlePreviewClick">
            <template #icon><play-circle-outlined /></template>
          </a-button>
        </a-tooltip>
        <!-- <a-tooltip :title="t('el.nav.JSONCode')">
          <a-button @click="handlePreviewJsonClick">
            <template #icon><project-outlined /></template>
          </a-button>
        </a-tooltip> -->
      </a-space>
    </template>
    <template v-else>
      <a-space class="ml-2">{{ t('el.nav.modalFrameDesign') }}</a-space>
      <a-space class="mr-2 mt-2 mb-2">
        <a-button @click="handleExitModalDesignerClick">
          <template #icon><RollbackOutlined /></template>
        </a-button>
      </a-space>
    </template>
    <hex-modal v-model:visible="visible" :name="modalTitle" :is-footer="false">
      <render v-if="modalType === ComponentTypeEnum.RENDER_PREVIEW" v-model:value="element" />
      <hex-json-pretty v-else-if="modalType === ComponentTypeEnum.JSON_PREVIEW" v-model:value="element" />
    </hex-modal>
  </div>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import {
  UndoOutlined,
  RedoOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  ProjectOutlined,
  RollbackOutlined,
} from '@ant-design/icons-vue';
import HexModal from '/@/components/hex-modal/index.vue';
import Render from '/@/engine/renderer/render.vue';
import HexJsonPretty from '/@/components/hex-json-pretty/index.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
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
const element = ref();

function handlePreviewClick() {
  modalType.value = ComponentTypeEnum.RENDER_PREVIEW;
  modalTitle.value = t('el.nav.preview');
  visible.value = true;
  element.value = cloneDeep(core?.state.projectConfig);
}

function handlePreviewJsonClick() {
  modalType.value = ComponentTypeEnum.JSON_PREVIEW;
  modalTitle.value = t('el.nav.JSONCode');
  visible.value = true;
  element.value = cloneDeep(core?.state.projectConfig);
}

function handleSaveClick() {
  core?.saveCurrentHistoryData();
  message.success(t('el.success.archive'));
}
function handleClearClick() {
  core?.clear();
  // core?.handleUpdateHistoryData();
}

function handleExitModalDesignerClick() {
  if (core) {
    core.state.__isModalDesigner__ = false;
    core.handleResetSelectData();
  }
}
</script>

<style lang="less" scoped>
.toolbar-area {
  background-color: #fff;
}
</style>
