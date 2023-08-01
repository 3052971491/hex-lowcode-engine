<template>
  <collapse-Item-wrapper :label="t(`el.property.Table.${props.attribute}`)" :name="props.attribute" :option="option">
    <template #extra>
      <div v-if="isColumnEditMode" @click.stop="handleExitDetailEditClick">
        <rollback-outlined />
      </div>
    </template>
    <div class="transition-container">
      <div v-if="!isColumnEditMode" style="width: 100%; height: 100%">
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
                  <a-radio :value="element.value">{{ element.title }} : {{ element.dataIndex }} </a-radio>
                </a-radio-group>
              </div>
              <div>
                <EditOutlined class="icon" @click="handleEnableColumnEditClick(element)"></EditOutlined>
                <delete-outlined class="icon" @click="handleDeleteClick(element, index)" />
              </div>
            </div>
          </template>
        </hex-draggable>
        <a-button block type="primary" @click="handleAddOptionClick">{{ t('el.addAnField') }}</a-button>
      </div>
      <a-form
        v-else
        style="width: 100%; height: 100%"
        layout="horizontal"
        label-align="left"
        :label-wrap="true"
        :label-col="{
          style: { width: '86px' },
        }"
        :model="columnEditInfo"
      >
        <template v-if="columnEditInfo">
          <!-- 列编辑 -->
          <!-- 标题 -->
          <a-form-item label="标题" name="title">
            <a-input v-model:value="columnEditInfo.title"></a-input>
          </a-form-item>
          <!-- 字段名 -->
          <a-form-item label="字段名" name="dataIndex">
            <a-input v-model:value="columnEditInfo.dataIndex"></a-input>
          </a-form-item>
          <!-- 列是否固定 -->
          <a-form-item label="是否固定列" name="fixed">
            <a-radio-group v-model:value="columnEditInfo.fixed">
              <a-radio-button value="left">left</a-radio-button>
              <a-radio-button value="right">right</a-radio-button>
              <a-radio-button :value="false">none</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <!-- 列宽度 -->
          <a-form-item label="字段宽度" name="width">
            <a-radio-group v-model:value="columnEditInfo.width">
              <a-radio-button :value="103">微</a-radio-button>
              <a-radio-button :value="135">小</a-radio-button>
              <a-radio-button :value="195">中</a-radio-button>
              <a-radio-button :value="375">大</a-radio-button>
              <a-radio-button :value="730">超大</a-radio-button>
            </a-radio-group>
            <a-form-item-rest>
              <a-input-number v-model:value="columnEditInfo.width" class="mt-2" addon-after="Px"></a-input-number>
            </a-form-item-rest>
          </a-form-item>
          <!-- 超过宽度将自动省略 -->
          <a-form-item label="超过宽度将自动省略" name="ellipsis">
            <a-switch v-model:checked="columnEditInfo.ellipsis"></a-switch>
          </a-form-item>
        </template>
        <a-button block type="primary" @click="handleSaveColumnEditInfoClick">{{ t('el.control.save') }}</a-button>
      </a-form>
    </div>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="TableColumnsEditor">
import { inject, computed, unref, ref } from 'vue';
import { HolderOutlined, DeleteOutlined, EditOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import { cloneDeep } from 'lodash-es';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set } from '/@/utils/schema';
import { LowCode } from '/@/types/schema';
import { buildElementSchemaByType } from '/@/utils/draggable-api';
import { useLocale } from '/@/hooks/use-loacle';
import { BasicColumn } from '/@/components/hex-table';
import { BasicColumnDto } from '/@/schema/common/schema';

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
const modelValue = computed<BasicColumn[]>({
  set(val) {
    if (schema.value.props) {
      schema.value.props[props.attribute] = val;
    }
  },
  get() {
    if (!schema.value.props) return [];
    return schema.value.props[props.attribute] ?? [];
  },
});

const handleAddOptionClick = () => {
  const element = new BasicColumnDto() as BasicColumn;
  modelValue.value.push(element);
  core?.handleUpdateHistoryData();
};

const handleDeleteClick = (options: RadioGroupChildOption, index: number) => {
  if (modelValue.value) {
    modelValue.value.splice(index, 1);
  }
};

/** 是否列编辑模式 */
const isColumnEditMode = ref(false);
const columnEditInfo = ref<BasicColumnDto>();
const __column__ = ref<BasicColumn>({});
/** 进入列编辑模式 */
const handleEnableColumnEditClick = (element: BasicColumn) => {
  isColumnEditMode.value = true;
  columnEditInfo.value = new BasicColumnDto(element);
  __column__.value = element;
};
/** 退出列编辑模式 */
const handleExitDetailEditClick = () => {
  isColumnEditMode.value = false;
  __column__.value = {};
};
const handleSaveColumnEditInfoClick = () => {
  Object.assign(__column__.value, columnEditInfo.value);
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
