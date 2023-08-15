<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :extra-props="props"
  >
    <hex-upload ref="__instance__" v-model:value="modelValue" :class="[ectype.props.className]" @register="register" />
  </ElementWrapper>
</template>

<script lang="ts" setup>
import type { LowCode } from '/@/types/schema.d';
import { HexCoreInjectionKey, DataEngineInjectionKey } from '/@/engine/renderer/render-inject-key';
import { computed, defineComponent, inject, onMounted, ref, unref, watch } from 'vue';
import ElementWrapper from '/@/engine/renderer/pc/components/element-wrapper.vue';
import { PcSchema } from '/@/schema/common/interface';

import { useElementDataEngine } from '../../hooks/useElementDataEngine';
import { useElement } from '../../hooks/useElement';
import { HexUpload } from '/@/components/hex-upload';
import useUpload from '/@/components/hex-upload/src/hooks/useUpload';
import { HexUploadProps } from '/@/components/hex-upload/src/types';
import { UploadListType } from 'ant-design-vue/es/upload/interface';

interface Props {
  schema: PcSchema.UploadScheme;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
  subForm?: {
    schema: PcSchema.SubFormScheme;
    rowIndex: number;
  };
}
const props = withDefaults(defineProps<Props>(), {
  subForm: undefined,
});

const core = inject(HexCoreInjectionKey);

const dataEngine = inject(DataEngineInjectionKey);
const __instance__ = ref<any>();

const { ectype, ectypeProps } = useElement<PcSchema.UploadScheme>(props, __instance__);
const { modelValue } = useElementDataEngine<PcSchema.UploadScheme>(props, dataEngine);

const prop = computed(
  () =>
    ectypeProps((obj: PcSchema.UploadSchemeProps) => {
      return {
        disabled: obj.behavior === 'disabled',
        maxCount: obj.maxCount,
        listType: obj.listType,
        maxFileSize: obj.maxFileSize,
        accept: obj.accept,
        multiple: obj.multiple,
        api: obj.api,
      };
    }) as PcSchema.UploadSchemeProps,
);

// 此处监听属性变化, 并比较第一层差异进行赋值
watch(
  prop,
  (newVal) => {
    methods.setProps(newVal as unknown as Partial<HexUploadProps>);
  },
  {
    deep: true,
  },
);

const [register, methods] = useUpload({
  api: (params = {}) => {
    if (!core?.state.__this__) return Promise.reject(new Error(`内部错误: 未检测到全局上下文`));
    if (!prop.value.api) return Promise.reject(new Error(`未选择数据源`));
    return core?.state.__this__?.http(prop.value.api, params, 'id');
  },
  disabled: unref(prop).disabled,
  maxCount: unref(prop).maxCount,
  listType: unref(prop).listType as UploadListType,
  maxFileSize: unref(prop).maxFileSize,
  accept: unref(prop).accept,
  multiple: unref(prop).multiple,
});

onMounted(() => {
  // 替换原型方法
  unref(ectype).getValue = () => {
    return unref(modelValue);
  };
  unref(ectype).setValue = (data: any) => {
    modelValue.value = data;
  };
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'UploadElement',
});
</script>
