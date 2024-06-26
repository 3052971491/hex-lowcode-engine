<template>
  <a-form-item :name="props.name" :colon="false" class="lc-field">
    <template #label>
      <a-tooltip v-if="tooltip" placement="top">
        <template #title>
          <span>{{ tips }}</span>
        </template>
        {{ props.label }}
      </a-tooltip>
      <span v-else>{{ props.label }}</span>
    </template>
    <div class="flex items-center" style="color: #8f9bb3">
      <slot></slot>

      <a-popconfirm
        placement="bottomRight"
        :show-cancel="false"
        :destroy-tooltip-on-hide="true"
        :arrow-point-at-center="true"
      >
        <template #icon></template>
        <template #okButton></template>
        <template #title>
          <div @blur="i18nPopconfirm = !i18nPopconfirm">
            <div v-if="!I18nStatus" class="i18n-search-results">
              <a-input v-model:value="filterText" :placeholder="t('el.searchForDefinedText')"></a-input>
              <a-button type="primary" block class="mt-2" @click="handleCreateI18nClick">
                {{ t('el.createNewMultilingualCopy') }}
              </a-button>
              <div
                v-for="(item, index) in i18nSearchResultList"
                :key="index"
                class="i18n-search-result-item"
                @click="handleSelectI18nClick(item)"
              >
                <div class="i18n-lang-item">
                  <div class="i18n-item-lang-type">English</div>
                  <div class="i18n-item-lang-content">{{ item['en-US'] }}</div>
                </div>
                <div class="i18n-lang-item">
                  <div class="i18n-item-lang-type">中文</div>
                  <div class="i18n-item-lang-content">{{ item['zh-CN'] }}</div>
                </div>
              </div>
            </div>
            <div v-else class="i18n-edit">
              <div class="i18n-delete-control">
                <span @click="handleDeleteControlClick">{{ t('el.removeCopywritingLink') }}</span>
              </div>
              <div class="i18n-search-result-item">
                <div class="i18n-lang-item">
                  <div class="i18n-item-lang-type">English</div>
                  <div class="i18n-item-lang-content">
                    <a-input v-model:value="updateI18nByEn"></a-input>
                  </div>
                </div>
                <div class="i18n-lang-item">
                  <div class="i18n-item-lang-type">中文</div>
                  <div class="i18n-item-lang-content">
                    <a-input v-model:value="updateI18nByZh"></a-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <GlobalOutlined
          v-if="option.i18n"
          class="ml-1 cursor-pointer"
          :style="{
            color: I18nStatus ? '#1890ff' : '#8f9bb3',
          }"
          @click="i18nPopconfirm = !i18nPopconfirm"
        ></GlobalOutlined>
      </a-popconfirm>

      <font-colors-outlined v-if="false" class="ml-1 cursor-pointer"></font-colors-outlined>
    </div>
  </a-form-item>
</template>
<script lang="ts" setup name="FormItemWrapper">
import { computed, inject, ref, watch } from 'vue';
import { GlobalOutlined, FontColorsOutlined } from '@ant-design/icons-vue';
import { isNil } from 'lodash-es';
import { AttributeItem } from '../attribute-editor/interface';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { formatConversion, fuzzyQuery } from '/@/utils/i18n';
import { set, get } from '/@/utils/schema';
import { buildUUID } from '/@/utils/common';
import type { i18n } from '/@/types/i18n';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
interface Props {
  /** 标题 */
  label: string;
  /** 属性名 */
  name: string;
  /** 属性配置 */
  option: AttributeItem;
  /** 是否开启tooltip提示 */
  tooltip?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  name: '',
  tooltip: true,
});

const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});

const tips = computed(() => {
  return `${t('el.common.property')}: ${props.name}`;
});

const i18nPopconfirm = ref(false);

const I18nStatus = computed(() => {
  if (!schema.value.props || isNil(schema.value.props[props.name])) {
    return false;
  }
  return Object.prototype.toString.call(schema.value.props[props.name]) !== '[object String]';
});

/** 多语言文案 */
const filterText = ref('');

const i18nSearchResultList = ref<i18n[]>([]);

if (core?.state?.projectConfig?.i18n) {
  watch(
    core.state.projectConfig,
    () => {
      i18nSearchResultList.value = fuzzyQuery(
        formatConversion(core?.state.projectConfig?.i18n as any) as any,
        filterText.value,
      );
    },
    {
      deep: true,
    },
  );
}

watch(
  filterText,
  (val) => {
    if (core?.state.projectConfig?.i18n) {
      i18nSearchResultList.value = fuzzyQuery(formatConversion(core?.state.projectConfig?.i18n) as any, val);
    } else {
      i18nSearchResultList.value = [];
    }
  },
  {
    immediate: true,
  },
);

/** 创建新的多语言文案 */
const handleCreateI18nClick = () => {
  const id = `i18n-${buildUUID()}`;
  set(
    props.name,
    {
      type: 'i18n',
      key: id,
      'zh-CN': '',
      'en-US': '',
    },
    schema.value,
    core?.state.projectConfig,
  );
  if (core?.state.projectConfig?.i18n) {
    core.state.projectConfig.i18n['zh-CN'][id] = '';
    core.state.projectConfig.i18n['en-US'][id] = '';
  }
};
const updateI18nByEn = computed({
  set(val: string) {
    const obj = get(props.name, schema.value);
    obj['en-US'] = val;
    if (core?.state.projectConfig?.i18n) {
      core.state.projectConfig.i18n['en-US'][obj.key] = val;
    }
  },
  get() {
    return get(props.name, schema.value)['en-US'];
  },
});
const updateI18nByZh = computed({
  set(val: string) {
    const obj = get(props.name, schema.value);
    obj['zh-CN'] = val;
    if (core?.state.projectConfig?.i18n) {
      core.state.projectConfig.i18n['zh-CN'][obj.key] = val;
    }
  },
  get() {
    return get(props.name, schema.value)['zh-CN'];
  },
});

/** 解除文案关联 */
const handleDeleteControlClick = () => {
  filterText.value = '';
  if (schema.value?.props) {
    schema.value.props[props.name] = '';
  }
  i18nPopconfirm.value = false;
};

/** 选择多语言文案 */
const handleSelectI18nClick = (item: any) => {
  filterText.value = '';
  set(
    props.name,
    {
      type: 'i18n',
      key: item.id,
      'zh-CN': item['zh-CN'],
      'en-US': item['en-US'],
    },
    schema.value,
    core?.state.projectConfig,
  );
};
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  // text-align: right;
}
.lc-field {
  margin-bottom: 0;
  padding: 0.5rem;
}

.i18n-search-results {
  overflow: auto;
  margin-top: 0.5rem;
  width: 300px;
  max-height: 200px;
  font-size: 12px;

  .i18n-search-result-item {
    padding: 6px 0;
    cursor: pointer;

    .i18n-lang-item {
      display: flex;
      align-items: center;
      padding: 5px;
      font-size: 12px;
      line-height: 15px;

      .i18n-item-lang-type {
        overflow: hidden;
        margin-right: 10px;
        width: 40px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .i18n-item-lang-content {
        flex: 1;
      }
    }
  }
}
.i18n-edit {
  overflow: auto;
  width: 300px;
  max-height: 200px;
  font-size: 12px;

  .i18n-delete-control {
    display: flex;
    flex-direction: row-reverse;

    span {
      cursor: pointer;
      color: rgba(0, 0, 0, 0.6);

      &:hover {
        color: #000;
      }
    }
  }

  .i18n-search-result-item {
    .i18n-lang-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 12px;
      line-height: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .i18n-item-lang-type {
        overflow: hidden;
        margin-right: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .i18n-item-lang-content {
        flex: 1;
      }
    }
  }
}
</style>
