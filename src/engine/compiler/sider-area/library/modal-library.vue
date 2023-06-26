<template>
  <div class="element-library">
    <a-skeleton active :loading="loading">
      <a-space class="w-full">
        <a-input-search
          v-model:value="filterText"
          class="w-full"
          :placeholder="t('el.placeholder.search')"
          enter-button
        ></a-input-search>
        <a-button type="primary" @click="onAdd">{{ t('el.control.add') }}</a-button>
      </a-space>
      <div v-if="modalList.length < 1" class="w-full p-3">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" :description="t('el.common.noData')"></a-empty>
      </div>
      <template v-else>
        <a-list item-layout="vertical" :data-source="modalList" class="overflow-auto">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta :description="item.description || '--'">
                <template #title>
                  <a href="#" @click="handleGoToModalDesigner(item)">{{ item.props.title }}</a>
                </template>
              </a-list-item-meta>
              <template #actions>
                <CopyOutlined class="cursor-pointer" @click="handleCopy(item)" />
                <EditOutlined class="cursor-pointer" @click="handleEdit(item)" />
                <a-popconfirm ok-text="确认" cancel-text="取消" placement="right" @confirm="handleDelete(item)">
                  <template #title>
                    <div>确认是否删除该模态框?</div>
                  </template>
                  <DeleteOutlined class="cursor-pointer" />
                </a-popconfirm>
              </template>
            </a-list-item>
          </template>
        </a-list>
      </template>
    </a-skeleton>
    <hex-modal v-model:visible="visible" :name="modalTitle" @ok="handleOk">
      <CreateOrUpdateModalInfo ref="modalInfo" :data="state.info"></CreateOrUpdateModalInfo>
    </hex-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { Empty, message } from 'ant-design-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons-vue';
import HexModal from '/@/components/hex-modal/index.vue';
import { useClipboard } from '@vueuse/core';
import CreateOrUpdateModalInfo from './create-or-update-modal-info.vue';
import { buildElementSchemaByType } from '/@/utils/draggable-api';
import { PcSchema } from '/@/schema/common/interface';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const core = inject(HexCoreInjectionKey);
const state = reactive<{
  type: string;
  info: PcSchema.ModalSchema;
}>({
  type: '',
  info: undefined!,
});

const { copy } = useClipboard();
const filterText = ref('');

const visible = ref(false);
const modalTitle = ref('');
const modalInfo = ref();

const modalList = computed(() => {
  return (
    core?.state?.projectConfig?.dialogComponentsTree.filter(
      (item) => item.id.includes(filterText.value) || item?.props?.title.includes(filterText.value),
    ) ?? []
  );
});

/** 新增模态框或者抽屉 */
function onAdd() {
  // 模态框
  const result = buildElementSchemaByType('LAYOUT', 'Modal') as PcSchema.ModalSchema;

  if (result) {
    // 内容区
    const content = buildElementSchemaByType('LAYOUT', 'ModalContent') as PcSchema.ModalContentSchema;
    // 操作区
    const footer = buildElementSchemaByType('LAYOUT', 'ModalFooter') as PcSchema.ModalFooterSchema;
    result.children.push(content, footer);
    state.info = result;
    visible.value = !visible.value;
    modalTitle.value = '新增模态框';
  } else {
    message.error('创建模态款失败, 请联系管理员');
  }
}

/** 编辑模态框或者抽屉 */
function handleEdit(result: PcSchema.ModalSchema) {
  state.info = result;
  visible.value = !visible.value;
  modalTitle.value = '编辑模态框';
}

function handleCopy(result: PcSchema.ModalSchema) {
  const { id } = result;
  copy(id);
  message.success(`已复制到系统剪贴板: ${id}`);
}

function handleDelete(result: PcSchema.ModalSchema) {
  if (core?.state.projectConfig) {
    const index = core.state.projectConfig.dialogComponentsTree.findIndex((item) => item.id === result.id);
    if (index !== -1) {
      core.state.__isModalDesigner__ = false;
      core.state.projectConfig.dialogComponentsTree.splice(index, 1);
      core?.saveCurrentHistoryData();
    }
  }
}

function handleOk() {
  modalInfo.value.validate().then((res: PcSchema.ModalSchema) => {
    if (core?.state.projectConfig) {
      const index = core.state.projectConfig.dialogComponentsTree.findIndex((item) => item.id === res.id);
      if (index === -1) {
        // 新增
        core.state.projectConfig.dialogComponentsTree.push(res);
      } else {
        // 编辑
        const obj = core.state.projectConfig?.dialogComponentsTree[index];
        if (obj.props && obj.props.title) {
          obj.props.title = res.props.title;
        }
        obj.description = res.description;
      }
    }
    core?.saveCurrentHistoryData();
    visible.value = !visible.value;
  });
}

/** 进入模态框设计页面 */
function handleGoToModalDesigner(result: PcSchema.ModalSchema) {
  if (core) {
    core.state.__isModalDesigner__ = true;
    core.handleUpdateModalSelectData(result, [result]);
    core?.handleUpdateSelectData(result, [result]);
  }
}
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped>
.element-library {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
