import type { Plugin, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[] | PluginOption | PluginOption[])[] = [
    vue({
      reactivityTransform: true, // 开启ref转换
    }),
    vueJsx(),
    VueSetupExtend(),
  ];

  return vitePlugins;
}
