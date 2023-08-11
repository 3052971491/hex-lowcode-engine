<template>
  <collapse-Item-wrapper label="render" :name="props.attribute" :option="props.option">
    <a-button
      block
      @click="
        visible = true;
        str = modelValue;
      "
    >
      {{ t('el.control.edit') }} {{ t('el.VueCode') }}
    </a-button>
    <hex-modal v-model:open="visible" :name="t('el.VueCode')" @ok="handleOkClick">
      <render v-model:value="str"></render>
    </hex-modal>
  </collapse-Item-wrapper>
</template>
<script lang="ts" setup name="VueRenderEditor">
import { inject, computed, ref } from 'vue';
import CollapseItemWrapper from '../../components/collapse-item-wrapper.vue';
import { HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { AttributeItem } from '../../attribute-editor/interface';
import { set, get } from '/@/utils/schema';
import { useLocale } from '/@/hooks/use-loacle';
import HexModal from '/@/components/hex-modal/index.vue';
import render from './render.vue';

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
  return core?.state.selectedData?.selectedScheme!;
});

const modelValue = computed({
  set(val: string) {
    set(props.attribute, val, schema.value, core?.state.projectConfig);
  },
  get() {
    return get(props.attribute, schema.value);
  },
});

const str = ref('');

const visible = ref(false);

const handleOkClick = () => {
  modelValue.value = str.value;
  visible.value = false;
  str.value = '';
};
</script>
