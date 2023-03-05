<template>
  <a-layout-sider theme="light" class="sider-area" :width="width">
    <div class="w-full h-full flex">
      <div
        class="h-full w-12 min-w-12 flex flex-col menu-container"
        :style="{ borderColor: width === 64 ? 'transparent' : '#f0f2f5' }"
      >
        <div class="w-full p-1 mb-2 mt-2">
          <img class="w-full" alt="hex-form" :src="Logo" />
        </div>
        <div class="menu-list w-full flex-1 flex flex-col justify-between">
          <div>
            <menu-item
              v-for="(item, index) in topMenu"
              :key="index"
              :config="item"
              :active="isActive(item)"
              @click="handleUpdateSidebarWidthClick(item)"
            ></menu-item>
          </div>
          <div>
            <menu-item
              v-for="(item, index) in bottomMenu"
              :key="index"
              :config="item"
              :active="isActive(item)"
              @click="handleUpdateSidebarWidthClick(item)"
            >
            </menu-item>
          </div>
          <hex-modal v-model:visible="visible" name="动作面板" :is-footer="false" @ok="handleOkClick">
            <library-item
              v-if="!!data.currentDrawer"
              class="modal-library-item"
              :is-title="false"
              :config="data.currentDrawer"
            ></library-item>
          </hex-modal>
        </div>
      </div>
      <transition v-if="width !== 64" name="h1">
        <div class="flex-1 overflow-hidden library-container">
          <library-item v-if="!!data.currentMenu" :config="data.currentMenu"></library-item>
        </div>
      </transition>
    </div>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { FunctionalComponent, shallowReactive, ref, computed } from 'vue';
import Logo from '/@/assets/vue.svg';
import {
  AppstoreOutlined,
  SettingOutlined,
  ApiOutlined,
  BlockOutlined,
  CodeOutlined,
  GlobalOutlined,
  PartitionOutlined,
} from '@ant-design/icons-vue';
import HexModal from '/@/components/hex-modal/index.vue';
import MenuItem from './components/menu-item.vue';
import LibraryItem from './components/library-item.vue';
import ElementLibrary from './library/element-library.vue';
import I18nLibrary from './library/i18n-library.vue';
import ActionPaneLibrary from './library/action-pane-library.vue';
import ComponentHierarchyTree from './library/component-hierarchy-tree.vue';
// import DataSourceLibrary from './components/data-source-library.vue';
// import ModalLibrary from './components/modal-library.vue';

export interface IMenuItem {
  /** 名称 */
  label: string;
  /** 对应组件名称 */
  value: string;
  /** 图标 */
  icon: FunctionalComponent;
  /** 组件 */
  component: any;
  /** 是否以抽屉形式展示 */
  drawer?: boolean;
}

const topMenu: Array<IMenuItem> = [
  {
    label: '组件层次结构树',
    value: 'structure-library',
    icon: PartitionOutlined,
    component: ComponentHierarchyTree,
  },
  {
    label: '组件库',
    value: 'element-library',
    icon: AppstoreOutlined,
    component: ElementLibrary,
  },
  {
    label: '模态框',
    value: 'modal-library',
    icon: BlockOutlined,
    component: '',
  },
  {
    label: '数据源',
    value: 'data-source-library',
    icon: ApiOutlined,
    component: '',
  },
  {
    label: '动作面板',
    value: 'code-library',
    icon: CodeOutlined,
    component: ActionPaneLibrary,
    drawer: true,
  },
  {
    label: '多语言文案管理',
    value: 'i18n-library',
    icon: GlobalOutlined,
    component: I18nLibrary,
  },
];
const bottomMenu: Array<IMenuItem> = [
  {
    label: '设置',
    value: 'setting-library',
    icon: SettingOutlined,
    component: '',
  },
];
const width = ref(364);
const data: { currentMenu: IMenuItem | null; currentDrawer: IMenuItem | null } = shallowReactive({
  currentMenu: topMenu[1],
  currentDrawer: null,
});

/** 是否展示抽屉 */
const visible = ref<boolean>(false);
/** 展示抽屉 */
const handleOkClick = () => {
  visible.value = false;
};

function handleUpdateSidebarWidthClick(menu: IMenuItem) {
  if (menu.value === data.currentMenu?.value) {
    data.currentMenu = null;
    data.currentDrawer = null;
    width.value = 64;
  } else {
    if (menu.drawer) {
      data.currentDrawer = menu;
      visible.value = true;
      return;
    }
    data.currentDrawer = null;
    data.currentMenu = menu;
    if (menu.value === 'i18n-library') {
      width.value = 500;
    } else {
      width.value = 364;
    }
  }
}

const isActive = computed(() => (item: IMenuItem) => {
  return data.currentMenu?.value === item.value;
});
</script>

<style lang="less" scoped>
@keyframes axisX {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}

.h1-enter-active {
  animation: axisX 0.25s;
}
.h1-leave-active {
  animation: axisX 0.25s reverse;
}

.menu-container {
  border-right: 1px solid transparent;
}
.modal-library-item {
  padding: 0;
}
</style>
