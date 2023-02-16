<template>
  <a-config-provider>
    <a-layout class="hex-editor w-full h-full">
      <sider-area></sider-area>
      <a-layout>
        <a-layout-content class="m-2 flex flex-col">
          <toolbar-area class="mb-2"></toolbar-area>
          <main-area></main-area>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="332" theme="light">
        <config-area></config-area>
      </a-layout-sider>
    </a-layout>
  </a-config-provider>
</template>
<script lang="ts" setup>
import { defineComponent, provide } from 'vue';
import SiderArea from './sider-area/index.vue';
import MainArea from './main-area/index.vue';
import ToolbarArea from './toolbar-area/index.vue';
import ConfigArea from './config-area/index.vue';
import { useHexCore } from '../render/central/useHexCore';
import { HexCoreInjectionKey } from '../render/render-inject-key';

const core = useHexCore();
provide(HexCoreInjectionKey, core);

core.buildProjectConfig();
core.buildHistory();
core.buildSelectedData();

core.loadHistoryDataStorage();
</script>
<script lang="ts">
export default defineComponent({
  name: 'HexFormEditor',
});
</script>

<style lang="less">
@import '/@/styles/hex-form-editor.less';
</style>
