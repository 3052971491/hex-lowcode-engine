import { defineConfig } from 'vite';
import path from 'path';
import { createNpmVitePlugins } from './build/vite/plugin/index';

function pathResolve(dir: string) {
  return path.resolve(process.cwd(), '.', dir);
}
const prefix = `monaco-editor/esm/vs`;
// https://vitejs.dev/config/
export default defineConfig({
  mode: 'production',
  publicDir: false,
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
        additionalData: `@import "${pathResolve('src')}/styles/common.less";`,
      },
    },
  },
  // NPM打包
  build: {
    rollupOptions: {
      external: ['vue', '@ant-design/icons-vue', 'ant-design-vue', 'monaco-editor', 'axios', 'lodash-es', 'lodash'],
      output: {
        globals: {
          globalObject: 'self',
          vue: 'Vue',
          '@ant-design/icons-vue': '@ant-design/icons-vue',
          'ant-design-vue': 'ant-design-vue',
          'monaco-editor': 'monaco-editor',
          axios: 'axios',
          'lodash-es': 'lodash-es',
          lodash: 'lodash',
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
