<template>
  <collapse-Item-wrapper
    :label="t(`el.property.Table.${props.attribute}`)"
    :name="props.attribute"
    :option="option"
    active-key="0"
  >
    <template #extra>
      <div v-if="isColumnEditMode" @click.stop="handleExitDetailEditClick">
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

        <a-dropdown>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="action" :disabled="!!modelValue.find((item) => item.dataIndex === 'action')">
                {{ t('el.property.Table.actionItem') }}
              </a-menu-item>
              <a-menu-item key="field">{{ t('el.common.custom') }}</a-menu-item>
            </a-menu>
          </template>
          <a-button block type="primary">{{ t('el.addAnField') }}</a-button>
        </a-dropdown>
      </div>
      <a-drawer
        :title="`${columnEditInfo?.title}`"
        placement="right"
        :open="isColumnEditMode"
        width="360"
        :mask="false"
        :closable="false"
        :header-style="{ padding: '8px' }"
        :body-style="{ padding: '8px' }"
      >
        <a-form
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
              <div class="flex flex-col">
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
              </div>
            </a-form-item>
            <!-- 对齐方式 -->
            <a-form-item label="对齐方式" name="align">
              <a-radio-group v-model:value="columnEditInfo.align">
                <a-radio-button value="left">Left</a-radio-button>
                <a-radio-button value="center">Center</a-radio-button>
                <a-radio-button value="right">Right</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <!-- 超过宽度将自动省略 -->
            <a-form-item label="超过宽度将自动省略" name="ellipsis">
              <a-switch v-model:checked="columnEditInfo.ellipsis"></a-switch>
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
<script lang="ts" setup name="TableColumnsEditor">
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

const handleMenuClick: MenuProps['onClick'] = (e) => {
  if (e.key === 'action') {
    // 操作栏
    const element = new BasicColumnDto({
      title: '操作栏',
      fixed: 'right',
      dataIndex: e.key,
      align: 'center',
    }) as BasicColumn;
    modelValue.value.push(element);
    core?.handleUpdateHistoryData();
  } else if (e.key === 'field') {
    // 普通字段
    const element = new BasicColumnDto() as BasicColumn;
    modelValue.value.push(element);
    core?.handleUpdateHistoryData();
  }
};

const handleDeleteClick = (options: RadioGroupChildOption, index: number) => {
  modelValue.value.splice(index, 1);
};

/** 是否列编辑模式 */
const isColumnEditMode = ref(false);
const columnEditInfo = ref<BasicColumnDto>();
const __item__ = ref<BasicColumn>({});
/** 进入列编辑模式 */
const handleEnableColumnEditClick = (element: BasicColumn) => {
  columnEditInfo.value = new BasicColumnDto(cloneDeep(element));
  __item__.value = element;
  isColumnEditMode.value = true;
};
/** 退出列编辑模式 */
const handleExitDetailEditClick = () => {
  __item__.value = {};
  isColumnEditMode.value = false;
};
const handleSaveColumnEditInfoClick = () => {
  Object.assign(__item__.value, columnEditInfo.value);
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
