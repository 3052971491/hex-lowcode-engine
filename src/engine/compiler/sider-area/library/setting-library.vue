<template>
  <div class="setting-library">
    <a-skeleton active :loading="loading">
      <a-form>
        <a-form-item v-if="core?.state.projectConfig?.config.i18n" :label="t('el.globalSetting.language')">
          <a-radio-group v-model:value="core.state.projectConfig.config.i18n" @change="core?.saveCurrentHistoryData()">
            <a-radio-button value="zh-CN">中文</a-radio-button>
            <a-radio-button value="en-US">English</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="core?.state.projectConfig?.config.hasOwnProperty('remoteUrl')"
          :label="t('el.globalSetting.remoteAPI')"
        >
          <a-textarea
            v-model:value="core.state.projectConfig.config.remoteUrl"
            :auto-size="{ minRows: 2, maxRows: 5 }"
            @change="core?.saveCurrentHistoryData()"
          ></a-textarea>
        </a-form-item>
        <a-form-item v-if="core?.state.projectConfig?.config.watermark" :label="t('el.globalSetting.watermark')">
          <a-input-group compact>
            <a-input
              v-model:value="core.state.projectConfig.config.watermark.content"
              :placeholder="t('el.placeholder.input')"
              style="width: calc(100% - 32px)"
            ></a-input>
            <a-tooltip :title="t('el.moreSetting')">
              <a-popconfirm placement="right" ok-text="Yes" cancel-text="No" @confirm="handleWatermarkConfigConfirm">
                <template #title> </template>
                <template #icon></template>
                <template #description>
                  <a-form :model="state.watermarkConfig">
                    <a-form-item name="content" :label="t('el.watermarkConfig.content')">
                      <a-input v-model:value="state.watermarkConfig.content"></a-input>
                    </a-form-item>
                    <a-form-item name="fontSize" :label="t('el.watermarkConfig.fontSize')">
                      <a-input-number v-model:value="state.watermarkConfig.fontSize"></a-input-number>
                    </a-form-item>
                    <a-form-item name="zIndex" :label="t('el.watermarkConfig.zIndex')">
                      <a-input-number v-model:value="state.watermarkConfig.zIndex"></a-input-number>
                    </a-form-item>
                    <a-form-item name="rotate" :label="t('el.watermarkConfig.rotate')">
                      <a-input-number v-model:value="state.watermarkConfig.rotate"></a-input-number>
                    </a-form-item>
                    <a-row :gutter="12">
                      <a-col :span="12">
                        <a-form-item name="rotate" :label="t('el.watermarkConfig.rowGutter')">
                          <a-input-number v-model:value="state.watermarkConfig.rowGutter"></a-input-number>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item name="rotate" :label="t('el.watermarkConfig.columnGutter')">
                          <a-input-number v-model:value="state.watermarkConfig.columnGutter"></a-input-number>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </template>

                <a-button @click="handleShowWatermarkConfig">
                  <template #icon><SettingOutlined /></template>
                </a-button>
              </a-popconfirm>
            </a-tooltip>
          </a-input-group>
        </a-form-item>
      </a-form>
    </a-skeleton>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useLocale } from '/@/hooks/use-loacle';
import { SettingOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';

const { t } = useLocale();
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
const core = inject(HexCoreInjectionKey);

const state = reactive<{
  watermarkConfig: any;
}>({
  watermarkConfig: {},
});

const handleShowWatermarkConfig = () => {
  state.watermarkConfig = cloneDeep(core?.state.projectConfig?.config.watermark) || {};
};
const handleWatermarkConfigConfirm = () => {
  if (!core?.state.projectConfig) return;
  core.state.projectConfig.config.watermark = cloneDeep(state.watermarkConfig);
  state.watermarkConfig = {};
  core.saveCurrentHistoryData();
};
</script>
