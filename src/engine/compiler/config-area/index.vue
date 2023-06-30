<template>
  <div class="config-area">
    <a-tabs v-model:activeKey="activeKey" :centered="true">
      <a-tab-pane key="1" :tab="t('el.common.property')">
        <setting-pane>
          <attribute-setting />
        </setting-pane>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="t('el.common.style')">
        <setting-pane>
          <style-setting />
        </setting-pane>
      </a-tab-pane>
      <a-tab-pane key="3" :tab="t('el.common.advanced')">
        <setting-pane>
          <advanced-setting />
        </setting-pane>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup name="setting-area">
import { computed, inject, ref, watch } from 'vue';
import SettingPane from './components/setting-pane.vue';
import AttributeSetting from './components/attribute-setting.vue';
import StyleSetting from './components/style-setting.vue';
import AdvancedSetting from './components/advanced-setting.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const core = inject(HexCoreInjectionKey);
const activeKey = ref('1');

const selected = ref<string>('');
const currentId = computed(() => {
  return core?.state.selectedData?.selectedId ?? '';
});
watch(currentId, (val) => {
  if (val !== selected.value) {
    activeKey.value = '1';
    selected.value = val ?? '';
  }
});
</script>

<style lang="less" scoped>
.ant-tabs {
  height: 100%;

  :deep(.ant-tabs-content) {
    height: 100%;
    .ant-tabs-tabpane {
      overflow: auto;
      // padding: 0.5rem;
    }
  }
  :deep(.ant-tabs-nav) {
    margin: 0 0 6px 0;

    .ant-tabs-nav-wrap {
      padding: 0 0.5rem;
    }
  }
}

.config-area {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>
