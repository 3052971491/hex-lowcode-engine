import { App } from 'vue';
// import pkg from '/@/../package.json';

import RegisterComponents from '/@/engine/renderer/register-components';
import HexLowcodeEngineCompiler from '/@/engine/compiler/designer.vue';
import HexLowcodeEngineRenderer from '/@/engine/renderer/render.vue';

// 全局注册模态框
import setupModalHelper from '/@/utils/shared/modal-helper/modal-service';

const components = [HexLowcodeEngineCompiler, HexLowcodeEngineRenderer];

HexLowcodeEngineCompiler.install = (app: App): void => {
  app.component(HexLowcodeEngineCompiler.name);
};

HexLowcodeEngineRenderer.install = (app: App): void => {
  app.component(HexLowcodeEngineRenderer.name);
};

const install = (app: App) => {
  RegisterComponents.install(app);
  components.forEach((component) => {
    if (component.install) {
      app.component(`${component.name}`, component);
    }
  });
  setupModalHelper.init(app);
  return {
    app,
  };
};

// export { HexLowcodeEngineCompiler, HexLowcodeEngineRenderer };

export default {
  /** 版本 */
  // version: pkg.version,
  install,
};
