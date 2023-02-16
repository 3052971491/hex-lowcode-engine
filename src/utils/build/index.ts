import { App } from 'vue';
import pkg from '/@/../package.json';

import RegisterComponents from './register-components';
import HexFormEditor from '../designer/designer.vue';
import HexFormRender from '../render/render.vue';

const components = [HexFormEditor, HexFormRender];

HexFormEditor.install = (app: App): void => {
  app.component(HexFormEditor.name);
};

HexFormRender.install = (app: App): void => {
  app.component(HexFormRender.name);
};

export const install = (app: App) => {
  RegisterComponents.install(app);
  components.forEach((component) => {
    if (component.install) {
      app.component(`${component.name}`, component);
    }
  });
  return {
    app,
  };
};

export default {
  /** 版本 */
  version: pkg.version,
  install,
};
