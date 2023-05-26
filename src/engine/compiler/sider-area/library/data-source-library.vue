<template>
  <div class="data-source-library">
    <a-skeleton active :loading="loading">
      <a-row :gutter="[0, 6]">
        <a-col :span="24">
          <a-space class="w-full">
            <a-select v-model:value="state.type" style="width: 80px">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="VALUE">变量</a-select-option>
              <a-select-option value="REMOTE">远程</a-select-option>
            </a-select>
            <a-input-search
              v-model:value="state.filterText"
              class="w-full"
              placeholder="搜索"
              enter-button
            ></a-input-search>
          </a-space>
        </a-col>
        <a-col :span="24">
          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleAddItemClick">
                <a-menu-item key="VALUE"> 变量 </a-menu-item>
                <a-menu-item key="REMOTE"> 远程 </a-menu-item>
              </a-menu>
            </template>
            <a-button type="primary" style="width: 80px">添加</a-button>
          </a-dropdown>
        </a-col>
      </a-row>
      <div class="w-full mt-3">
        <div v-if="list.length > 0">
          <hex-draggable v-model:value="list" :put="false" :sort="true" :pull="false" ghost-class="">
            <template #item="{ element, index }">
              <div class="listitem w-full">
                <div class="flex-1 flex align-items">
                  <holder-outlined class="hex-draggable-handle move" />
                  <strong
                    :style="{
                      color: element.protocal === 'VALUE' ? '#66bc5c' : '#33a4ff',
                    }"
                    >{{ element.protocal === 'VALUE' ? '变量' : '远程' }}&nbsp;&nbsp;</strong
                  >
                  {{ element.name }}
                </div>
                <div>
                  <form-outlined class="icon mr-1" @click="handleEditItemClick(element, index)" />
                  <delete-outlined class="icon mr-1" @click="handleDeleteItemClick(element, index)" />
                </div>
              </div>
            </template>
          </hex-draggable>
        </div>
        <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" description="暂无"></a-empty>
      </div>
    </a-skeleton>
    <div v-if="state.isShowEngineDataPool" class="engine-data-pool-form-wrap">
      <div class="engine-data-pool-form-wrap-title">
        <div>添加变量</div>
        <a-space>
          <a-button type="primary" @click="onSave">保存</a-button>
          <a-button @click="onCancel">取消</a-button>
        </a-space>
      </div>
      <a-divider />
      <div class="engine-data-pool-form-wrap-content">
        <a-form
          ref="formRef"
          :model="createOrUpdateState.info"
          :label-col="{
            style: {
              width: '100px',
            },
          }"
          label-align="left"
        >
          <a-form-item label="名称" name="name" :rules="[{ required: true, message: '该字段不能为空' }]">
            <a-input v-model:value="createOrUpdateState.info.name"></a-input>
          </a-form-item>
          <a-form-item label="描述">
            <a-input v-model:value="createOrUpdateState.info.description" />
          </a-form-item>
          <template v-if="createOrUpdateState.category === 'VALUE'">
            <a-form-item>
              <hex-monaco-editor v-model:value="initialData" title="" :theme="Theme.DEFAULT" :language="Lang.JSON">
                <template #title>
                  <a-typography-title :level="5" style="margin: 0">数据</a-typography-title>
                </template>
              </hex-monaco-editor>
            </a-form-item>
          </template>
          <template v-else>
            <a-form-item label="自动加载">
              <a-switch v-model:checked="createOrUpdateState.info.isInit" />
            </a-form-item>
            <a-form-item label="加载方式">
              <a-radio-group v-model:value="createOrUpdateState.info.isSync">
                <a-radio-button :value="true">串行</a-radio-button>
                <a-radio-button :value="false">并行</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <template v-if="createOrUpdateState.info.options">
              <a-form-item label="请求地址">
                <a-textarea v-model:value="createOrUpdateState.info.options.uri" />
              </a-form-item>
              <a-form-item label="请求方法">
                <a-radio-group v-model:value="createOrUpdateState.info.options.method">
                  <a-radio-button value="GET">GET</a-radio-button>
                  <a-radio-button value="POST">POST</a-radio-button>
                  <a-radio-button value="PUT">PUT</a-radio-button>
                  <a-radio-button value="DELETE">DELETE</a-radio-button>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="请求参数">
                <a-button type="primary" block>添加一项</a-button>
              </a-form-item>
            </template>
            <a-form-item label="是否发送请求">
              <a-switch v-model:checked="createOrUpdateState.info.shouldFetch" />
            </a-form-item>
          </template>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, reactive, ref } from 'vue';
import { Empty, FormInstance } from 'ant-design-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
import { RuntimeDataSource, RuntimeDataSourceConfig } from '/@/types/data-source/data-source-runtime';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme, Lang } from '/@/components/hex-monaco-editor/useMonacoEditor';
import { cloneDeep } from 'lodash-es';
import { buildUUID } from '/@/utils/common';
import { RadioGroupChildOption } from 'ant-design-vue/lib/radio/Group';
import { HolderOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';

const core = inject(HexCoreInjectionKey);
const state = reactive<{
  filterText: string;
  isShowEngineDataPool: boolean;
  type: string;
  dataSource: RuntimeDataSource;
}>({
  filterText: '',
  isShowEngineDataPool: false,
  type: '',
  dataSource: {
    list: [],
    dataHandler: undefined,
  },
});
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});

const formRef = ref<FormInstance>();
const createOrUpdateState = reactive<{
  /**
   * 类别
   * VALUE 变量
   * REMOTE 远程
   */
  category: string | number;
  info: Partial<RuntimeDataSourceConfig>;
}>({
  category: '',
  info: {
    id: '',
    options: {
      uri: '',
    },
    initialData: '',
  },
});

const initialData = computed({
  set(val: string) {
    try {
      createOrUpdateState.info.initialData = JSON.parse(val);
    } catch (error) {
      //
    }
  },
  get() {
    return JSON.stringify(createOrUpdateState.info.initialData);
  },
});

const list = computed(() => {
  let arr = state.dataSource.list;
  if (state.type) {
    arr = arr.filter((item) => item.protocal === state.type);
  }
  if (state.filterText) {
    arr = arr.filter((item) => item.name.includes(state.filterText));
  }
  return arr;
});
/** 新增 */
const handleAddItemClick = (item: MenuInfo) => {
  createOrUpdateState.category = item.key;
  state.isShowEngineDataPool = true;
};
/** 编辑 */
const handleEditItemClick = (options: RadioGroupChildOption, index: number) => {
  // 赋值
  // 打开编辑框
};
/** 删除 */
const handleDeleteItemClick = (options: RadioGroupChildOption, index: number) => {
  state.dataSource.list.splice(index, 1);
};
/** 取消 */
const onCancel = () => {
  // 1、表单重置
  // 2、关闭
  state.isShowEngineDataPool = false;
};
/** 保存 */
const onSave = () => {
  // 1、表单校验
  formRef.value?.validate().then((res) => {
    // 2、赋值
    if (!createOrUpdateState.info.id) {
      createOrUpdateState.info.id = buildUUID(16);
    }
    createOrUpdateState.info.protocal = createOrUpdateState.category;
    state.dataSource.list.push(cloneDeep(createOrUpdateState.info) as RuntimeDataSourceConfig);
    // 3、表单重置
    formRef.value?.resetFields();
    // 4、关闭
    state.isShowEngineDataPool = false;
  });
};
</script>

<style lang="less" scoped>
.ant-divider-horizontal {
  margin: 12px 0;
}
.engine-data-pool-form-wrap {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 364px;
  z-index: 999;
  display: flex;
  overflow: hidden;
  width: 400px;
  border-right: 1px solid rgba(31, 56, 88, 0.1);
  border-left: 1px solid rgba(31, 56, 88, 0.1);
  background-color: #fff;
  flex-direction: column;

  &-title {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    padding-bottom: 0;
    font-size: 18px;
    line-height: 37px;
  }

  &-content {
    flex: 1;
    overflow: auto;
    padding: 0.5rem;

    .field-head {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      padding: 4px 10px;
      border-top: 1px solid rgba(31, 56, 88, 0.1);
      border-bottom: 1px solid rgba(31, 56, 88, 0.1);
      background: rgba(31, 56, 88, 0.04);
    }
  }
}

.listitem {
  position: relative;
  display: flex;
  align-items: stretch;
  margin-bottom: 8px;
  padding: 4px 0;
  border: 1px solid rgba(31, 56, 88, 0.2);
  border-radius: 3px;
  color: #00000073;
  background: #fff;
  outline: none;

  &:hover {
    background: transparent;
  }

  .move {
    margin-right: 6px;
    margin-left: 3px;
    cursor: move;
  }

  .icon {
    cursor: pointer;
  }
  .hex-draggable-handle {
    display: flex;
    align-items: center;
  }
}
</style>
