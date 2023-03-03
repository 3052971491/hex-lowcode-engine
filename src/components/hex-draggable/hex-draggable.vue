<template>
  <div class="hex-draggable w-full h-full">
    <draggable
      v-bind="option"
      v-model="modelValue"
      class="draggable h-full"
      @start="start"
      @add="add"
      @remove="remove"
      @update="update"
      @end="end"
      @sort="sort"
      @choose="choose"
      @unchoose="unchoose"
    >
      <template #item="{ element, index }">
        <div class="draggable-item w-full">
          <slot :key="element[props.itemKey]" name="item" :element="element" :index="index"></slot>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import draggable from 'vuedraggable';
import { HexDraggable } from './hex-draggable';

interface Props {
  /** 数据对象 */
  value: any[];
  /** 分组名称 */
  groupName?: string;
  /** 是否允许拖入当前组 */
  pull?: boolean | string | 'clone';
  /** 是否允许拖出当前组 */
  put?: boolean | string | 'clone';
  /** 设置draggable标签解析html标签 */
  tag?: string;
  /** 唯一标识 */
  itemKey?: string;
  /** 过渡效果时间 */
  animation?: number;
  /** 只有当鼠标移动到css为mover类的元素上才能拖动 */
  handle?: string;
  /** 设置拖动元素的占位符类名 */
  ghostClass?: string;
  /** 是否开启当前分组排序 */
  sort?: boolean;
  /** 自定义控制元素是否允许拖拽 */
  move?: Function;
  /** 从一个数组拖拽到另外一个数组时触发的事件和add不同，clone是复制了数组元素 */
  clone?: Function;
}

const props = withDefaults(defineProps<Props>(), {
  value: (): any[] => [],
  groupName: 'engine-group',
  pull: true,
  put: true,
  tag: 'div',
  itemKey: 'id',
  animation: 300,
  handle: 'hex-draggable-handle',
  ghostClass: 'ghost',
  sort: true,
  move: (e: any, originalEvent: any) => {
    return true;
  },
  clone: (original: any) => {
    return original;
  },
});

const emit = defineEmits([
  'update:value',
  'change',
  'add',
  'start',
  'end',
  'update',
  'remove',
  'sort',
  'choose',
  'unchoose',
]);

/** 配置 */
const option = reactive<HexDraggable.Options>({
  group: {
    name: props.groupName,
    pull: props.pull,
    put: props.put,
  },
  tag: props.tag,
  itemKey: props.itemKey,
  animation: props.animation,
  componentData: {
    name: 'fade',
  },
  handle: `.${props.handle}`,
  ghostClass: props.ghostClass,
  sort: props.sort,
  move: props.move,
  clone: props.clone,
});

const modelValue = computed({
  get() {
    return props.value ? props.value : [];
  },
  set(val) {
    emit('update:value', val);
    emit('change', val);
  },
});

/**	从一个数组拖拽到另外一个数组时触发的事件 */
const add = (evt: any) => {
  emit('add', evt);
};
/** 开始拖动时触发的事件 */
const start = (evt: any) => {
  emit('start', evt);
};
/** 拖拽完成时的事件 */
const end = () => {
  emit('end');
};
/** 拖拽变换位置时触发的事件 */
const update = (evt: any) => {
  emit('update', evt);
};
/** 移除事件 */
const remove = (evt: any) => {
  emit('remove', evt);
};
/** 位置变化时的事件 */
const sort = () => {
  emit('sort');
};
/** 鼠标点击选中要拖拽元素时的事件 */
const choose = () => {
  emit('choose');
};
/** 选中后松开鼠标的事件 */
const unchoose = () => {
  emit('unchoose');
};
</script>
<style lang="less" scoped>
@import '/@/components/hex-draggable/hex-draggable.less';
</style>
