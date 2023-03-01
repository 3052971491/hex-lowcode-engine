<template>
  <div class="action-pane-library">
    <a-skeleton active :loading="loading">
      <div>
        <span>
          <a-typography-link href="#" target="_blank"> 使用帮助 </a-typography-link>
        </span>
        <a-divider type="vertical" />
        <a-popconfirm
          placement="bottomLeft"
          :show-cancel="false"
          :destroy-tooltip-on-hide="true"
          :arrow-point-at-center="true"
        >
          <template #icon></template>
          <template #okButton></template>
          <template #title>
            <div class="action-pane-marker">
              <div class="action-pane-marker-list-title">
                <div class="message">错误信息</div>
                <div class="position">位置</div>
              </div>
              <div class="action-pane-marker-list">
                <div v-if="state.markers.length < 1" class="action-pane-marker-list-item">无</div>
                <div v-for="(item, index) in state.markers" :key="index" class="action-pane-marker-list-item">
                  <div class="action-pane-marker-list-message">
                    <a-typography-text type="danger">{{ item.message }}</a-typography-text>
                  </div>
                  <div class="action-pane-marker-list-position">
                    <a-typography-text type="success">
                      {{ item.startLineNumber }} - {{ item.startColumn }}
                    </a-typography-text>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <span class="cursor-pointer"
            ><a-typography-text :type="state.markers.length < 1 ? 'default' : 'danger'"
              >语法检查</a-typography-text
            ></span
          >
        </a-popconfirm>

        <a-divider type="vertical" />
        <span class="cursor-pointer" @click="resetReferenceCount">重置引用计数</span>
      </div>
      <hex-monaco-editor
        ref="monaco"
        v-model:value="content"
        :theme="Theme.DEFAULT"
        @change="onDidChangeEditorText"
        @on-code-len-click="onCodeLenClick"
        @editor-mounted="onEditorMounted"
      />
    </a-skeleton>
  </div>
</template>

<script lang="ts" setup>
import { editor, languages } from 'monaco-editor/esm/vs/editor/editor.api';
import { computed, inject, onMounted, ref, nextTick, reactive } from 'vue';
import { HexCoreInjectionKey } from '/@/engine/render/render-inject-key';
import HexMonacoEditor from '/@/components/hex-monaco-editor/index.vue';
import { Theme } from '/@/components/hex-monaco-editor/useMonacoEditor';
import { StringParsedToFunction } from '/@/utils/func';
import { cloneDeep } from 'lodash-es';

const core = inject(HexCoreInjectionKey);

const loading = ref(true);

const state = reactive<{
  markers: editor.IMarker[];
}>({
  markers: [],
});

const str = ref('');

const content = computed({
  set(val: string) {
    str.value = val;
  },
  get() {
    return cloneDeep(core?.state.projectConfig?.originCode ?? '');
  },
});

const monaco = ref<InstanceType<typeof HexMonacoEditor>>();

/**
 * 全量代码 转换
 */
const jsConversion = () => {
  const val = core?.state.projectConfig?.originCode ?? '';
  const obj = StringParsedToFunction(val, null);

  nextTick(() => {
    if (core?.state.projectConfig) {
      core.state.projectConfig.methods = obj;
    }
    core?.saveHistoryDataStorage();
  });
};

const onDidChangeEditorText = () => {
  state.markers = monaco.value?.getEditorMarkers()!;

  if (state.markers.length < 1) {
    if (core?.state.projectConfig) {
      core.state.projectConfig.originCode = str.value;
    }
    jsConversion();
  }
  resetReferenceCount();
};

const onCodeLenClick = (val: any) => {
  console.log('我被点击了: ', val);
};

const onEditorMounted = () => {
  registerCodeLens(['isNil']);
};

function registerCodeLens(list: any[]) {
  monaco.value?.clearEditorCodeLens();
  list.forEach((item) => {
    if (!monaco.value) return;
    const codeLens = monaco.value.getEditorCodeLens();
    const idx = codeLens.findIndex((i) => {
      return i.id === item;
    });
    let count = 0;
    list.forEach((i) => {
      if (i === item) {
        count++;
      }
    });
    if (idx === -1) {
      count = 1;
      const commandId = monaco.value.setEditorCommand(0, () => {
        onCodeLenClick(item);
      });
      const endColumn = monaco.value.getEditor().getModel()?.getLineCount() ?? 999;
      const matches = monaco.value.getEditor().getModel()?.findMatches(
        item,
        {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: endColumn,
          endColumn,
        },
        false,
        true,
        item,
        true,
      );
      if (matches && matches.length > 0) {
        const lense: languages.CodeLens = {
          range: matches[0].range,
          id: item,
          command: {
            id: commandId ?? '',
            title: `共计有 ${count} 处引入`,
          },
        };
        monaco.value?.setEditorCodeLens(lense);
      }
    } else if (codeLens[idx].command) {
      codeLens[idx].command = {
        id: codeLens[idx].command?.id ?? '',
        title: `共计有 ${count} 处引入`,
      };
    }
  });
}

const resetReferenceCount = () => {
  registerCodeLens(['isNil', 'isNil']);
  // monaco.value?.getEditor()?.focus();
};

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 180);
});
</script>

<style lang="less" scoped>
.action-pane-marker {
  .action-pane-marker-list-title {
    display: flex;
    padding: 8px 15px;
    border-bottom: 1px solid #eee;

    .message {
      width: 300px;
    }
  }
  .action-pane-marker-list {
    overflow: auto;
    max-height: 250px;
    font-weight: 400;

    .action-pane-marker-list-item {
      display: flex;
      padding: 8px 15px;
      border-bottom: 1px solid #eee;
      .action-pane-marker-list-message {
        width: 300px;
      }
    }
  }
}
</style>
