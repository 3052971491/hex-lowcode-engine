import * as monaco from 'monaco-editor';

export function createDependencyProposals(range: any) {
  const LanguageArr: string[] = ['$()']; // 提示名和补全代码相同的可以写这里
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
      label: 'if', // 提示名
      kind: monaco.languages.CompletionItemKind.Function,
      insertText: `\n#if()\n\t\n #end`, // 补全代码
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      detail: '流程控制',
      range,
    },
    ...jsonArr,
  ] as any[];
}
