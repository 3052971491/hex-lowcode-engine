<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-form ref="__instance__" :model="form.modelValue" v-bind="prop" :class="[ectype.props.className]">
      <template v-if="isPreview">
        <hex-draggable v-model:value="state.schema.children" @add="onAdd" @update="onUpdate">
          <template #item="{ element, index }">
            <div class="item hex-draggable-handle">
              <component
                :is="`${element.componentType}Element`"
                :schema="element"
                :parent-schema="state.schema"
                :parent-schema-list="state.schema.children"
                :index-of-parent-list="index"
              ></component>
            </div>
          </template>
        </hex-draggable>
      </template>
      <template v-else>
        <div v-for="(item, index) in ectype.children" :key="item.id">
          <template v-if="true">
            <component
              :is="`${item.componentType}Element`"
              :schema="item"
              :parent-schema="ectype"
              :parent-schema-list="ectype.children"
              :index-of-parent-list="index"
            />
          </template>
        </div>
      </template>
    </a-form>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, isReactive, onMounted, provide, reactive, ref, toRaw } from 'vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { FormInstance } from 'ant-design-vue';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCode } from '/@/types/schema.d';
import {
  HexCoreInjectionKey,
  RedactStateInjectionKey,
  DataEngineInjectionKey,
} from '/@/engine/renderer/render-inject-key';
import { PcSchema } from '/@/schema/common/interface';
import { useElementWrapper } from '../../hooks/useElementWrapper';
import { useForm } from './useForm';
import { useElement } from '../../hooks/useElement';
import { Form } from '/@/schema/common/schema';

const __instance__ = ref<FormInstance>();

const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.FormSchema;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
}

const props = withDefaults(defineProps<Props>(), {});
const state = reactive({
  schema: props.schema,
});
const selectedScheme = computed(() => {
  return core?.state.selectedData?.selectedScheme;
});
const onAdd = ({ newIndex }: { newIndex: number }) => {
  if (props.schema?.children && props.schema?.children[newIndex]) {
    core?.handleUpdateSelectData(props.schema.children[newIndex]);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};
const { ectype, ectypeProps } = useElement<PcSchema.FormSchema>(props, __instance__);
const { isPreview } = useElementWrapper(props.schema, selectedScheme.value, redactState);
const prop = computed(() =>
  ectypeProps((obj) => {
    return {
      hideRequiredMark: obj.hideRequiredMark,
      labelAlign: obj.labelAlign,
    };
  }),
);

const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});

const { state: form } = useForm({ schema: ectype.value, formRef: __instance__.value });
provide(DataEngineInjectionKey, {
  id: props.schema.id,
  model: '',
  schema: props.schema,
  originData: form.modelValue || {},
});

onMounted(() => {
  if (__instance__.value) {
    // 替换原型方法
    const obj = ectype.value as Form;
    obj.validate = __instance__.value.validate;
    obj.clearValidate = __instance__.value.clearValidate;
    obj.resetFields = __instance__.value.resetFields;
    obj.validateFields = __instance__.value.validateFields;
    obj.scrollToField = __instance__.value.scrollToField;
    obj.getValue = () => {
      return isReactive(form.modelValue) ? toRaw(form.modelValue) : form.modelValue;
    };
    obj.setValue = (data: Record<string, unknown>) => {
      // 循环删除表单所有数据, 这样不会丢失响应式
      for (const key in form.modelValue) {
        if (Object.prototype.hasOwnProperty.call(form.modelValue, key)) {
          delete form.modelValue[key];
        }
      }
      Object.assign(form.modelValue, data);
    };
  }
});
</script>

<script lang="ts">
export default defineComponent({
  name: 'FormElement',
});
</script>
<style lang="less" scoped>
:deep(.draggable) {
  padding-bottom: 12px;
  min-height: 68px;
}
</style>
