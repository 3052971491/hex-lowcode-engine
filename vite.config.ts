import { defineConfig } from 'vite';
import path from 'path';
import { createVitePlugins } from './build/vite/plugin/index';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: createVitePlugins(),
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      },
      {
        find: /\/@\//,
        replacement: `${pathResolve('src')}/`,
      },
    ],
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // 预览打包
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      keep_classnames: true,
    },
    sourcemap: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: [],
  },
});
