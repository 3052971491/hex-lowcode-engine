<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" expand-icon-position="right">
    <a-collapse-panel key="1" :header="label" :show-arrow="props.showArrow" :collapsible="props.collapsible">
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
  option?: AttributeItem;
  /** 是否展示当前面板上的箭头 */
  showArrow?: boolean;
  /** 是否可折叠或指定可折叠触发区域 */
  collapsible?: 'disabled' | 'header' | '';
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  name: '',
  option: undefined,
  showArrow: true,
  collapsible: '',
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
:deep(.ant-collapse-content) {
  background-color: #fff !important;
}
:deep(.ant-collapse-item-disabled) {
  > .ant-collapse-header {
    > .arrow {
      color: rgba(0, 0, 0, 0.88);
      cursor: default;
    }
  }
}
</style>
