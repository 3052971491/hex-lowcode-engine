<template>
  <div class="create-or-update-modal-info">
    <a-form ref="form" :model="state.form">
      <a-form-item
        :label="t('el.label.name')"
        :name="['props', 'title']"
        :rules="[{ required: true, message: t('el.required.field') }]"
      >
        <a-input v-model:value="state.form.props.title" :placeholder="t('el.label.name')"></a-input>
      </a-form-item>
      <a-form-item :label="t('el.label.description')" name="description">
        <a-textarea
          v-model:value="state.form.description"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          :placeholder="t('el.label.description')"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { FormInstance } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import { PcSchema } from '/@/schema/common/interface';
import { cloneDeep } from 'lodash-es';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const form = ref<FormInstance>();

const props = defineProps<{
  data: PcSchema.ModalSchema;
}>();

const state = reactive<{
  form: PcSchema.ModalSchema;
}>({
  form: cloneDeep(props.data),
});

function validate() {
  return new Promise((res, rej) => {
    form.value
      ?.validate()
      .then(() => {
        res(state.form);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

defineExpose({
  validate,
});
</script>
