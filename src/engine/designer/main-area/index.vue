<template>
  <div class="main-area h-full flex-1 p-2 overflow-auto">
    <render v-model:value="state.config" :redact-state="true"></render>
  </div>
</template>
<script lang="ts" setup>
import Render from '/@/engine/render/render.vue';
import { HexCoreInjectionKey } from '/@/engine/render/render-inject-key';
import { inject, reactive } from 'vue';

const core = inject(HexCoreInjectionKey);
const state = reactive({
  config: undefined,
});
if (!core) {
  state.config = undefined;
} else {
  state.config = core.state.projectConfig as any;
}
</script>
<style lang="less" scoped>
.main-area {
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
}
</style>
