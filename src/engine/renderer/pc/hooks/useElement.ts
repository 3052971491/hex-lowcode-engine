import type { LowCode } from '/@/types/schema.d';
import { computed, ComputedRef, Ref, onMounted, inject, unref, toRaw, ref } from 'vue';
import { Scheme } from '/@/schema/common/FieldSchemaBase';
import Material from '/@/schema/common/schema';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import {
  ElementInstanceInjectionKey,
  HexCoreInjectionKey,
  RedactStateInjectionKey,
} from '/@/engine/renderer/render-inject-key';
import { Fn } from '/@/types/value-type';
import { useI18n } from './useI18n';
import { PcSchema } from '/@/schema/common/interface';
import { cloneDeep } from 'lodash-es';

interface Props<T> {
  schema: T;
  parentSchema: LowCode.NodeSchema;
  parentSchemaList: LowCode.NodeSchema[];
  indexOfParentList: number;
  subForm?: {
    schema: PcSchema.SubFormScheme;
    rowIndex: number;
  };
}
interface IElement<T extends LowCode.NodeSchema> {
  /** 组件副本 */
  ectype: Ref<Scheme<T>>;
  ectypeProps(fn: Fn): Record<string, any>;
  /** 注册监听事件 */
  registerEvent(): void;
  /** 注册生命周期OnMounted */
  registerOnCreated(__instance__: any): void;
  /** 注册生命周期OnMounted */
  registerOnMounted(__instance__: any): void;
  /** 注册当前组件实例 */
  registerInstance(): void;
  /** 注销当前组件实例 */
  unregisterInstance(): void;
  /** 自动聚焦 */
  autofocus(__instance__: Ref): void;
}
/**
 * 组件
 * @param props
 * @returns
 */
export function useElement<T extends LowCode.NodeSchema>(props: Props<T>, __instance__?: Ref<any>): IElement<T> {
  const redactState = inject(RedactStateInjectionKey);
  /** 是否是子表单 */
  const isSubForm = computed(() => !!unref(props?.subForm));
  const elementInstance = inject(ElementInstanceInjectionKey);
  const core = inject(HexCoreInjectionKey);
  const { getI18n } = useI18n(core?.state.projectConfig);

  // 每次初始化将会重新实例化, 解决历史Schema与新Schema不同步问题
  const ectype = ref();
  const material = Material[props.schema.componentType];
  if (redactState) {
    ectype.value = new material(props.schema);
  } else {
    // 进行一次深拷贝, 目的是保证组件循环渲染时引用同一实例
    // 例如: 禁用位于子表单第二行的当前组件
    ectype.value = new material(cloneDeep(props.schema));
  }

  registerInstance();

  function ectypeProps(fn: Fn) {
    const obj = unref(ectype).props;
    if (!obj) return {};
    const opt: any = {};

    // 动作设置
    if (ectype.value.events && core) {
      for (const key in unref(ectype).events) {
        if (Object.prototype.hasOwnProperty.call(unref(ectype).events, key)) {
          const element = ectype.value.events[key];
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

    // 多语言转换
    const result = fn(ectype.value.props);
    for (const key in result) {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        const element = result[key];
        opt[key] = getI18n(element);
      }
    }

    return {
      ...opt,
    };
  }

  function registerEvent() {}

  function registerOnCreated(__instance__: InstanceCoreFactory | undefined) {
    // if (!__instance__) return;
  }

  function registerOnMounted(__instance__: InstanceCoreFactory | undefined) {
    // if (!__instance__) return;
  }

  /**
   * 注册组件实例至全局上下文
   * @description 规则一: 普通, `${组件Id}`
   * @description 规则二: 位于子表单中的组件, `${子表单Id}@${组件Id}@{rowIndex}`
   */
  function registerInstance() {
    // 以下为额外注册的实例
    if (unref(isSubForm)) {
      elementInstance?.setInstance(
        unref(ectype),
        `${props.subForm?.schema.id}@${unref(ectype).id}@${props.subForm?.rowIndex}`,
      );
    } else {
      elementInstance?.setInstance(unref(ectype));
    }
  }
  function unregisterInstance() {}

  function autofocus(__instance__?: Ref) {
    if (__instance__?.value && ectype.value.props?.autofocus) {
      __instance__.value.focus();
    }
  }

  registerOnCreated(elementInstance);
  onMounted(() => {
    registerOnMounted(elementInstance);
    autofocus(__instance__);
  });

  return {
    ectype,
    ectypeProps: unref(ectypeProps),
    registerEvent,
    registerOnCreated,
    registerOnMounted,
    registerInstance,
    unregisterInstance,
    autofocus,
  };
}
