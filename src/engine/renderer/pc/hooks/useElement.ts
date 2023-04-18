import type { LowCode } from '/@/types/schema.d';
import { computed, ComputedRef, Ref, onMounted, inject, unref } from 'vue';

import { Scheme } from '/@/schema/common/FieldSchemaBase';
import { Context } from '/@/utils/utils';
import { InstanceCoreFactory } from '/@/engine/renderer/central/useInstanceCore';
import { ElementInstanceInjectionKey } from '/@/engine/renderer/render-inject-key';
import { HexCoreFactory } from '../../central/useHexCore';
import { Fn } from '/@/types/value-type';

interface Props<T> {
  schema: T;
}
interface IElement<T extends LowCode.NodeSchema> {
  /** 组件副本 */
  ectype: ComputedRef<Scheme<T>>;
  ectypeProps(fn: Fn, core: HexCoreFactory | undefined): { [key: string]: any };
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

  const ectype = computed((): Scheme<T> => {
    // 每次初始化将会重新实例化, 解决历史Schema与新Schema不同步问题
    return new Scheme(props.schema);
  });

  const ectypeProps = (fn: Fn, core: HexCoreFactory | undefined) => {
    const obj = unref(ectype).props;
    if (!obj) return {};
    const opt: any = {};
    if (ectype.value.events && core) {
      for (const key in unref(ectype).events) {
        if (Object.prototype.hasOwnProperty.call(unref(ectype).events, key)) {
          const element = ectype.value.events[key];
          if (element.events.length > 0) {
            element.events.forEach(({ name }: { name: string }) => {
              if (core?.state.__js__[name]) {
                opt[key] = core.state.__js__[name];
              }
            });
          }
        }
      }
    }
    return {
      ...opt,
      ...fn(obj),
    };
  };

  function registerEvent() {}

  function registerOnCreated(__instance__: InstanceCoreFactory | undefined) {
    if (!__instance__) return;
    const __this__ = new Context<T>(__instance__);
  }

  function registerOnMounted(__instance__: InstanceCoreFactory | undefined) {
    if (!__instance__) return;
    const __this__ = new Context<T>(__instance__);
  }

  function registerInstance() {
    elementInstance?.setInstance(ectype.value);
  }
  function unregisterInstance() {}

  function autofocus(__instance__?: Ref) {
    if (__instance__?.value && ectype.value.props?.autofocus) {
      __instance__.value.focus();
    }
  }

  registerInstance();
  registerOnCreated(elementInstance);
  onMounted(() => {
    registerOnMounted(elementInstance);
    autofocus(__instance__);
  });

  return {
    ectype,
    ectypeProps,
    registerEvent,
    registerOnCreated,
    registerOnMounted,
    registerInstance,
    unregisterInstance,
    autofocus,
  };
}
