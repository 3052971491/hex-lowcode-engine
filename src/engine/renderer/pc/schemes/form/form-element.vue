<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-form ref="formRef" :model="form.modelValue" v-bind="ectypeProps" :class="[ectype.props.className]">
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
          <component
            :is="`${item.componentType}Element`"
            :schema="item"
            :parent-schema="ectype"
            :parent-schema-list="ectype.children"
            :index-of-parent-list="index"
          />
        </div>
        <a-space>
          <a-button @click="handleValidate(1)">校验</a-button>
          <a-button @click="handleValidate(2)">清空校验</a-button>
          <a-button @click="handleValidate(3)">重置</a-button>
        </a-space>
      </template>
    </a-form>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { computed, defineComponent, inject, provide, reactive, ref } from 'vue';
import { cloneDeep } from 'lodash-es';
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

const formRef = ref<FormInstance>();

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
const { isPreview } = useElementWrapper(props.schema, selectedScheme.value, redactState);
const ectype = computed(() => {
  return cloneDeep(props.schema);
});

const ectypeProps = computed(() => {
  if (!ectype.value) return {};
  const obj = ectype.value.props;
  if (!obj) return {};
  return {
    hideRequiredMark: obj.hideRequiredMark,
    labelAlign: obj.labelAlign,
  };
});

const classMap = computed(() => {
  if (!redactState) return [];
  return [];
});

const form = useForm({ schema: ectype.value, formRef: formRef.value });
if (!redactState) {
  provide(DataEngineInjectionKey, {
    id: props.schema.id,
    model: '',
    schema: props.schema,
    originData: form.modelValue,
  });
}

function handleValidate(index: number) {
  const form1 = useForm({ schema: ectype.value, formRef: formRef.value });
  if (index === 1) {
    form1.validate().then((result) => {
      console.log(result);
    });
  }
  if (index === 2) {
    form1.clearValidate();
  }
  if (index === 3) {
    form1.resetFields();
  }
}
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
