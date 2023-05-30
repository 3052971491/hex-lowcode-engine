<template>
  <div class="setting-library">
    <a-form>
      <a-form-item v-if="core?.state.projectConfig?.config.i18n" label="语言">
        <a-radio-group v-model:value="core.state.projectConfig.config.i18n">
          <a-radio-button value="zh-CN">中文</a-radio-button>
          <a-radio-button value="en-US">English</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="core?.state.projectConfig?.config.remoteUrl" label="远程 API">
        <a-textarea
          v-model:value="core.state.projectConfig.config.remoteUrl"
          :auto-size="{ minRows: 2, maxRows: 5 }"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';

const core = inject(HexCoreInjectionKey);
</script>
