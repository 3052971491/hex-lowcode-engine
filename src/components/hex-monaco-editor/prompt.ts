import * as monaco from 'monaco-editor';

export function createDependencyProposals(range: any) {
  // 提示名和补全代码相同的可以写这里
  const LanguageArr: string[] = ['utils'];
  const jsonArr: any[] = [];
  for (let i = 0; i < LanguageArr.length; i++) {
    const obj = {
      label: LanguageArr[i],
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: LanguageArr[i],
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: LanguageArr[i],
      documentation: '',
      range,
    };
    jsonArr.push(obj);
  }

  return [
    // 不相同的提示写这里
    {
      label: '$()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `$('组件唯一标识');`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '获取组件实例',
      range,
    },
    {
      label: 'root()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `root();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '获取根实例',
      range,
    },
    {
      label: 'showModal()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `showModal('弹框唯一标识', {}, {}).then((res) => {\n\t\n});`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '显示弹框',
      range,
    },
    {
      label: 'get()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `get('属性名');`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '获取组件某属性值',
      range,
    },
    {
      label: 'set()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `set('属性名', '属性值');`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '设置组件某属性值',
      range,
    },
    {
      label: 'getValue()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getValue();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '获取组件输入值',
      range,
    },
    {
      label: 'setValue()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setValue();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '设置组件输入值',
      range,
    },
    {
      label: 'setState()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setState({});`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '设置全局变量',
      range,
    },
    {
      label: 'reloadDataSource()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `reloadDataSource();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '重新请求所有自动加载的远程 API',
      range,
    },
    {
      label: 'http()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `http('远程API名称');`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '请求远程 API',
      range,
    },
    {
      label: 'validate()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `validate();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Form: 触发表单验证',
      range,
    },
    {
      label: 'clearValidate()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `clearValidate();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Form: 移除表单项的校验结果',
      range,
    },
    {
      label: 'resetFields()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `resetFields();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Form: 表单重置',
      range,
    },
    {
      label: 'validateFields()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `validateFields();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Form: 触发表单验证',
      range,
    },
    {
      label: 'scrollToField()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `scrollToField();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Form: 滚动到对应字段位置',
      range,
    },
    {
      label: 'success()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `success();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Modal: 保存',
      range,
    },
    {
      label: 'close()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `close();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: 'Modal: 取消',
      range,
    },
    {
      label: 'reload()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `reload();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 刷新表格',
      range,
    },
    {
      label: 'setProps()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setProps(info);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 用于设置表格参数',
      range,
    },
    {
      label: 'setLoading()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setLoading(loading);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 设置表格 loading 状态',
      range,
    },
    {
      label: 'getColumns()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getColumns();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 获取表格列数据',
      range,
    },
    {
      label: 'setColumns()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setColumns(columns);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 设置表格列数据',
      range,
    },
    {
      label: 'setPagination()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setPagination(info);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 设置分页信息',
      range,
    },
    {
      label: 'deleteSelectRowByKey()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `deleteSelectRowByKey(key);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 根据 key 删除取消选中行',
      range,
    },
    {
      label: 'getSelectRowKeys()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getSelectRowKeys();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 获取选中行的 keys',
      range,
    },
    {
      label: 'getSelectRows()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getSelectRows();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 获取选中行的 rows',
      range,
    },
    {
      label: 'clearSelectedRowKeys()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `clearSelectedRowKeys();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 清空选中行',
      range,
    },
    {
      label: 'setSelectedRowKeys()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setSelectedRowKeys(keys);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 设置选中行',
      range,
    },
    {
      label: 'getPaginationRef()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getPaginationRef();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 获取当前分页信息',
      range,
    },
    {
      label: 'getRowSelection()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getRowSelection();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 获取勾选框信息',
      range,
    },
    {
      label: 'setShowPagination()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setShowPagination(show);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 设置当前是否显示分页',
      range,
    },
    {
      label: 'getShowPagination(info)',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getShowPagination();`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '表格 Table: 获取当前是否显示分页',
      range,
    },
    {
      label: 'getComponentAttribute()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `getComponentAttribute(attribute, row, col);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '子表单 SubForm: 获取子表单中某行某列组件的属性',
      range,
    },
    {
      label: 'setComponentAttribute()',
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `setComponentAttribute(attribute, value, row, col);`,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '子表单 SubForm: 设置子表单中某行某列组件的属性',
      range,
    },
    ...jsonArr,
  ] as any[];
}
