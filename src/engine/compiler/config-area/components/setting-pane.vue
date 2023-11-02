<template>
  <div class="w-full h-full overflow-hidden flex flex-col">
    <template v-if="hasSelectSchema">
      <div class="settings-navigator">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" @click="handleSelectComponent(item)">
            <a href="JavaScript:void(0)">{{ t(`el.component.${item?.componentType}`) }}</a>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="settings-content overflow-auto">
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div class="w-full h-full p-3 flex justify-center items-center">
        <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" :description="t('el.common.noData')"></a-empty>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup name="setting-area">
import { inject, computed } from 'vue';
import { Empty } from 'ant-design-vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { LowCode } from '/@/types/schema';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const core = inject(HexCoreInjectionKey);
const breadcrumbs = computed(() => {
  if (!core?.state.selectedData || core?.state.selectedData?.breadcrumbs.length < 1) return [];
  const number = core.state.selectedData.breadcrumbs.length;
  return core.state.selectedData.breadcrumbs.filter((item, index) => {
    return number - index <= 3;
  });
});

const handleSelectComponent = (schema: LowCode.Schema) => {
  if (schema.id === core?.state.selectedData?.selectedId) return;
  core?.handleUpdateSelectData(schema);
};

const hasSelectSchema = computed(() => {
  return core?.state.selectedData?.selectedId && !core?.state.selectedData?.selectedId.includes('View_');
});
</script>

<style lang="less" scoped>
.settings-navigator {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  // margin-bottom: 0.5rem;
  padding: 6px 0.5rem;
  border-bottom: 1px solid rgba(31, 56, 88, 0.1);
  background-color: #fff;
}
</style>
