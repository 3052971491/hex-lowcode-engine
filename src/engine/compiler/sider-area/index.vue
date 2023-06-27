<template>
  <a-layout-sider theme="light" class="sider-area" :width="width">
    <div class="w-full h-full flex">
      <div
        class="h-full w-12 min-w-12 flex flex-col menu-container"
        :style="{ borderColor: width === 47 ? 'transparent' : '#f0f2f5' }"
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
          <hex-modal v-model:visible="visible" :name="t('el.nav.actionPanel')" :is-footer="false" @ok="handleOkClick">
            <library-item
              v-if="!!data.currentDrawer"
              class="modal-library-item"
              :is-title="false"
              :config="data.currentDrawer"
            ></library-item>
          </hex-modal>
        </div>
      </div>
      <transition v-if="width !== 47" name="h1">
        <div class="flex-1 overflow-hidden library-container">
          <library-item v-if="!!data.currentMenu" :config="data.currentMenu"></library-item>
        </div>
      </transition>
      <div
        class="hover-show-handle"
        :class="{
          isLeft: !data.currentMenu,
        }"
        @click="handleIsClose(!!data.currentMenu)"
      >
        <double-left-outlined v-if="!!data.currentMenu" />
        <double-right-outlined v-else />
      </div>
    </div>
  </a-layout-sider>
</template>

<script lang="ts" setup>
import { FunctionalComponent, shallowReactive, ref, computed } from 'vue';
import Logo from '/@/assets/icon.png';
import {
  AppstoreOutlined,
  SettingOutlined,
  ApiOutlined,
  BlockOutlined,
  CodeOutlined,
  GlobalOutlined,
  PartitionOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons-vue';
import HexModal from '/@/components/hex-modal/index.vue';
import MenuItem from './components/menu-item.vue';
import LibraryItem from './components/library-item.vue';
import ElementLibrary from './library/element-library.vue';
import I18nLibrary from './library/i18n-library.vue';
import ActionPaneLibrary from './library/action-pane-library.vue';
import ComponentHierarchyTree from './library/component-hierarchy-tree.vue';
import DataSourceLibrary from './library/data-source-library.vue';
import ModalLibrary from './library/modal-library.vue';
import SettingLibrary from './library/setting-library.vue';
import { useLocale } from '/@/hooks/use-loacle';
import { IMenuItem } from './interface';

const { t } = useLocale();

const topMenu: Array<IMenuItem> = [
  {
    label: 'el.nav.componentHierarchyTree',
    value: 'structure-library',
    icon: PartitionOutlined,
    component: ComponentHierarchyTree,
  },
  {
    label: 'el.nav.componentLibrary',
    value: 'element-library',
    icon: AppstoreOutlined,
    component: ElementLibrary,
  },
  {
    label: 'el.nav.modalBox',
    value: 'modal-library',
    icon: BlockOutlined,
    component: ModalLibrary,
  },
  {
    label: 'el.nav.dataSource',
    value: 'data-source-library',
    icon: ApiOutlined,
    component: DataSourceLibrary,
  },
  {
    label: 'el.nav.actionPanel',
    value: 'code-library',
    icon: CodeOutlined,
    component: ActionPaneLibrary,
    drawer: true,
  },
  {
    label: 'el.nav.multilingualCopyManagement',
    value: 'i18n-library',
    icon: GlobalOutlined,
    component: I18nLibrary,
  },
];
const bottomMenu: Array<IMenuItem> = [
  {
    label: 'el.nav.setting',
    value: 'setting-library',
    icon: SettingOutlined,
    component: SettingLibrary,
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
    width.value = 47;
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

const handleIsClose = (isClose: boolean) => {
  data.currentMenu = null;
  data.currentDrawer = null;
  if (isClose) {
    width.value = 47;
  } else {
    data.currentMenu = topMenu[1] as any;
    width.value = 364;
  }
};
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

.sider-area {
  &:hover {
    .hover-show-handle {
      opacity: 1;
    }
  }
  .hover-show-handle {
    position: absolute;
    top: calc(50% - 60px);
    right: -30px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    padding: 10px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: #1890ff;
    background-color: #ebf3ff;
    opacity: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;
    transform: translate(-50%, 0);
  }

  .isLeft {
    right: -30px;
  }
}
</style>
