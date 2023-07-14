<template>
  <div>
    <a-skeleton active :loading="loading">
      <hex-monaco-editor ref="monaco" v-model:value="content" :theme="Theme.DEFAULT" :language="Lang.VUE" />
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme, Lang } from '/@/components/hex-monaco-editor/useMonacoEditor';

const props = defineProps<{
  value: string;
}>();

const emit = defineEmits(['update:value']);

const loading = ref(true);
const content = computed({
  set(val: string) {
    emit('update:value', val);
  },
  get() {
    return props.value;
  },
});
const monaco = ref<InstanceType<typeof HexMonacoEditor>>();

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>
