import { createApp } from 'vue';
import AntDesignVue from 'ant-design-vue';
import App from './App.vue';
import './style.less';
import 'ant-design-vue/dist/antd.css';

import HexLowcodeEngine from '/@lowcode-engine/build';

async function bootstrap() {
  const app = createApp(App);

  // 初始化UI框架
  app.use(AntDesignVue);

  app.use(HexLowcodeEngine);

  app.mount('#app');
}

bootstrap();
