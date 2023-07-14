import { onKeyStroke } from '@vueuse/core';
import { HexCoreFactory } from '/@/engine/renderer/central/useHexCore';
import { useLocale } from '/@/hooks/use-loacle';
import { message } from 'ant-design-vue';
import { log } from 'console';

export const useKeyboard = (core: HexCoreFactory, i18n: any) => {
  /**
   * 删除组件
   * @description "Delete"
   */
  function __Delete__() {
    onKeyStroke(['Delete'], (e) => {
      e.preventDefault();
      const { selectedId, breadcrumbs } = core.state.selectedData!;
      if (!selectedId) return;
      console.log(breadcrumbs[1]);
      // 当组件节点面包屑长度 <= 1时，代表当前节点位于根节点
      if (breadcrumbs.length === 1) {
        if (!core.state.__isModalDesigner__) {
          const idx = core.state.projectConfig?.componentsTree.findIndex((item) => item.id === selectedId);
          if (idx !== -1) {
            core.state.projectConfig?.componentsTree.splice(idx!, 1);
          }
        } else {
          // 模态框设计器
          const idx = core.state.projectConfig?.dialogComponentsTree.findIndex((item) => item.id === selectedId);
          if (idx !== -1) {
            core.state.projectConfig?.dialogComponentsTree.splice(idx!, 1);
          }
        }
      } else {
        // 当前节点的父节点
        const parent = breadcrumbs[1];
        // todo: 模态框面包屑没有加内容操作区以及底部操作区，所以根节点删除失败
        const idx = parent.children?.findIndex((item) => item.id === selectedId);
        if (idx !== -1) {
          parent.children?.splice(idx!, 1);
        }
      }

      // 删除选中组件
      // 清空选中组件
      core?.handleUpdateSelectData();
      core?.handleUpdateHistoryData();
    });
  }

  /**
   * 保存当前进度
   * @description "Ctrl" "s"
   */
  function __Save__() {
    const { t } = useLocale(i18n);
    onKeyStroke(['Ctrl', 's'], (e) => {
      e.preventDefault();
      core?.saveCurrentHistoryData();
      message.success(t('el.success.archive'));
    });
  }
  function registerKeyboard() {
    __Delete__();
    __Save__();
  }

  return {
    registerKeyboard,
  };
};
