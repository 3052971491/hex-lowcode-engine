<template>
  <collapse-Item-wrapper :label="t(`el.property.Filter.config`)" :name="props.attribute" :option="option">
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
                  <a-radio :value="element.value">{{ element.props.label }}</a-radio>
                </a-radio-group>
              </div>
              <div>
                <EditOutlined class="icon" @click="handleEnableColumnEditClick(element)"></EditOutlined>
                <delete-outlined class="icon" @click="handleDeleteClick(element, index)" />
              </div>
            </div>
          </template>
        </hex-draggable>
        <a-empty v-if="modelValue.length < 1" :image="Empty.PRESENTED_IMAGE_SIMPLE"></a-empty>
      </div>

      <a-drawer
        :title="t('el.control.edit')"
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
            <a-form-item :label="t('el.property.Filter.span')" name="span">
              <a-input-number v-model:value="actionItemInfo.span"></a-input-number>
            </a-form-item>
            <a-form-item :label="t('el.property.Filter.isAdvanced')" name="isAdvanced">
              <a-switch v-model:checked="actionItemInfo.isAdvanced"></a-switch>
            </a-form-item>
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
<script lang="ts" setup name="FilterConfigEditor">
import { inject, computed, ref, unref } from 'vue';
import { HolderOutlined, DeleteOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import { Empty } from 'ant-design-vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { useLocale } from '/@/hooks/use-loacle';
import { FilterConfigItemDto } from '/@/schema/common/schema';
import { PcSchema } from '/@/schema/common/interface';

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
  return core?.state.selectedData?.selectedScheme! as PcSchema.FilterSchema;
});
const modelValue = computed<PcSchema.FilterConfigItem[]>({
  set(val) {
    if (schema.value) {
      schema.value[props.attribute] = val;
    }
  },
  get() {
    if (!schema.value) return [];
    return schema.value[props.attribute] || [];
  },
});

const handleDeleteClick = (options: RadioGroupChildOption, index: number) => {
  modelValue.value.splice(index, 1);
};
const filterItemConfig = computed(() => (element: PcSchema.FilterSchema) => {
  return unref(schema).props?.config?.find((item) => item.componentId === element.id);
});

/** 是否列编辑模式 */
const isEditMode = ref(false);
const actionItemInfo = ref<FilterConfigItemDto>();
const __item__ = ref<PcSchema.FilterConfigItem>();
/** 进入列编辑模式 */
const handleEnableColumnEditClick = (element: PcSchema.FilterSchema) => {
  const result = new FilterConfigItemDto(filterItemConfig.value(element));
  actionItemInfo.value = new FilterConfigItemDto(result);
  __item__.value = result;
  isEditMode.value = true;
};
/** 退出列编辑模式 */
const handleExitDetailEditClick = () => {
  __item__.value = undefined;
  actionItemInfo.value = undefined;
  isEditMode.value = false;
};
const handleSaveColumnEditInfoClick = () => {
  const idx = unref(schema).props?.config?.findIndex((item) => item.componentId === actionItemInfo.value?.componentId);
  if (idx !== -1 && unref(schema)?.props?.config) {
    unref(schema).props.config[idx] = actionItemInfo.value!;
  }
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
