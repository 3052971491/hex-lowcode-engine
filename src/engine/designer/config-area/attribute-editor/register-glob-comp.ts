const editor: any = {};
const modules = import.meta.globEager('./**/*.vue');

Object.values(modules).forEach((element: any) => {
  editor[element.default.name] = element.default;
});
export { editor };
