<template>
  <div class="hex-monaco-editor m-e w-full h-full overflow-hidden">
    <div class="m-e-main">
      <div
        class="m-e-main_toolbar w-full flex"
        :style="
          isThemeLightOrBlack
            ? 'background-color: #fff; box-shadow: 0px 2px 5px #ddd;'
            : 'background-color: #1e1e1e; box-shadow: 0px 2px 5px #111;'
        "
      >
        <div class="m-e-main_toolbar_left flex-1" :style="isThemeLightOrBlack ? 'color: #000' : 'color: #fff'">
          <span>
            <slot name="title">
              {{ t(title) }}
            </slot>
          </span>
        </div>

        <div class="m-e-main_toolbar_right" :style="isThemeLightOrBlack ? 'color: #000' : 'color: #fff'">
          <!-- 搜索 -->
          <search-outlined class="icon" @click="findByKeyword" />
          <!-- 回到顶部 -->
          <up-circle-outlined class="icon" @click="scrollToTop" />
          <!-- 回到底部 -->
          <down-circle-outlined class="icon" @click="scrollToBottom" />
          <!-- 格式刷 -->
          <format-painter-outlined class="icon" @click="handleFormatCodeClick" />
          <!-- 是否截断换行 -->
          <menu-outlined class="icon" @click="setEditorWordWrap" />
          <!-- 下载 -->
          <cloud-download-outlined class="icon" @click="handleDownloadLogClick" />
          <!-- 清空 -->
          <clear-outlined class="icon" @click="handleClearClick" />
        </div>
      </div>
      <div ref="Editor" class="m-e-main_container"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="HexMonacoEditor">
import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api';
import { onMounted, ref, computed, onUnmounted, reactive } from 'vue';
import {
  SearchOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  CloudDownloadOutlined,
  MenuOutlined,
  FormatPainterOutlined,
  ClearOutlined,
} from '@ant-design/icons-vue';

import { isNil, isString } from 'lodash-es';
import monaco from './dependencies';
import { Theme, Lang } from './useMonacoEditor';
import 'monaco-editor/esm/vs/editor/contrib/hover/browser/hover';
import { createDependencyProposals } from './prompt';
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
interface Prop {
  value?: any;
  /** 标题 */
  title?: string;
  /** 语言 */
  language?: Lang;
  /** 官方自带三种主题：vs、hc-black、vs-dark */
  theme?: Theme;
  /** 是否只读 */
  readonly?: boolean;
}

const props = withDefaults(defineProps<Prop>(), {
  title: 'el.onlineCodeEditor',
  language: Lang.JS,
  theme: Theme.DARK,
  readonly: false,
  value: '',
});

const emit = defineEmits([
  'update:value',
  'change',
  'blur',
  'editor-created',
  'editor-mounted',
  'onDidChangeMarkers',
  'onCodeLenClick',
  'onDidChangeCodeLen',
]);
const content = computed({
  set(val: string) {
    emit('change', getEditorContent());
    emit('update:value', getEditorContent());
  },
  get() {
    if (!isString(props.value) && props.value !== null) {
      console.warn('HexMonacoEditor: Please pass in the string!!!');
      return '';
    }
    return !isNil(props.value) ? props.value : '';
  },
});

const state = reactive<{
  codeLens: languages.CodeLens[];
  commands: string[];
}>({
  codeLens: [],
  commands: [],
});

// 编辑器实例
const Editor = ref();

let monacoEditor: editor.IStandaloneCodeEditor | null = null;
/** 是否启用截断功能 */
const wordWrap = ref(false);
/** 是否全屏状态 */
const fullScreen = ref(false);
/** 明亮或暗夜模式，true 为白天模式，false 为暗夜模式 */
const isThemeLightOrBlack = ref(false);

if (props.theme === Theme.DEFAULT) {
  isThemeLightOrBlack.value = true;
}

const option: editor.IStandaloneEditorConstructionOptions = {
  value: content?.value ?? '', // 编辑器内容
  language: props.language,
  automaticLayout: true, // 是否自动布局
  theme: props.theme,
  readOnly: props.readonly,
  wordWrap: wordWrap.value ? 'on' : 'off', // 当单行文本太长时截断换行，true 为换行，false 为不换行
  scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
  // 是否开启小地图
  minimap: {
    enabled: true,
  },
  tabSize: 2, // tab缩进长度
  autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
  autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
  autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
  autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
  comments: {
    ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
    insertSpace: true, // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
  }, // 注释配置
  columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
  folding: true, // 是否启用代码折叠
  fixedOverflowWidgets: true, // 超出编辑器大小的使用fixed属性显示
  // 编辑器悬停配置
  hover: {
    sticky: true, // 悬停是否粘滞，可以点击并选择其内容
    above: false, // 悬停是否应该显示在直线上方
  },
};

// 自定义代码补全
const provider: any = ref(null);
const codeLensProvider: any = ref(null);

function init() {
  dispose();
  registerEditor();
  registerLanguage();
  registerCompletionItem();
  registerCodeLens();
}

async function registerEditor() {
  emit('editor-created');
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2016,
    // 允许非TS扩张
    allowNonTsExtensions: true,
  });

  monaco.editor.onDidChangeMarkers(() => {
    emit('onDidChangeMarkers', getEditorMarkers());
  });

  monacoEditor = monaco.editor.create(Editor.value, option);

  // 设置编辑器滚动到最底部
  scrollToBottom();
  monacoEditor.onDidChangeModelContent((event: any) => {
    emit('change', getEditorContent(), event);
    emit('update:value', getEditorContent());
  });

  monacoEditor.onDidBlurEditorText(() => {
    emit('blur', getEditorContent());
  });

  emit('editor-mounted', editor);
}

/** 注册语言 */
function registerLanguage() {
  monaco.languages.register({ id: props.language });
}

/** 注册语法提示 */
function registerCompletionItem() {
  if (!provider.value) {
    provider.value = monaco.languages.registerCompletionItemProvider(props.language, {
      provideCompletionItems(model, position) {
        let suggestions = [] as any[];

        if (props.language === Lang.JS || props.language === Lang.TS) {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
          suggestions = createDependencyProposals(range);
        }
        return {
          suggestions, // 自定义代码补全
        };
      },
      triggerCharacters: ['.'],
    });
  }
}

/** 注册索引 */
function registerCodeLens() {
  if (!codeLensProvider.value) {
    codeLensProvider.value = monaco.languages.registerCodeLensProvider(props.language, {
      provideCodeLenses(model, token) {
        emit('onDidChangeCodeLen');
        const obj = {
          lenses: state.codeLens,
          dispose: () => {},
        } as any;
        return obj;
      },
      resolveCodeLens(model, codeLens, token) {
        console.log(model, codeLens, token);
        return codeLens;
      },
    });
  }
}

/**
 * 设置编辑器的内容且滚动到最底部
 */
function setEditorContent(val: any) {
  monacoEditor?.setValue(val);
  scrollToBottom();
  emit('change', getEditorContent());
  emit('update:value', getEditorContent());
}

/**
 * 设置编辑器的代码标记链接
 * @param codeLen 代码标记链接
 */
function setEditorCodeLens(codeLen: languages.CodeLens) {
  state.codeLens.push(codeLen);
}

/**
 * 获取编辑器的代码标记链接
 */
function getEditorCodeLens(): languages.CodeLens[] {
  return state.codeLens;
}

/**
 * 清空编辑器的代码标记链接
 */
function clearEditorCodeLens() {
  state.codeLens = [];
}

/**
 * 设置编辑器快捷键事件
 * @param keybinding 关键字
 * @param options 参数
 */
function setEditorCommand(keybinding: number, fn: Function) {
  if (!monacoEditor) return null;
  const commandId = monacoEditor.addCommand(
    keybinding,
    () => {
      fn();
    },
    '',
  );
  if (!commandId) return null;
  state.commands.push(commandId);
  return commandId;
}
/**
 * 获取编辑器快捷键事件
 */
function getEditorCommand() {
  return state.commands;
}

/**
 * 获取编辑器的内容
 */
function getEditorContent() {
  return monacoEditor?.getValue();
}

/**
 * 获取编辑器实例
 */
function getEditor() {
  return monacoEditor!;
}

/**
 * 获取编辑器资源的标记
 */
function getEditorMarkers() {
  return monaco.editor.getModelMarkers({ resource: monacoEditor?.getModel()?.uri }) ?? [];
}

/**
 * 搜索
 */
function findByKeyword() {
  if (!monacoEditor) return;
  try {
    // 先聚焦编辑器
    monacoEditor.focus();

    // 从模型中获取要查找的字符串范围 new Range(startLineNumber, startColumn, endLineNumber, endColumn)
    monacoEditor.setSelection(new monaco.Range(1, 9999, 1, 10000));

    // 触发查找操作
    // this.editor.getAction('actions.find').run() // 查找方式一
    monacoEditor.trigger('', 'actions.find', ''); // 查找方式二
  } catch (error) {
    console.log(error);
  }
}
/**
 * 设置编辑器滚动到最顶部
 */
function scrollToTop() {
  monacoEditor?.setScrollPosition({ scrollTop: 0 });
}
/**
 * 设置编辑器滚动到最底部
 */
function scrollToBottom() {
  if (!monacoEditor) return;
  monacoEditor.revealLine(monacoEditor.getModel()!.getLineCount());
}
/**
 * 是否截断换行
 */
function setEditorWordWrap() {
  if (!monacoEditor) return;
  wordWrap.value = !wordWrap.value;
  if (wordWrap.value) {
    monacoEditor.updateOptions({ wordWrap: 'on' });
  } else {
    monacoEditor.updateOptions({ wordWrap: 'off' });
  }
}
/**
 * 切换白天或暗夜模式
 */
function setEditorTheme() {
  if (!monacoEditor) return;
  isThemeLightOrBlack.value = !isThemeLightOrBlack.value;
  if (isThemeLightOrBlack.value) {
    monacoEditor.updateOptions({ theme: 'vs' });
  } else {
    monacoEditor.updateOptions({ theme: 'vs-dark' });
  }
}

/**
 * 全屏切换
 */
function handleFullScreenClick() {
  if (!Editor.value.fullscreenElement) {
    Editor.value.requestFullscreen();
    fullScreen.value = true;
  } else {
    Editor.value.exitFullscreen();
    fullScreen.value = false;
  }
}

/**
 * 下载
 */
function handleDownloadLogClick() {
  exportFile(props.title, content.value);
}

/**
 * 下载日志
 */
function exportFile(name: string, data: any) {
  const url = window.URL || window.webkitURL || window;
  const blob = new Blob([data]);
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  const link: any = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
  link.href = url.createObjectURL(blob);
  link.download = name;
  link.dispatchEvent(event);
}

/**
 * 格式化代码
 */
function handleFormatCodeClick() {
  if (!monacoEditor) return;
  monacoEditor.getAction('editor.action.formatDocument').run(); // 自动格式化代码
  content.value = getEditorContent() ?? '';
}
/** 清空 */
function handleClearClick() {
  setEditorContent('');
}

function dispose() {
  if (monacoEditor) {
    provider.value.dispose();
    codeLensProvider.value.dispose();
    monacoEditor.dispose();
  }
}
onMounted(() => {
  init();
});

onUnmounted(() => {
  dispose();
});

defineExpose({
  setEditorContent,
  getEditorContent,
  getEditorMarkers,
  setEditorCodeLens,
  getEditorCodeLens,
  clearEditorCodeLens,
  setEditorCommand,
  getEditorCommand,
  getEditor,
  scrollToTop,
  scrollToBottom,
  setEditorWordWrap,
  setEditorTheme,
  handleFullScreenClick,
  handleDownloadLogClick,
});
</script>

<style lang="less" scoped>
.m-e {
  width: 100%;
  height: 100%;
  .m-e-main {
    display: flex;
    flex-direction: column;
    width: calc(100% - 2px);
    height: calc(100% - 2px);

    .m-e-main_toolbar {
      position: relative;
      z-index: 99;
      height: 40px;
      box-shadow: 0px 2px 5px #000;

      .m-e-main_toolbar_left {
        display: flex;
        align-items: center;
        span {
          padding-left: 10px;
          font-size: 15px;
          user-select: none;
        }
      }

      .m-e-main_toolbar_right {
        display: flex;
        align-items: center;
        margin-right: 10px;

        .icon {
          display: inline-block;
          margin-left: 4px;
          padding: 4px;
          font-size: 16px;
          border-radius: 2px;
          text-align: center;
          transition: ease all 0.3s;
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }

    .m-e-main_container {
      flex: 1;
      height: 100%;
      min-height: 360px;
    }
  }
}
</style>
