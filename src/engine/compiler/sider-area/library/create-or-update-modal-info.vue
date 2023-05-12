<template>
  <div class="create-or-update-modal-info">
    <a-form ref="form" :model="state.form">
      <a-form-item label="名称" :name="['props', 'title']" :rules="[{ required: true, message: '该字段不能为空' }]">
        <a-input v-model:value="state.form.props.title" placeholder="名称"></a-input>
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea
          v-model:value="state.form.description"
          :auto-size="{ minRows: 2, maxRows: 5 }"
          placeholder="描述"
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
