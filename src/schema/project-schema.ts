import type { LowCode } from '/@/types/schema.d';

/**
 * 页面配置
 */
const ProjectConfig: LowCode.ProjectSchema = {
  id: '',
  utils: [],
  css: '',
  dataSource: {
    list: [],
    dataHandler: undefined,
  },
  i18n: {
    'zh-CN': {},
    'en-US': {},
  },
  config: {
    i18n: 'zh-CN',
    remoteUrl: '',
  },
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
