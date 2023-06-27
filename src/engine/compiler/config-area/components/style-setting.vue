<template>
  <div class="w-full h-full">
    <template v-if="schema">
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
        <a-button class="ml-2 mt-2">{{ t('el.sourceCodeEdit') }}</a-button>
      </a-popconfirm>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme, Lang } from '/@/components/hex-monaco-editor/useMonacoEditor';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
// schema.props.__style__

const styleContent = computed({
  set(val: string) {
    if (schema.value.props) {
      schema.value.props.__style__ = val;
    }
  },
  get() {
    return schema.value.props?.__style__ ?? '';
  },
});

const visibleChange = (visible: boolean) => {
  if (visible) {
    if (schema.value.props && !schema.value.props?.__style__) {
      schema.value.props.__style__ = ':root {}' ?? '';
    }
  } else {
    core?.saveCurrentHistoryData();
  }
};
</script>

<style lang="less" scoped></style>
