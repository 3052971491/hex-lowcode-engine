<template>
  <collapse-Item-wrapper :label="props.option.label" :name="props.attribute" :option="props.option">
    <collapse-Item-wrapper
      v-for="(item, index) in eventsMap"
      :key="index"
      :label="item.title"
      :show-arrow="false"
      collapsible="disabled"
    >
      <div v-for="event in item.data.events" :key="event.id" class="event-item">
        <div class="title">{{ event.name }}</div>
        <div>
          <a-tooltip placement="top">
            <template #title>
              <span>编辑</span>
            </template>
            <edit-outlined class="mr-1" @click="onEditActionClick(item.value, event)" />
          </a-tooltip>

          <a-tooltip placement="top">
            <template #title>
              <span>删除</span>
            </template>
            <delete-outlined @click="onDeleteActionClick(item.value, event)" />
          </a-tooltip>
        </div>
      </div>
    </collapse-Item-wrapper>
    <a-dropdown>
      <template #overlay>
        <a-menu @click="onAddActionClick">
          <a-menu-item v-for="item in actionOptions" :key="item">{{ item.title }}</a-menu-item>
        </a-menu>
      </template>
      <a-button type="primary" block>新建动作</a-button>
    </a-dropdown>

    <hex-modal v-model:visible="visible" :name="modalTitle" @ok="handleSubmit">
      <div class="w-full h-full overflow-hidden flex flex-col">
        <a-row>
          <a-col :span="9">
            <a-typography-title :level="5">响应动作</a-typography-title>
          </a-col>
          <a-col :span="15">
            <a-typography-title :level="5">动作名称</a-typography-title>
          </a-col>
        </a-row>
        <a-row class="flex-1" :gutter="8">
          <a-col :span="9">
            <div class="action-setting-selector-inner">
              <div class="action-setting-selector-category">
                <div class="action-setting-ul">
                  <a-radio-group v-model:value="state.formModel.type" class="w-full" @change="handleTypeChange">
                    <li class="action-setting-li" :class="['BuiltInAction' === state.formModel.type ? 'active' : '']">
                      <a-radio value="BuiltInAction">内置动作</a-radio>
                    </li>
                    <li class="action-setting-li" :class="['PageJS' === state.formModel.type ? 'active' : '']">
                      <a-radio value="PageJS">页面 JS</a-radio>
                    </li>
                  </a-radio-group>
                </div>
              </div>
              <div class="code-actions-items-container">
                <div class="action-setting-ul">
                  <div class="mb-1">
                    <a-input v-model:value="state.filterText" placeholder="搜索" allow-clear></a-input>
                  </div>
                  <a-radio-group v-model:value="state.formModel.id" class="w-full">
                    <li
                      v-for="(item, index) in actionIds"
                      :key="index"
                      class="action-setting-li"
                      :class="[item.value === state.formModel.id ? 'active' : '']"
                    >
                      <a-radio :value="item.value">{{ item.label }}</a-radio>
                    </li>
                  </a-radio-group>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="15">
            <a-form ref="formRef" :model="state.formModel" class="h-full" hide-required-mark>
              <a-form-item
                name="name"
                :rules="[{ required: true, message: '动作名称不能为空', trigger: ['change', 'blur'] }]"
              >
                <!-- <template #extra>点击 确定 之后将在动作面板中创建一个该名称的新动作 </template> -->
                <a-input v-model:value="state.formModel.name" placeholder="请输入动作名称"></a-input>
              </a-form-item>
              <a-form-item name="params">
                <hex-monaco-editor
                  v-model:value="state.formModel.params"
                  title=""
                  :theme="Theme.DEFAULT"
                  :language="Lang.JSON"
                >
                  <template #title>
                    <a-typography-title :level="5" style="margin: 0">参数设置</a-typography-title>
                  </template>
                </hex-monaco-editor>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </hex-modal>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="EventsEditor">
import { inject, computed, ref, reactive } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set, get } from '/@/utils/schema';
import HexModal from '/@/components/hex-modal/index.vue';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme, Lang } from '/@/components/hex-monaco-editor/useMonacoEditor';

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
const modelValue = computed({
  set(val: string) {
    set(props.attribute, val, schema.value, false);
  },
  get() {
    return get(props.attribute, schema.value, false);
  },
});

const eventsMap = computed(() => {
  const arr = [];
  for (const key in schema.value.events) {
    if (Object.prototype.hasOwnProperty.call(schema.value.events, key)) {
      const element = schema.value.events[key];
      const index = actionOptions.findIndex((item) => {
        return item.value === key;
      });
      if (index !== -1) {
        arr.push({
          ...actionOptions[index],
          data: element,
        });
      }
    }
  }
  return arr;
});

const actionOptions: {
  title: string;
  value: string;
}[] = [
  {
    title: 'onChange 值发生变化',
    value: 'onChange',
  },
  {
    title: 'onFocus 值发生变化',
    value: 'onFocus',
  },
  {
    title: 'onBlur 值发生变化',
    value: 'onBlur',
  },
];
const modalTitle = ref('');
const formRef = ref<FormInstance>();
const state = reactive({
  filterText: null,
  formModel: {
    id: '',
    type: 'PageJS',
    name: '',
    params: '{}',
    uuid: '',
  },
});

const actionIds = computed(() => {
  const pageJsList = [{ label: '添加新动作', value: '' }];
  const builtInActionList = [
    { label: '打开 URL', value: 'openUrl' },
    { label: '打开弹框', value: 'openPopUp' },
    { label: '关闭弹框', value: 'closePopUp' },
  ];
  const arr = state.formModel.type === 'PageJS' ? pageJsList : builtInActionList;
  return arr.filter((item) => {
    return item.label.includes(state.filterText ?? '');
  });
});
const handleTypeChange = () => {
  state.formModel.id = actionIds.value[0].value;
};
const visible = ref(false);
/**
 * 新增动作
 */
function onAddActionClick({ key: item }: { key: { title: string; value: string } }) {
  modalTitle.value = item.title;
  // 规则: 如果组件节点描述-事件中存在该类型: `${类型}${事件长度}`, 否则 `${类型}`
  if (!schema.value.events?.hasOwnProperty(item.value)) {
    state.formModel.name = item.value;
  } else {
    state.formModel.name = item.value + schema.value.events[item.value].events.length;
  }
  state.formModel.id = item.value;
  visible.value = true;
}
/**
 * 编辑动作
 * @param option 类型
 * @param option 动作配置
 */
function onEditActionClick(type: string, option: any) {
  state.formModel = cloneDeep(option);
  visible.value = true;
}
/**
 * 删除动作
 * @param option 类型
 * @param option 动作配置
 */
function onDeleteActionClick(type: string, option: any) {
  console.log(type, option);
  if (schema.value?.events && schema.value?.events.hasOwnProperty(type)) {
    schema.value.events[type].events = schema.value?.events[type].events.filter((item: any) => {
      return item.uuid !== option.uuid;
    });
    if (schema.value.events[type].events.length < 1) {
      delete schema.value.events[type];
    }
  }
}

const handleSubmit = () => {
  if (formRef.value) {
    formRef.value.validate().then(() => {
      if (!state.formModel.uuid) {
        // 规则: 时间戳_事件总数 + 1
        const uuid = `${new Date().getTime()}_${actionIds.value.length + 1}`;
        state.formModel.uuid = uuid;
      }

      // 新增events值为新增events值为undefined
      if (!schema.value.events) {
        schema.value.events = {};
      }
      let flag = false;
      for (const key in schema.value.events) {
        if (Object.prototype.hasOwnProperty.call(schema.value.events, key)) {
          if (flag) break;
          const element: any = schema.value.events[key];
          // 查找当前编辑动作是否存在
          const idx = element.events.findIndex((item: any) => {
            return item.uuid === state.formModel.uuid;
          });

          if (key === state.formModel.id) {
            flag = true;
            if (idx === -1) {
              element.events.push(cloneDeep(state.formModel));
            } else {
              element.events[idx] = cloneDeep(state.formModel);
            }
          }
        }
      }
      if (!flag) {
        const obj: any = {
          type: 'JSExpression',
          value: '',
          events: [],
        };
        obj.events.push(cloneDeep(state.formModel));
        schema.value.events[state.formModel.id] = obj;
      }

      console.log(schema.value.events);
      state.formModel = {
        id: '',
        type: 'PageJS',
        name: '',
        params: '{}',
        uuid: '',
      };
      visible.value = false;
    });
  }
};
</script>

<style lang="less" scoped>
.action-setting-selector-inner {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #bcc3cd;
  border-radius: 4px;

  .action-setting-selector-category {
    flex: 1;
    border-right: 1px solid #bcc3cd;
  }

  .code-actions-items-container {
    flex: 1;
  }

  .action-setting-ul {
    padding: 0.25rem;
    height: 100%;

    .action-setting-li {
      position: relative;
      overflow: hidden;
      margin-bottom: 4px;
      padding: 4px;
      border-bottom: 1px solid #f0f0f0;
      border-radius: 4px;
      color: rgba(0, 0, 0, 0.88);
      background: #ffffff;
      transition: all 0.2s ease 0s;
      cursor: default;

      &:hover {
        border-color: transparent;
        background-color: #fafafa;
      }
    }

    .active {
      position: relative;
      border-color: transparent;
      background-color: #e6f4ff !important;

      &:hover {
        background-color: #bae0ff !important;
      }
    }
  }
}

:deep(.m-e-main_toolbar_left) {
  span {
    padding-left: 0 !important;
  }
}

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 6px;

  cursor: default;
  &:hover {
    border-radius: 4px;
    background-color: #f6f6f8;
  }
}
</style>
