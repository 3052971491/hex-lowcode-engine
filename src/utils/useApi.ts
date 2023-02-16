/**
 * 全局 JS API
 */
export function useGlobalApi(): HexForm.API.IGlobalApi {
  return {};
}

/**
 * 组件 JS API
 */
export function useElementApi(): HexForm.API.IElementApi {
  function $(elementId: string | null) {
    if (!elementId) {
      return null;
    }
    return null;
  }

  function getValue() {}

  function setValue(value: any) {}
  return {
    $,
    getValue,
    setValue,
  };
}

/**
 * 表单 JS API
 */
export function useFormApi(): HexForm.API.IFormApi {
  return {};
}
