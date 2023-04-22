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
      <div class="w-full overflow-hidden flex flex-col">
        <a-row>
          <a-col :span="9">
            <a-typography-title :level="5">响应动作</a-typography-title>
          </a-col>
          <a-col :span="15">
            <a-typography-title v-if="!state.actionName" :level="5">动作名称</a-typography-title>
          </a-col>
        </a-row>
        <a-form ref="formRef" :model="state.formModel" class="flex-1" hide-required-mark>
          <a-row class="flex-1" :gutter="8">
            <a-col :span="9">
              <div class="action-setting-selector-inner">
                <div class="action-setting-selector-category">
                  <div class="action-setting-ul">
                    <a-form-item name="type" :rules="[{ required: true, message: '', trigger: ['change', 'blur'] }]">
                      <a-radio-group v-model:value="state.actionType" class="w-full" @change="initActionMap">
                        <li class="action-setting-li" :class="['BuiltInAction' === state.actionType ? 'active' : '']">
                          <a-radio value="BuiltInAction">内置动作</a-radio>
                        </li>
                        <li class="action-setting-li" :class="['PageJS' === state.actionType ? 'active' : '']">
                          <a-radio value="PageJS">页面 JS</a-radio>
                        </li>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </div>
                <div class="code-actions-items-container">
                  <div class="action-setting-ul">
                    <div class="mb-1">
                      <a-input v-model:value="state.filterText" placeholder="搜索" allow-clear></a-input>
                    </div>
                    <a-form-item name="id">
                      <a-radio-group v-model:value="state.actionName" class="w-full" @change="handleActionNameChange">
                        <li
                          v-for="(item, index) in actionIds"
                          :key="index"
                          class="action-setting-li"
                          :class="[item.value === state.actionName ? 'active' : '']"
                        >
                          <a-radio :value="item.value">{{ item.label }}</a-radio>
                        </li>
                      </a-radio-group>
                    </a-form-item>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="15">
              <a-form-item
                v-if="!state.actionName"
                name="name"
                :rules="[{ required: true, message: '动作名称不能为空', trigger: ['change', 'blur'] }]"
              >
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
            </a-col>
          </a-row>
        </a-form>
      </div>
    </hex-modal>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="EventsEditor">
import { inject, computed, ref, reactive, unref } from 'vue';
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
import { StringParsedToFunction } from '/@/utils/func';

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

let actionOptions: {
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

if (unref(schema).componentType === 'Collapse' || unref(schema).componentType === 'Tabs') {
  actionOptions = [
    {
      title: 'onChange 值发生变化',
      value: 'onChange',
    },
  ];
}

if (unref(schema).componentType === 'Button') {
  actionOptions = [
    {
      title: 'onClick 值发生变化',
      value: 'onClick',
    },
  ];
}

const modalTitle = ref('');
const formRef = ref<FormInstance>();
const state = reactive({
  isAdd: true,
  actionType: 'PageJS',
  actionName: '',
  filterText: null,
  formModel: {
    id: '',
    type: 'PageJS',
    name: '',
    params: '{}',
    uuid: '',
  },
  actionMap: [] as any[],
});

const visible = ref(false);

const initActionMap = () => {
  state.actionMap = [];
  // 获取自定义JS集
  if (state.actionType === 'PageJS') {
    state.actionMap.push({ label: '添加新动作', value: '' });
    for (const key in core?.state.projectConfig?.methods) {
      if (Object.prototype.hasOwnProperty.call(core?.state.projectConfig?.methods, key)) {
        state.actionMap.push({
          label: key,
          value: key,
        });
      }
    }
  } else {
    state.actionMap = [
      { label: '打开 URL', value: 'openUrl' },
      { label: '打开弹框', value: 'openPopUp' },
      { label: '关闭弹框', value: 'closePopUp' },
    ];
  }
};
const actionIds = computed(() => {
  return state.actionMap.filter((item) => {
    return item.label.includes(state.filterText ?? '');
  });
});

function handleActionNameChange() {
  if (state.actionName === '') {
    const arr = unref(actionIds).filter((i) => {
      return i.value.includes(state.formModel.id);
    });
    state.formModel.name =
      arr.length > 0 ? `${state.formModel.id + (arr.length + 1)}_new` : `${state.formModel.id}_new`;
  } else {
    state.formModel.name = state.actionName;
  }
}

/**
 * 新增动作
 */
function onAddActionClick({ key: item }: { key: { title: string; value: string } }) {
  visible.value = true;
  modalTitle.value = item.title;
  state.formModel.id = item.value;
  state.actionName = '';
  initActionMap();
  const arr = unref(actionIds).filter((i) => {
    return i.value.includes(item.value);
  });
  state.formModel.name = arr.length > 0 ? `${item.value + (arr.length + 1)}_new` : `${item.value}_new`;
}
/**
 * 编辑动作
 * @param option 类型
 * @param option 动作配置
 */
function onEditActionClick(type: string, option: any) {
  visible.value = true;
  state.actionName = option.name;
  state.formModel = cloneDeep(option);
  initActionMap();
}
/**
 * 删除动作
 * @param option 类型
 * @param option 动作配置
 */
function onDeleteActionClick(type: string, option: any) {
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
          value: state.formModel.id,
          events: [],
        };
        obj.events.push(cloneDeep(state.formModel));
        schema.value.events[state.formModel.id] = obj;
      }

      if (core?.state.projectConfig?.originCode) {
        core.state.projectConfig.originCode += `\nexport function ${state.formModel.name}() {}`;
        const val = core?.state.projectConfig?.originCode ?? '';
        const obj = StringParsedToFunction(val, null);
        core.state.projectConfig.methods = obj;
        core?.saveHistoryDataStorage();
      }

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
