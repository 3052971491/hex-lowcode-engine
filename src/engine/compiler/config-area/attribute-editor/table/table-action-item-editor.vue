<template>
  <collapse-Item-wrapper
    v-show="hasActionColumn"
    :label="t(`el.property.Table.${props.attribute}`)"
    :name="props.attribute"
    :option="option"
    active-key="0"
  >
    <template #extra>
      <div v-if="isEditMode" @click.stop="handleExitDetailEditClick">
        <rollback-outlined />
      </div>
    </template>
    <div class="transition-container">
      <div style="width: 100%; height: 100%">
        <hex-draggable
          v-model:value="modelValue"
          :put="false"
          :sort="true"
          :pull="false"
          ghost-class=""
          style="overflow: auto; max-height: 400px"
        >
          <template #item="{ element, index }">
            <div class="listitem">
              <div class="listitem-content">
                <holder-outlined class="hex-draggable-handle move" />
                <a-radio-group disabled class="info" @click="handleEnableColumnEditClick(element)">
                  <a-radio :value="element.value">{{ element.label }}</a-radio>
                </a-radio-group>
              </div>
              <div>
                <EditOutlined class="icon" @click="handleEnableColumnEditClick(element)"></EditOutlined>
                <delete-outlined class="icon" @click="handleDeleteClick(element, index)" />
              </div>
            </div>
          </template>
        </hex-draggable>

        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="编辑">{{ t('el.control.edit') }}</a-menu-item>
              <a-menu-item key="删除">{{ t('el.control.delete') }}</a-menu-item>
              <a-menu-item key="自定义">{{ t('el.common.custom') }}</a-menu-item>
            </a-menu>
          </template>
          <a-button block type="primary">{{ t('el.addAnButton') }}</a-button>
        </a-dropdown>
      </div>

      <a-drawer
        :title="`${t('el.property.Table.actionColumn')}: ${actionItemInfo?.label}`"
        placement="right"
        :open="isEditMode"
        width="360"
        :mask="false"
        :closable="false"
        :header-style="{ padding: '8px' }"
        :body-style="{ padding: '8px' }"
        @close="handleExitDetailEditClick"
      >
        <a-form
          layout="horizontal"
          label-align="left"
          :label-wrap="true"
          :label-col="{
            style: { width: '86px' },
          }"
          :model="actionItemInfo"
        >
          <template v-if="actionItemInfo">
            <!-- 列编辑 -->
            <!-- 标题 -->
            <a-form-item :label="t('el.property.label')" name="label">
              <a-input v-model:value="actionItemInfo.label"></a-input>
            </a-form-item>
            <events-editor
              v-model:value="actionItemInfo"
              label="动作设置"
              attribute="events"
              :option="{
                type: 'TableAction',
                name: 'events',
                label: '动作设置',
                editor: 'events-editor',
                advanced: true,
              }"
              :built-in="false"
            />
          </template>
        </a-form>
        <template #extra>
          <a-button style="margin-right: 8px" @click="handleExitDetailEditClick">{{ t('el.control.cancel') }}</a-button>
          <a-button type="primary" @click="handleSaveColumnEditInfoClick">{{ t('el.control.save') }}</a-button>
        </template>
      </a-drawer>
    </div>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="TableActionItemEditor">
import { inject, computed, ref } from 'vue';
import { HolderOutlined, DeleteOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import { MenuProps } from 'ant-design-vue/es/menu';
import { cloneDeep } from 'lodash-es';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { useLocale } from '/@/hooks/use-loacle';
import { ActionItem, BasicColumn } from '/@/components/hex-table';
import { ActionItemDto } from '/@/schema/common/schema';
import EventsEditor from '../common/events-editor.vue';

const { t } = useLocale();
interface Props {
  label: string;
  attribute: string;
  option: AttributeItem;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  attribute: '',
});

const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
const modelValue = computed<ActionItem[]>({
  set(val) {
    if (schema.value.props) {
      schema.value.props[props.attribute] = val;
    }
  },
  get() {
    if (!schema.value.props) return [];
    return schema.value.props[props.attribute] || [];
  },
});

/** 是否有操作列 */
const hasActionColumn = computed(() => {
  return !!schema.value?.props?.columns.find((item: BasicColumn) => item.dataIndex === 'action');
});

const handleMenuClick: MenuProps['onClick'] = (e) => {
  const element = new ActionItemDto({
    label: e.key,
  }) as ActionItem;
  modelValue.value.push(element);
  core?.handleUpdateHistoryData();
};

const handleDeleteClick = (options: RadioGroupChildOption, index: number) => {
  modelValue.value.splice(index, 1);
};

/** 是否列编辑模式 */
const isEditMode = ref(false);
const actionItemInfo = ref<ActionItemDto>();
const __item__ = ref<ActionItem>({});
/** 进入列编辑模式 */
const handleEnableColumnEditClick = (element: ActionItem) => {
  actionItemInfo.value = new ActionItemDto(cloneDeep(element));
  __item__.value = element;
  isEditMode.value = true;
};
/** 退出列编辑模式 */
const handleExitDetailEditClick = () => {
  __item__.value = {};
  actionItemInfo.value = undefined;
  isEditMode.value = false;
};
const handleSaveColumnEditInfoClick = () => {
  Object.assign(__item__.value, actionItemInfo.value);
  core?.handleUpdateHistoryData();
  handleExitDetailEditClick();
};
</script>

<style lang="less" scoped>
:deep(.ant-collapse-content) {
  background: #fff;
}
.listitem {
  position: relative;
  display: flex;
  align-items: stretch;
  margin-bottom: 8px;
  padding: 4px;
  width: 100%;
  border: 1px solid rgba(31, 56, 88, 0.2);
  border-radius: 3px;
  color: #00000073;
  background: #fff;
  outline: none;

  .listitem-content {
    flex: 1 1 0%;
    display: flex;

    .info {
      display: block;
      width: 100%;
      cursor: pointer;
    }
  }

  &:hover {
    background: transparent;
  }

  .move {
    margin-right: 6px;
    margin-left: 3px;
    cursor: move;
  }

  .icon {
    margin-left: 0.25rem;
    cursor: pointer;
  }
  .hex-draggable-handle {
    display: flex;
    align-items: center;
  }
}
</style>
