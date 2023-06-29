import { defineConfig } from 'vite';
import path from 'path';
import { createNpmVitePlugins } from './build/vite/plugin/index';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  // publicDir: false,
  plugins: createNpmVitePlugins(),
  resolve: {
    dedupe: ['vue'],
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
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // NPM打包
  build: {
    rollupOptions: {
      external: ['vue', 'ant-design-vue', '@ant-design/icons-vue', 'monaco-editor'],
      output: {
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'ant-design-vue',
          '@ant-design/icons-vue': '@ant-design/icons-vue',
          'monaco-editor': 'monaco-editor',
        },
      },
    },
    lib: {
      entry: path.resolve(`${pathResolve('src')}/utils/build`, 'index.ts'),
      name: 'hex-lowcode-engine',
      fileName: 'hex-lowcode-engine',
      formats: ['es', 'umd'],
    },
    outDir: 'lib',
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
