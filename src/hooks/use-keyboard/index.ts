import { onKeyStroke } from '@vueuse/core';
import { HexCoreFactory } from '/@/engine/renderer/central/useHexCore';
import { useLocale } from '/@/hooks/use-loacle';
import { message } from 'ant-design-vue';
import { copyElementSchema } from '/@/utils/draggable-api';

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

  /**
   * 复制组件
   * @description "Ctrl" "c"
   */
  function __Copy__() {
    onKeyStroke(['Ctrl', 'c'], (e) => {
      e.preventDefault();
      const { selectedId, ...opt } = core.state.selectedData!;
      if (!selectedId) return;
      core.state.__schemaCopy__ = !core.state.__isModalDesigner__ ? opt.selectedScheme : opt.selectedModalScheme;
    });
  }

  /**
   * 粘贴组件
   * @description "Ctrl" "v"
   */
  function __Paste__() {
    onKeyStroke(['Ctrl', 'v'], (e) => {
      e.preventDefault();
      if (core.state.__schemaCopy__) {
        const { breadcrumbs } = core.state.selectedData!;
        if (!core.state.__isModalDesigner__) {
          const copySelected = copyElementSchema(core.state.__schemaCopy__);
          if (breadcrumbs.length === 1) {
            const idx = core.state.projectConfig?.componentsTree?.findIndex(
              (item) => item.id === core.state.__schemaCopy__?.id,
            );
            if (idx !== -1) {
              core.state.projectConfig?.componentsTree.push(copySelected);
              core?.handleUpdateSelectData(copySelected);
              core?.handleUpdateHistoryData();
            }
          } else if (breadcrumbs[1].children) {
            const idx = breadcrumbs[1].children?.findIndex((item) => item.id === core.state.__schemaCopy__?.id);
            if (idx !== -1) {
              breadcrumbs[1].children.push(copySelected);
              core?.handleUpdateSelectData(copySelected);
              core?.handleUpdateHistoryData();
            }
          }
        }
      }
    });
  }

  /**
   * 选择父节点
   * @description "↑"
   */
  function __SelectParentNode__(): void {
    onKeyStroke(['ArrowUp'], (e) => {
      e.preventDefault();
      const { selectedId, breadcrumbs } = core.state.selectedData!;
      if (!selectedId) return;
      if (breadcrumbs.length === 1) {
        core?.handleUpdateSelectData();
      } else {
        const parent = breadcrumbs[1];
        core?.handleUpdateSelectData(parent);
      }
    });
  }

  /**
   * 选择子节点
   * @description "↓"
   */
  function __SelectChildrenNode__(): void {
    onKeyStroke(['ArrowDown'], (e) => {
      e.preventDefault();
      const { selectedId, selectedScheme } = core.state.selectedData!;
      if (!selectedId) {
        const node = core.state.projectConfig?.componentsTree[0];
        core?.handleUpdateSelectData(node);
      } else if (selectedScheme?.children && selectedScheme.children.length > 0) {
        const node = selectedScheme.children[0];
        core?.handleUpdateSelectData(node);
      }
    });
  }

  /**
   * 向右选择兄弟节点
   * @description "→"
   */
  function __SelectSiblingNodeToRight__() {
    onKeyStroke(['ArrowRight'], (e) => {
      e.preventDefault();
      const { selectedId, breadcrumbs } = core.state.selectedData!;
      const parentChildren =
        breadcrumbs.length === 1 ? core.state.projectConfig?.componentsTree : breadcrumbs[1].children;
      if (!parentChildren || parentChildren?.length < 1) return;
      const idx = parentChildren?.findIndex((item) => item.id === selectedId);
      if (idx !== -1) {
        if (idx !== parentChildren.length - 1) {
          core?.handleUpdateSelectData(parentChildren[idx + 1]);
        }
      }
    });
  }

  /**
   * 向左选择兄弟节点
   * @description "←"
   */
  function __SelectSiblingNodeTolEFT__() {
    onKeyStroke(['ArrowLeft'], (e) => {
      e.preventDefault();
      const { selectedId, breadcrumbs } = core.state.selectedData!;
      const parentChildren =
        breadcrumbs.length === 1 ? core.state.projectConfig?.componentsTree : breadcrumbs[1].children;
      if (!parentChildren || parentChildren?.length < 1) return;
      const idx = parentChildren?.findIndex((item) => item.id === selectedId);
      if (idx !== -1) {
        if (idx !== 0) {
          core?.handleUpdateSelectData(parentChildren[idx - 1]);
        }
      }
    });
  }

  function registerKeyboard() {
    __Delete__();
    __Save__();
    __Copy__();
    __Paste__();
    __SelectParentNode__();
    __SelectChildrenNode__();
    __SelectSiblingNodeToRight__();
    __SelectSiblingNodeTolEFT__();
  }

  return {
    registerKeyboard,
  };
};
