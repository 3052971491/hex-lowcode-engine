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
    ...jsonArr,
  ] as any[];
}
