<template>
  <collapse-Item-wrapper :label="props.label" :name="props.attribute" :option="option">
    <div class="validation overflow-hidden">
      <div v-for="(item, index) in modelValue" :key="index" class="validation-rule-item">
        <span class="rule-item-body">{{ item.label }}</span>
        <div class="rule-item-actions">
          <a-tooltip placement="top" :destroy-tooltip-on-hide="true">
            <template #title>
              <span>编辑</span>
            </template>
            <a-popconfirm
              placement="leftBottom"
              :show-cancel="false"
              :destroy-tooltip-on-hide="true"
              :arrow-point-at-center="true"
            >
              <template #icon></template>
              <template #okButton></template>
              <template #title>
                <a-form>
                  <a-form-item label="启用">
                    <a-switch v-model:checked="item.enable" />
                  </a-form-item>
                  <a-form-item v-if="item.type === 'custom'">
                    <div v-if="item.type === 'custom'" style="width: 400px; height: 300px">
                      <hex-monaco-editor v-model:value="item.value" :title="item.label" :theme="Theme.DEFAULT" />
                    </div>
                  </a-form-item>
                  <template v-else-if="item.type === 'required'"></template>
                  <a-form-item v-else :label="item.label">
                    <a-input-number v-model:value="item.value" style="width: 200px"></a-input-number>
                  </a-form-item>
                  <a-form-item label="错误提示" style="margin-bottom: 0">
                    <a-input v-model:value="item.message"></a-input>
                  </a-form-item>
                </a-form>
              </template>
              <form-outlined />
            </a-popconfirm>
          </a-tooltip>
          <a-tooltip placement="top" :destroy-tooltip-on-hide="true">
            <template #title>
              <span>{{ item.enable ? '停用' : '启用' }}</span>
            </template>
            <span class="ml-1">
              <a-checkbox v-model:checked="item.enable"></a-checkbox>
            </span>
          </a-tooltip>
        </div>
      </div>
    </div>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="RulesEditor">
import type { LowCode } from '/@/types/schema.d';
import { inject, computed } from 'vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { FormOutlined } from '@ant-design/icons-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { set, get } from '/@/utils/schema';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme } from '/@/components/hex-monaco-editor/useMonacoEditor';
import { AttributeItem } from '../../attribute-editor/interface';

interface Props {
  label: string;
  attribute: string;
  option: AttributeItem;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  attribute: '',
});

const core = inject(HexCoreInjectionKey);
const schema = computed(() => {
  return core?.state.selectedData?.selectedScheme!;
});
const modelValue = computed<LowCode.RuleMap>({
  set(val) {
    set(props.attribute, val, schema.value, core?.state.projectConfig);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});
</script>
<!-- <style lang="less">
.ant-popover-message {
  padding: 0;

  .ant-popover-message-title {
    padding-left: 0;
  }
}
</style> -->
<style lang="less" scoped>
.validation {
  .validation-rule-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;

    .rule-item-body {
      flex: 1;
    }
    .rule-item-actions {
    }
  }
}

.ant-form-item {
  margin-bottom: 8px;
}
</style>
