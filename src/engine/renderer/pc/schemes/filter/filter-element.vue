<template>
  <ElementWrapper
    :schema="schema"
    :parent-schema="parentSchema"
    :parent-schema-list="parentSchemaList"
    :index-of-parent-list="indexOfParentList"
    :class="classMap"
  >
    <a-form
      ref="__instance__"
      :model="form.modelValue"
      :layout="prop.layout"
      class="overflow-hidden"
      :class="[ectype.props.className]"
    >
      <template v-if="isPreview">
        <hex-draggable
          v-model:value="state.schema.children"
          :draggable-class="state.schema.componentType"
          tag="a-row"
          slot-tag="a-col"
          :slot-property="{
            span: 24 / (ectype.props.columnNumber || 24),
          }"
          @add="onAdd"
          @update="onUpdate"
        >
          <template #item="{ element, index }">
            <div class="item hex-draggable-handle">
              <component
                :is="`${element.componentType}Element`"
                :schema="element"
                :parent-schema="state.schema"
                :parent-schema-list="state.schema.children"
                :index-of-parent-list="index"
                style="padding: 6px"
              />
            </div>
          </template>
        </hex-draggable>
      </template>
      <template v-else>
        <a-row :gutter="[12, 12]">
          <template v-for="(item, index) in ectype.children" :key="item.id">
            <a-col v-show="!(!advancedFilter && filterInfo(item))" :span="24 / (ectype.props.columnNumber || 24)">
              <template v-if="true">
                <component
                  :is="`${item.componentType}Element`"
                  :schema="item"
                  :parent-schema="ectype"
                  :parent-schema-list="ectype.children"
                  :index-of-parent-list="index"
                />
              </template>
            </a-col>
          </template>
        </a-row>
      </template>
      <a-row :gutter="[12, 12]">
        <a-col :span="24" style="text-align: right">
          <a-button v-show="isShowAdvancedFilter" type="link" @click="advancedFilter = !advancedFilter">
            <template #icon>
              <UpOutlined v-if="advancedFilter" />
              <DownOutlined v-else />
            </template>
            {{ advancedFilter ? t('el.control.fold') : t('el.control.expand') }}
          </a-button>
          <a-button type="primary" :icon="h(SearchOutlined)" @click="handleSearchClick">
            {{ t('el.control.search') }}
          </a-button>
          <a-button style="margin-left: 8px" @click="handleResetClick()">
            {{ t('el.control.reset') }}
          </a-button>
        </a-col>
      </a-row>
    </a-form>
  </ElementWrapper>
</template>

<script lang="ts" setup>
import { h, computed, defineComponent, inject, isReactive, onMounted, provide, reactive, ref, toRaw, unref } from 'vue';
import HexDraggable from '/@/components/hex-draggable/hex-draggable.vue';
import { FormInstance } from 'ant-design-vue';
import { UpOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons-vue';
import ElementWrapper from '../../components/element-wrapper.vue';
import { LowCode } from '/@/types/schema.d';
import {
  HexCoreInjectionKey,
  RedactStateInjectionKey,
  DataEngineInjectionKey,
} from '/@/engine/renderer/render-inject-key';
import { PcSchema } from '/@/schema/common/interface';
import { useElementWrapper } from '../../hooks/useElementWrapper';
import { useForm } from '../form/useForm';
import { useElement } from '../../hooks/useElement';
import { Filter, FilterConfigItemDto, Table } from '/@/schema/common/schema';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const __instance__ = ref<FormInstance>();

const core = inject(HexCoreInjectionKey);
const redactState = inject(RedactStateInjectionKey);

interface Props {
  schema: PcSchema.FilterSchema;
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
    const addSchema = props.schema?.children[newIndex];
    // 当拖拽【表单控件】进入【查询组件】, 新增筛选项配置
    if (state.schema.props) {
      const item = new FilterConfigItemDto({ componentId: addSchema.id });
      state.schema.props.config.push(item);
    }
    core?.handleUpdateSelectData(addSchema);
    core?.handleUpdateHistoryData();
  }
};

const onUpdate = () => {
  core?.handleUpdateHistoryData();
};

const { ectype, ectypeProps } = useElement<PcSchema.FilterSchema>(props, __instance__);
const { isPreview } = useElementWrapper(props.schema, selectedScheme.value, redactState);
const prop = computed(() =>
  ectypeProps((obj: PcSchema.FilterSchemaProps) => {
    return {
      columnNumber: obj.columnNumber,
      layout: obj.layout,
      config: obj.config,
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

const advancedFilter = ref(false);

const filterInfo = computed(() => (i: LowCode.NodeSchema) => {
  return unref(ectype).props?.config?.find((item) => item.componentId === i.id)?.isAdvanced;
});

const isShowAdvancedFilter = computed(() => {
  return !!unref(ectype).props?.config.find((item) => item.isAdvanced);
});

function reloadTableApi() {
  if (redactState) return;
  const { props } = unref(ectype);
  if (props.tableComponentId && core?.state.__this__) {
    const table = core?.state.__this__.$(props.tableComponentId) as Table;
    table?.reload({ filterInfo: ectype.value.getValue() as any });
  }
}
const handleSearchClick = () => {
  if (redactState) return;
  __instance__.value?.validate().then((res) => {
    const { events, props } = unref(ectype);
    // 动作
    const opt: any = {};
    if (events && core) {
      for (const key in events) {
        if (Object.prototype.hasOwnProperty.call(events, key)) {
          const element = events[key];
          if (element.events.length > 0) {
            element.events.forEach((i: any) => {
              if (core?.state.__js__[i.name]) {
                core.context()!.params = JSON.parse(i.params);
                opt[key] = core.state.__js__[i.name].bind(core.context(), { data: res });
              }
            });
          }
        }
      }
    }
    if (opt.onSearch) {
      opt.onSearch();
    }
    reloadTableApi();
  });
};

const handleResetClick = () => {
  if (redactState) return;
  __instance__.value?.resetFields();
  const { events, props } = unref(ectype);
  // 动作
  const opt: any = {};
  if (events && core) {
    for (const key in events) {
      if (Object.prototype.hasOwnProperty.call(events, key)) {
        const element = events[key];
        if (element.events.length > 0) {
          element.events.forEach((i: any) => {
            if (core?.state.__js__[i.name]) {
              core.context()!.params = JSON.parse(i.params);
              opt[key] = core.state.__js__[i.name].bind(core.context());
            }
          });
        }
      }
    }
  }
  if (opt.onReset) {
    opt.onReset();
  }
  reloadTableApi();
};

onMounted(() => {
  if (__instance__.value) {
    // 替换原型方法
    const obj = ectype.value as Filter;
    obj.validate = __instance__.value.validate;
    obj.clearValidate = __instance__.value.clearValidate;
    obj.resetFields = __instance__.value.resetFields;
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
  name: 'FilterElement',
});
</script>
<style lang="less" scoped>
:deep(.draggable) {
  min-height: 68px;
}

:deep(.ant-form-item) {
  margin-bottom: 0;
}
</style>
