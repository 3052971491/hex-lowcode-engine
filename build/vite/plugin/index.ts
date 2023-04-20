import type { Plugin, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import { visualizer } from 'rollup-plugin-visualizer';

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[] | PluginOption | PluginOption[])[] = [vue(), vueJsx(), VueSetupExtend()];
  // 打包分析
  vitePlugins.push(
    visualizer({
      open: true, // 注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
    }),
  );
  return vitePlugins;
}
