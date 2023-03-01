<template>
  <div class="w-full h-full">
    <a-form
      v-if="schema"
      layout="horizontal"
      label-align="left"
      :label-wrap="true"
      :label-col="{
        style: { width: '70px' },
      }"
    >
      <form-Item-wrapper label="是否渲染" name="condition" :option="{}">
        <a-switch v-model:checked="schema.condition"></a-switch>
      </form-Item-wrapper>
      <collapse-Item-wrapper label="循环" name="" :option="{}">
        <form-Item-wrapper label="循环数据" name="loop" :option="{}">
          <a-button type="primary" block>编辑数据</a-button>
        </form-Item-wrapper>
        <form-Item-wrapper label="迭代变量名" name="loopArgs.0" :option="{}">
          <a-input v-model:value="iterationName" placeholder="默认为: item"></a-input>
        </form-Item-wrapper>
        <form-Item-wrapper label="索引变量名" name="loopArgs.1" :option="{}">
          <a-input v-model:value="indexName" placeholder="默认为: index"></a-input>
        </form-Item-wrapper>
      </collapse-Item-wrapper>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { HexCoreInjectionKey } from '/@/engine/render/render-inject-key';
import FormItemWrapper from './form-item-wrapper.vue';
import CollapseItemWrapper from './collapse-item-wrapper.vue';

const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});

/** 迭代变量名 */
const iterationName = computed({
  set(val: string) {
    if (!schema.value) return;
    if (!schema.value?.loopArgs) {
      schema.value.loopArgs = [];
    }
    schema.value.loopArgs[0] = val;
  },
  get() {
    if (schema.value && schema.value?.loopArgs) {
      return schema.value?.loopArgs[0] ?? '';
    }
    return '';
  },
});
/** 索引变量名 */
const indexName = computed({
  set(val: string) {
    if (!schema.value) return;
    if (!schema.value?.loopArgs) {
      schema.value.loopArgs = [''];
    }
    schema.value.loopArgs[1] = val;
  },
  get() {
    if (schema.value && schema.value?.loopArgs) {
      return schema.value?.loopArgs[1] ?? '';
    }
    return '';
  },
});
</script>

<style lang="less" scoped></style>
