import { App } from 'vue';

const modules = import.meta.globEager('./pc/schemes/**/*.vue');

const install = (app: App) => {
  Object.values(modules).forEach((element: any) => {
    app.component(element.default.name, element.default);
  });
};

export default {
  install,
};
