<template>
  <a-spin :spinning="loading">
    <a-alert banner type="warning" show-icon class="m-2">
      <template #message>
        已选择
        <span>{{ currentSelectNumber }}</span>
        项 : 按住Ctrl选中单元格
      </template>
    </a-alert>

    <collapse-Item-wrapper :label="collapseTitle('add')" :name="props.attribute" :option="option">
      <a-row :gutter="[12, 12]">
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.InsertLeft)"
            @click="onGridOperateCallback(OperateType.InsertLeft)"
            >插入左侧列</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.InsertRight)"
            @click="onGridOperateCallback(OperateType.InsertRight)"
            >插入右侧列</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.InsertTop)"
            @click="onGridOperateCallback(OperateType.InsertTop)"
            >插入上方行</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.InsertBottom)"
            @click="onGridOperateCallback(OperateType.InsertBottom)"
            >插入下方行</a-button
          >
        </a-col>
      </a-row>
    </collapse-Item-wrapper>
    <collapse-Item-wrapper :label="collapseTitle('delete')" :name="props.attribute" :option="option">
      <a-row :gutter="[12, 12]">
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.DeleteRow)"
            @click="onGridOperateCallback(OperateType.DeleteRow)"
            >删除整行</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.DeleteCol)"
            @click="onGridOperateCallback(OperateType.DeleteCol)"
            >删除整列</a-button
          >
        </a-col>
      </a-row>
    </collapse-Item-wrapper>
    <collapse-Item-wrapper :label="collapseTitle('merge')" :name="props.attribute" :option="option">
      <a-row :gutter="[12, 12]">
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.SplitRow)"
            @click="onGridOperateCallback(OperateType.SplitRow)"
            >合并整行</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.SplitCol)"
            @click="onGridOperateCallback(OperateType.SplitCol)"
            >合并整列</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.MergeLeft)"
            @click="onGridOperateCallback(OperateType.MergeLeft)"
            >合并左侧单元格</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.MergeRight)"
            @click="onGridOperateCallback(OperateType.MergeRight)"
            >合并右侧单元格</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.MergeTop)"
            @click="onGridOperateCallback(OperateType.MergeTop)"
            >合并上方单元格</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.MergeBottom)"
            @click="onGridOperateCallback(OperateType.MergeBottom)"
            >合并下方单元格</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.Merge)"
            @click="onGridOperateCallback(OperateType.Merge)"
            >合并</a-button
          >
        </a-col>
      </a-row>
    </collapse-Item-wrapper>
    <collapse-Item-wrapper :label="collapseTitle('split')" :name="props.attribute" :option="option">
      <a-row :gutter="[12, 12]">
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.SplitRow)"
            @click="onGridOperateCallback(OperateType.SplitRow)"
            >拆分行合并</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.SplitCol)"
            @click="onGridOperateCallback(OperateType.SplitCol)"
            >拆分列合并</a-button
          >
        </a-col>
        <a-col :span="12">
          <a-button
            block
            :disabled="gridInstance?.getOperateStatus(OperateType.Split)"
            @click="onGridOperateCallback(OperateType.Split)"
            >拆分</a-button
          >
        </a-col>
      </a-row>
    </collapse-Item-wrapper>
  </a-spin>
</template>

<script lang="ts" setup name="GridOperateEditor">
import { inject, computed, ref, onMounted } from 'vue';
import { useEventBus } from '@vueuse/core';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { gridOperateKey, gridInstanceKey } from '/@/engine/renderer/render-event-bus-key';
import { AttributeItem } from '../interface';
import { useLocale } from '/@/hooks/use-loacle';
import { Grid } from '/@/schema/common/schema';
import { OperateType } from '/@/components/hex-cell/useFeatures';

const { t } = useLocale();
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
  return core?.state.selectedData?.selectedScheme! as Grid;
});

const bus = useEventBus(gridOperateKey);
const bus2 = useEventBus(gridInstanceKey);

const collapseTitle = computed(() => (name: string) => {
  const result = t(`el.property.${props.option.type}.${props.attribute}`);
  const resetTitle = t(`el.property.${props.option.type}.${name}`);
  return `${result}: ${resetTitle}`;
});
const gridInstance = ref<any>(null);
const currentSelectNumber = computed(() => {
  return gridInstance.value?.state.cells.length ?? 0;
});
const onGridOperateCallback = (name: OperateType) => {
  bus.emit({
    id: schema.value.id,
    name,
  });
};
bus2.on((org) => {
  if (org.instance) {
    gridInstance.value = org.instance;
  }
});
const loading = ref(true);
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>
