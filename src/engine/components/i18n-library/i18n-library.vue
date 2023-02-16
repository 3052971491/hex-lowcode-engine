<template>
  <div class="i18n-library">
    <div class="mb-2">
      <a-input-search v-model:value="filterText" placeholder="搜索文案" enter-button @search="onSearch" />
    </div>
    <div class="mb-4">
      <a-button @click="handleAdd">新增文案</a-button>
    </div>
    <div>
      <a-table bordered :data-source="dataSource" :columns="columns" size="small" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="['zh-CN', 'en-US'].includes(column.dataIndex)">
            <a-input
              v-model:value="record[column.dataIndex]"
              class="i18n-input"
              :bordered="false"
              :maxlength="666"
              @change="save"
            />
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <a-tooltip placement="top">
              <template #title>
                <span>唯一标识: {{ record.id }} (点击赋值)</span>
              </template>
              <a-typography-paragraph :copyable="{ tooltip: false, text: record.id }" class="flex items-center mb-0" />
            </a-tooltip>
            <a-popconfirm
              v-if="dataSource.length"
              title="此操作不可恢复, 确认删除此条多国语言文案吗?"
              cancel-text="取消"
              ok-text="确认"
              @confirm="onDelete(record.id)"
            >
              <a-typography-text type="danger" class="cursor-pointer">
                <delete-outlined style="padding: 0px 6px" />
              </a-typography-text>
            </a-popconfirm>
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          <a-descriptions title="详细信息" :column="1">
            <a-descriptions-item label="唯一标识">{{ record.id }}</a-descriptions-item>
            <a-descriptions-item label="简体中文">
              <a-textarea
                v-model:value="record['zh-CN']"
                class="i18n-input"
                :maxlength="666"
                :rows="2"
                @change="save"
              />
            </a-descriptions-item>
            <a-descriptions-item label="English">
              <a-textarea
                v-model:value="record['en-US']"
                class="i18n-input"
                :maxlength="666"
                :rows="2"
                @change="save"
              />
            </a-descriptions-item>
          </a-descriptions>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { I18nMap } from '/@/types/i18n';
import { inject, onMounted, Ref, ref } from 'vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { buildUUID } from '/@lowcode-engine/utils/common';
import { HexCoreInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import { formatConversion } from '/@lowcode-engine/utils/i18n';

const core = inject(HexCoreInjectionKey);
interface i18n {
  id: string;
  'en-US': string;
  'zh-CN': string;
}
/** 搜索条件 */
const filterText = ref('');
const dataSource: Ref<i18n[]> = ref([]);

/**
 * 使用indexOf方法实现模糊查询
 * @param  {Array<DataItem>} list 进行查询的数组
 * @param  {String} keyWord 查询的关键词
 * @return {Array<DataItem>} 查询的结果
 */
function fuzzyQuery(list: i18n[], keyWord: string): Array<i18n> {
  let arr: i18n[] = [];
  arr = list.filter((i) => {
    if (i['zh-CN'].indexOf(keyWord) > -1) {
      return i['zh-CN'].indexOf(keyWord) > -1;
    }
    if (i['en-US'].indexOf(keyWord) > -1) {
      return i['en-US'].indexOf(keyWord) > -1;
    }
    return i.id.indexOf(keyWord) > -1;
  });
  return arr;
}

const onSearch = (val: string) => {
  if (!val) {
    dataSource.value = formatConversion(core?.state.projectConfig?.i18n ?? []) as any;
  } else {
    dataSource.value = fuzzyQuery(formatConversion(core?.state.projectConfig?.i18n ?? []) as any, val);
  }
};

const columns = [
  {
    title: '简体中文',
    dataIndex: 'zh-CN',
  },
  {
    title: 'English',
    dataIndex: 'en-US',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '80px',
    align: 'center',
  },
];

onMounted(() => {
  dataSource.value = formatConversion(core?.state.projectConfig?.i18n ?? []) as any;
});

const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter((item) => item.id !== key);
  save();
};
const handleAdd = () => {
  const newData = {
    id: `i18n-${buildUUID()}`,
    'zh-CN': '',
    'en-US': '',
  };
  dataSource.value.push(newData);
  save();
};

/** 将数据同步至应用配置 */
const save = () => {
  if (core?.state.projectConfig?.i18n) {
    core.state.projectConfig.i18n = formatConversion(dataSource.value, false) as any;
  }
  core?.saveHistoryDataStorage();
};
</script>

<style lang="less" scoped>
.i18n-input {
  padding: 0;
}
.ant-typography {
  display: inline-block;
  margin-bottom: 0;
}
</style>
