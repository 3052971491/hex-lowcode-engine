import {
  reactive,
  isReactive,
  shallowReactive,
  toRef,
  toRefs,
  shallowRef,
  triggerRef,
  customRef,
  ref,
  unref,
  isRef,
  isProxy,
  readonly,
  shallowReadonly,
  toRaw,
  markRaw,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  nextTick,
  provide,
  inject,
} from 'vue';

export const SetupApi = {
  // 基础类型响应式
  ref,
  unref,
  isRef,
  toRef,
  toRefs,
  shallowRef,
  triggerRef,
  customRef,

  // 复杂类型响应式
  reactive,
  shallowReactive,
  isReactive,

  readonly,
  shallowReadonly,
  toRaw,
  markRaw,
  isProxy,
  computed,
  watch,

  // 依赖注入
  provide,
  'inject ': inject,

  // 生命周期
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,

  // 其他
  nextTick,
};

/** 选项Api模板 */
export const sfcTemplateCode: string = `<template>
  <div class="hex-code-view">Hello, Vue</div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {}
  };
</script>

<style lang="less">
.hex-code-view {}
</style>`;

/** 组合是API模板 */
export const sfcSetupTemplateCode: string = `<template>
  <div class="hex-code-view">Hello, Vue</div>
</template>
  
<script>
  export default {
    setup(props, context) {
      onMounted(()=> {})
      return {}
    },
  };
</script>

<style lang="less">
.hex-code-view {}
</style>`;

export function BuiltSetupFunction(code: string, context: any) {
  let componentScript = {};
  const scriptCode = `try {
    /////////////////////////////////// 内置模块 vue api 开始 ///////////////////////////////////
    const {
      reactive,
      isReactive,
      shallowReactive,
      toRef,
      toRefs,
      shallowRef,
      triggerRef,
      customRef,
      ref,
      unref,
      isRef,
      isProxy,
      readonly,
      shallowReadonly,
      toRaw,
      markRaw,
      computed,
      watch,
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      onBeforeUnmount,
      onUnmounted,
      onErrorCaptured,
      nextTick,
      provide,
      inject 
    } = vue;
    /////////////////////////////////// 内置模块 vue api 结束 ///////////////////////////////////
  
    /////////////////////////////////// 自定义模块 开始 /////////////////////////////////////////
    ${code}
    /////////////////////////////////// 自定义模块 结束 /////////////////////////////////////////
  
    return componentScript
  } catch (error) {
    console.error(error)
  }`;
  componentScript = new Function('app', 'componentScript', 'vue', scriptCode).call(
    null,
    context,
    componentScript,
    SetupApi,
  );
  return componentScript;
}
