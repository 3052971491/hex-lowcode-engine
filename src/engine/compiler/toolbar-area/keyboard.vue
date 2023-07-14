<template>
  <div class="shortcuts-control">
    <div class="shortcuts-control-content-item">
      <div class="item-title">
        <div class="item-title-wrap">{{ t('el.regularOperation') }}</div>
      </div>
      <div class="item-content">
        <div v-for="(item, index) in regularOperation" :key="index" class="item-li">
          <div class="item-li-left">{{ t(item.label) }}</div>
          <div class="item-li-right">
            <div v-for="i in item.value" :key="i" class="li-btn">{{ i }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="shortcuts-control-content-item">
      <div class="item-title">
        <div class="item-title-wrap">{{ t('el.componentOperation') }}</div>
      </div>
      <div class="item-content">
        <div v-for="(item, index) in componentOperation" :key="index" class="item-li">
          <div class="item-li-left">{{ t(item.label) }}</div>
          <div class="item-li-right">
            <div v-for="i in item.value" :key="i" class="li-btn">{{ i }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '/@/hooks/use-loacle';

const { t } = useLocale();
const regularOperation = [
  {
    label: 'el.control.save',
    value: ['Ctrl', 'S'],
  },
  //   {
  //     label: '预览',
  //     value: ['Ctrl', 'P'],
  //   },
  {
    label: 'el.copyComponent',
    value: ['Ctrl', 'C'],
  },
  {
    label: 'el.pasteComponent',
    value: ['Ctrl', 'V'],
  },
  //   {
  //     label: '剪切组件',
  //     value: ['Ctrl', 'X'],
  //   },
  {
    label: 'el.deleteComponent',
    value: ['Delete'],
  },
];
const componentOperation = [
  {
    label: 'el.selectParentNode',
    value: ['↑'],
  },
  {
    label: 'el.selectChildrenNode',
    value: ['↓'],
  },
  {
    label: 'el.selectSiblingNodeToRight',
    value: ['→'],
  },
  {
    label: 'el.selectSiblingNodeToLeft',
    value: ['←'],
  },
];
</script>

<style lang="less" scoped>
.shortcuts-control {
  display: flex;

  &-content-item {
    flex: 1;
    margin: 0 0 10px;

    &:nth-child(2n) {
      margin-left: 10px;
    }

    &:nth-child(2n + 1) {
      margin-right: 10px;
    }

    .item-title {
      margin-bottom: 6px;
      height: 32px;
      border-bottom: 1px solid rgba(31, 56, 88, 0.1);

      .item-title-wrap {
        padding: 0 6px;
        line-height: 32px;
      }
    }

    .item-content {
      overflow-x: auto;
      .item-li {
        display: flex;
        justify-content: space-between;
        min-height: 24px;
        flex-wrap: nowrap;
        font-size: 12px;

        .item-li-left {
          display: flex;
          align-items: center;
          padding: 0 6px;
          height: 34px;
        }

        .item-li-right {
          display: flex;
          align-items: center;
          padding: 6px 0;
          white-space: nowrap;

          > .li-btn {
            margin: 0 2px;
            padding: 0 7px;
            min-width: 12px;
            height: 22px;
            border: 1px solid rgba(31, 56, 88, 0.3);
            border-radius: 3px;
            text-align: center;
            color: rgba(31, 56, 88, 0.6);
            background: #fff;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
