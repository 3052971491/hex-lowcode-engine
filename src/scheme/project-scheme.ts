import type { LowCodeScheme } from '/@/types/scheme.d';

/**
 * 页面配置
 */
const ProjectConfig: LowCodeScheme.ProjectScheme = {
  id: '',
  utils: [],
  css: '',
  dataSource: [],
  i18n: {
    'zh-CN': {},
    'en-US': {},
  },
  config: {},
  componentsTree: [],
  dialogComponentsTree: [],
  originCode: `/**
  * 尊敬的用户，你好：页面 JS 面板是高阶用法。
  * 一般不建议普通用户使用，如需使用，请确定你具备研发背景，能够自我排查问题。
  */`,
  state: {},
  methods: {},
  lifeCycles: {},
};

export default ProjectConfig;
