import type { LowCode } from '/@/types/schema.d';
import { reactive } from 'vue';
import ProjectConfig from '/@/schema/project-schema';
import { buildUUID } from '/@/utils/common';
import { cloneDeep, isNil } from 'lodash-es';
import { Context } from '/@/utils/utils';

interface StateType {
  /** 应用配置 */
  projectConfig?: LowCode.ProjectSchema;
  /** 历史进度 */
  history?: {
    /** 当前下标 */
    index: number;
    /** 保存步骤数量限制 */
    maxStep: number;
    /** 步骤列表 */
    steps: LowCode.ProjectSchema[];
  };
  /** 选中组件节点 */
  selectedData?: {
    /** 节点唯一标识 */
    selectedId: string;
    /** 组件节点描述 */
    selectedScheme?: LowCode.Schema | null;
    /**
     * 选中的模态框节点描述
     * @description 用于模态框设计器
     */
    selectedModalScheme?: LowCode.Schema | null;
    /** 面包屑 */
    breadcrumbs: LowCode.Schema[];
  };
  __js__: {
    [key: string]: any;
  };
  __css__: string;
  __this__: Context | undefined;
  /** 是否是模态框设计器 */
  __isModalDesigner__: boolean;
}

export interface HexCoreFactory {
  /** 应用状态 */
  state: StateType;
  /**
   * 生成应用配置
   * @param project 应用配置
   */
  buildProjectConfig(project?: LowCode.ProjectSchema): void;
  /**
   * 初始化
   */
  reset(): void;
  /**
   * 清空
   */
  clear(): void;
  /**
   * 生成历史进度信息
   */
  buildHistory(): void;
  /**
   * 初始化历史进度信息
   */
  initHistoryData(): void;
  /** 是否能够后退历史进度 */
  undoDisabled(): boolean;
  /** 是否能够前进历史进度 */
  redoDisabled(): boolean;
  /** 后退一步历史进度 */
  undoHistoryStep(): void;
  /** 前进一步历史进度 */
  redoHistoryStep(): void;
  /** 更新历史进度信息 */
  handleUpdateHistoryData(): void;
  /** 保存当前历史进度信息 */
  saveCurrentHistoryData(): void;
  /** 重置当前历史进度信息 */
  handleResetHistoryData(): void;
  /** 从浏览器加载历史进度信息 */
  loadHistoryDataStorage(): void;
  /** 保存历史进度信息至浏览器 */
  saveHistoryDataStorage(): void;
  /** 生成选中组件节点信息 */
  buildSelectedData(): void;
  /** 重置选中组件节点信息 */
  handleResetSelectData(): void;
  /** 更新选中组件面包屑信息 */
  handleUpdateBreadcrumbs(schemas?: LowCode.Schema[]): void;
  /** 更新选中组件节点信息 */
  handleUpdateSelectData(element?: LowCode.Schema, breadcrumbs?: LowCode.Schema[]): void;
  /** 更新选中模态框组件节点信息 */
  handleUpdateModalSelectData(element?: LowCode.Schema, breadcrumbs?: LowCode.Schema[]): void;
  /**
   * JS-API 运行时上下文
   * @returns
   */
  context(): Context | undefined;
}
export function useHexCore(): HexCoreFactory {
  const state = reactive<StateType>({
    projectConfig: undefined,
    history: undefined,
    selectedData: undefined,
    __js__: {},
    __css__: '',
    __this__: undefined,
    __isModalDesigner__: false,
  });

  buildProjectConfig();
  // #region 应用配置JSON
  /** 初始化 */
  function init() {}
  function reset() {
    buildProjectConfig();
    buildHistory();
    buildSelectedData();
  }
  function clear() {
    if (state.projectConfig?.componentsTree) {
      state.projectConfig.componentsTree = [];
      buildSelectedData();
    }
  }

  function buildProjectConfig(project?: LowCode.ProjectSchema) {
    let config = cloneDeep(ProjectConfig);
    if (!isNil(project)) {
      config = project;
    } else {
      config = cloneDeep(ProjectConfig);
      config.id = `View_${buildUUID(8)}`;
    }
    state.projectConfig = config;
  }
  // #endregion

  // #region 历史进度信息
  function buildHistory() {
    const result = {
      index: -1,
      maxStep: 30,
      steps: [],
    };
    state.history = result;
    initHistoryData();
  }

  function initHistoryData() {
    if (isNil(state.history)) {
      return;
    }
    // 获取浏览器缓存
    loadHistoryDataStorage();
    if (!isNil(state.projectConfig)) {
      // 赋值
      state.history.index++;
      state.history.steps[state.history.index] = cloneDeep(state.projectConfig);
    }
  }
  function undoDisabled() {
    if (isNil(state.history)) {
      return true;
    }
    return !(state.history.index > 0 && state.history.steps.length > 0);
  }

  function redoDisabled() {
    if (isNil(state.history)) {
      return true;
    }
    return !(state.history.index < state.history.steps.length - 1);
  }
  function undoHistoryStep() {
    if (isNil(state.history)) {
      return;
    }
    if (state.history.index !== 0) {
      state.history.index--;
    }
    const currentStep = cloneDeep(state.history.steps[state.history.index]);
    state.projectConfig = currentStep;
  }

  function redoHistoryStep() {
    if (isNil(state.history)) {
      return;
    }
    if (state.history.index !== state.history.steps.length - 1) {
      state.history.index++;
    }
    const currentStep = cloneDeep(state.history.steps[state.history.index]);
    state.projectConfig = currentStep;
  }
  function handleUpdateHistoryData() {
    if (isNil(state.history)) {
      return;
    }
    if (state.history.index === state.history.maxStep - 1) {
      state.history.steps.shift();
    } else {
      state.history.index++;
    }
    if (!isNil(state.projectConfig)) {
      state.history.steps[state.history.index] = cloneDeep(state.projectConfig);
      saveHistoryDataStorage();
      if (state.history.index < state.history.steps.length - 1) {
        state.history.steps = state.history.steps.slice(0, state.history.index + 1);
      }
    }
  }

  function saveCurrentHistoryData() {
    if (isNil(state.history)) {
      return;
    }
    if (!isNil(state.projectConfig)) {
      state.history.steps[state.history.index] = cloneDeep(state.projectConfig);
    }
    saveHistoryDataStorage();
  }

  function loadHistoryDataStorage() {
    const backup = window.localStorage.getItem('hex__project__config__backup');
    try {
      if (!isNil(backup)) {
        state.projectConfig = JSON.parse(backup);
      }
    } catch (error) {
      console.error(error);
    }
  }
  function saveHistoryDataStorage() {
    if (!isNil(state.projectConfig)) {
      window.localStorage.setItem('hex__project__config__backup', JSON.stringify(state.projectConfig));
    }
  }
  function handleResetHistoryData() {
    if (isNil(state.history)) {
      return;
    }
    state.history.index = -1;
    state.history.maxStep = 30;
    state.history.steps = [];
  }
  // #endregion

  // #region 选中组件节点信息
  function buildSelectedData() {
    const result = {
      selectedId: '',
      selectedScheme: null,
      breadcrumbs: [],
    };
    state.selectedData = result;
  }

  function handleResetSelectData(): void {
    if (state.selectedData) {
      state.selectedData.selectedId = '';
      state.selectedData.selectedScheme = null;
      state.selectedData.breadcrumbs = [];
    }
  }

  function handleUpdateBreadcrumbs(schemas: LowCode.Schema[]) {
    if (schemas && state.selectedData) {
      state.selectedData.breadcrumbs = schemas && schemas.length > 0 ? schemas : [];
    }
  }

  function handleUpdateSelectData(element: LowCode.Schema, breadcrumbs?: LowCode.Schema[]): void {
    if (isNil(element)) {
      handleResetSelectData();
      return;
    }
    if (state.selectedData) {
      state.selectedData.selectedId = element.id;
      state.selectedData.selectedScheme = element;

      if (breadcrumbs) {
        handleUpdateBreadcrumbs(breadcrumbs);
      }
    }
  }

  function handleUpdateModalSelectData(element: LowCode.Schema, breadcrumbs?: LowCode.Schema[]): void {
    if (isNil(element)) {
      handleResetSelectData();
      return;
    }
    if (state.selectedData) {
      state.selectedData.selectedModalScheme = element;

      if (breadcrumbs) {
        handleUpdateBreadcrumbs(breadcrumbs);
      }
    }
  }

  function context() {
    return state.__this__;
  }
  // #endregion
  return {
    state,
    buildProjectConfig,
    reset,
    clear,
    buildHistory,
    initHistoryData,
    undoDisabled,
    redoDisabled,
    undoHistoryStep,
    redoHistoryStep,
    handleUpdateHistoryData,
    saveCurrentHistoryData,
    handleResetHistoryData,
    loadHistoryDataStorage,
    saveHistoryDataStorage,
    buildSelectedData,
    handleResetSelectData,
    handleUpdateBreadcrumbs,
    handleUpdateSelectData,
    handleUpdateModalSelectData,
    context,
  };
}
