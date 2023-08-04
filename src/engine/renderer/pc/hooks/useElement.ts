import type { LowCode } from '/@/types/schema.d';
import { computed, ComputedRef, Ref, onMounted, inject, unref } from 'vue';
import { Scheme } from '/@/schema/common/FieldSchemaBase';
import Material from '/@/schema/common/schema';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import { ElementInstanceInjectionKey, HexCoreInjectionKey } from '/@/engine/renderer/render-inject-key';
import { Fn } from '/@/types/value-type';
import { useI18n } from './useI18n';

interface Props<T> {
  schema: T;
}
interface IElement<T extends LowCode.NodeSchema> {
  /** 组件副本 */
  ectype: ComputedRef<Scheme<T>>;
  ectypeProps(fn: Fn): { [key: string]: any };
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
  const elementInstance = inject(ElementInstanceInjectionKey);
  const core = inject(HexCoreInjectionKey);
  const { getI18n } = useI18n(core?.state.projectConfig);

  const ectype = computed((): Scheme<T> => {
    // 每次初始化将会重新实例化, 解决历史Schema与新Schema不同步问题
    const material = Material[props.schema.componentType];
    return new material(props.schema);
  });
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

  function registerInstance() {
    elementInstance?.setInstance(unref(ectype));
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
