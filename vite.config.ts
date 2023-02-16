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
      {
        find: /\/@lowcode-engine/,
        replacement: `${pathResolve('src/engine')}/`,
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
  build: {
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'ant-design-vue',
        },
      },
    },
    lib: {
      entry: path.resolve(`${pathResolve('src')}/engine`, 'index.ts'),
      name: 'hex-lowcode-engine',
      fileName: 'hex-lowcode-engine',
      formats: ['es', 'umd'],
    },
    outDir: 'lib',
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: [],
  },
});
