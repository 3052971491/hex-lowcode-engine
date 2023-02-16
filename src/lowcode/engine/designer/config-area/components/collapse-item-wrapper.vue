<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" expand-icon-position="right">
    <a-collapse-panel key="1" :header="label">
      <slot></slot>
    </a-collapse-panel>
  </a-collapse>
</template>
<script lang="ts" setup name="CollapseItemWrapper">
import { ref } from 'vue';
import { AttributeItem } from '../attribute-editor/interface';

interface Props {
  /** 标题 */
  label: string;
  /** 属性名 */
  name?: string;
  /** 属性配置 */
  option: AttributeItem;
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  name: '',
});

const activeKey = ref(['1']);
</script>

<style lang="less" scoped>
:deep(.ant-collapse-header),
:deep(.ant-collapse-content-box) {
  padding: 0.5rem !important;
}

:deep(.lc-field) {
  padding: 0.5rem 0;
}
</style>
