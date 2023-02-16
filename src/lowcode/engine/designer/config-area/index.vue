<template>
  <div class="w-full h-full flex flex-col overflow-hidden">
    <a-tabs v-model:activeKey="activeKey" :centered="true">
      <a-tab-pane key="1" tab="属性">
        <setting-pane>
          <attribute-setting />
        </setting-pane>
      </a-tab-pane>
      <a-tab-pane key="2" tab="样式">
        <setting-pane>
          <style-setting />
        </setting-pane>
      </a-tab-pane>
      <a-tab-pane key="3" tab="高级">
        <setting-pane>
          <advanced-setting />
        </setting-pane>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup name="setting-area">
import { ref } from 'vue';
import SettingPane from './components/setting-pane.vue';
import AttributeSetting from './components/attribute-setting.vue';
import StyleSetting from './components/style-setting.vue';
import AdvancedSetting from './components/advanced-setting.vue';

const activeKey = ref('1');
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
</style>
