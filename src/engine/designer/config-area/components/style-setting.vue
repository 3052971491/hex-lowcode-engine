<template>
  <div class="w-full h-full">
    <template v-if="scheme">
      <a-popconfirm
        trigger="click"
        placement="bottomLeft"
        :show-cancel="false"
        :destroy-tooltip-on-hide="true"
        :arrow-point-at-center="true"
        @visible-change="visibleChange"
      >
        <template #icon></template>
        <template #okButton></template>
        <template #title>
          <div style="width: 400px">
            <hex-monaco-editor v-model:value="styleContent" title="CSS" :theme="Theme.DEFAULT" :language="Lang.SCSS" />
          </div>
        </template>
        <a-button class="ml-2">源码编辑</a-button>
      </a-popconfirm>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { HexCoreInjectionKey } from '/@lowcode-engine/render/render-inject-key';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme, Lang } from '/@/components/hex-monaco-editor/useMonacoEditor';

const core = inject(HexCoreInjectionKey);
const scheme = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
// scheme.props.__style__

const styleContent = computed({
  set(val: string) {
    scheme.value.props.__style__ = val;
  },
  get() {
    return scheme.value.props.__style__;
  },
});

const visibleChange = (visible: boolean) => {
  if (visible) {
    if (!scheme.value.props.__style__) {
      scheme.value.props.__style__ = ':root {}';
    }
  }
};
</script>

<style lang="less" scoped></style>
