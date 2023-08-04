<template>
  <div :class="['basic-table-action', getAlign]" @click.stop="onCellClick">
    <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
      <!-- 当有tooltip时 -->
      <a-tooltip v-if="action.tooltip" v-bind="getTooltip(action.tooltip)">
        <!-- 当有tooltip时, 且有popconfirm时 -->
        <a-popconfirm v-if="action.popConfirm" v-bind="action.popConfirm">
          <a-button v-if="action.label" type="text">
            <template v-if="action.icon" #icon>
              <component :is="action.icon"></component>
            </template>
            {{ action.label }}
          </a-button>
        </a-popconfirm>
        <template v-else>
          <a-button v-if="action.label" type="text" @click.stop="action.onClick">
            <template v-if="action.icon" #icon>
              <component :is="action.icon"></component>
            </template>
            {{ action.label }}
          </a-button>
        </template>
      </a-tooltip>
      <!-- 当仅有tooltip时 -->
      <a-popconfirm v-else-if="action.popConfirm" v-bind="action.popConfirm">
        <a-button v-if="action.label" type="text">
          <template v-if="action.icon" #icon>
            <component :is="action.icon"></component>
          </template>
          {{ action.label }}
        </a-button>
      </a-popconfirm>
      <!-- 无tooltip和popconfirm -->
      <template v-else>
        <a-button v-if="action.label" type="text" @click.stop="action.onClick">
          <template v-if="action.icon" #icon>
            <component :is="action.icon"></component>
          </template>
          {{ action.label }}
        </a-button>
      </template>
      <ADivider v-if="divider && index < getActions.length - 1" type="vertical" class="action-divider" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Ref, computed, ref, toRaw, unref } from 'vue';
// eslint-disable-next-line import/no-cycle
import { ActionItem, TableActionType } from '/@/components/hex-table';
import { isBoolean, isFunction } from '/@/utils/is';
import { cloneDeep, isArray } from 'lodash-es';
import { ACTION_COLUMN_FLAG } from '../../const';

interface Prop {
  actions?: ActionItem[];
  dropDownActions?: ActionItem[];
  divider?: boolean;
  outside?: boolean;
  stopButtonPropagation?: boolean;
}
const props = withDefaults(defineProps<Prop>(), {
  actions: () => [],
  dropDownActions: () => [],
  divider: true,
  outside: false,
  stopButtonPropagation: false,
});
const table: Partial<TableActionType> = {};

const actionsRef = ref(unref(props).actions) as unknown as Ref<ActionItem[]>;

/** 是否显示 */
function isIfShow(action: ActionItem): boolean {
  const { ifShow } = action;

  let show = true;

  if (isBoolean(ifShow)) {
    show = ifShow;
  }
  if (isFunction(ifShow)) {
    show = ifShow(action);
  }
  return show;
}

const hasPermission = computed(() => {
  return true;
});
const getActions = computed(() => {
  return (actionsRef.value || [])
    .filter((action) => {
      return hasPermission.value && isIfShow(action);
    })
    .map((action) => {
      const { popConfirm } = action;
      return {
        onClick: () => {},
        getPopupContainer: () => unref((table as any)?.wrapRef.value) ?? document.body,
        type: 'text',
        size: 'small',
        ...action,
        ...(popConfirm || {}),
        enable: !!popConfirm,
      };
    });
});

// const getDropdownList = computed((): any[] => {
//   return (toRaw(props.dropDownActions) || [])
//     .filter((action) => {
//       return hasPermission(action.auth) && isIfShow(action);
//     })
//     .map((action, index) => {
//       const { label, popConfirm } = action;
//       return {
//         ...action,
//         ...popConfirm,
//         onConfirm: popConfirm?.confirm,
//         onCancel: popConfirm?.cancel,
//         text: label,
//         divider:
//           index < props.dropDownActions.length - 1 ? props.divider : false,
//       };
//     });
// });

const getAlign = computed(() => {
  const columns = (table as TableActionType)?.getColumns?.() || [];
  const actionColumn = columns.find((item) => item.flag === ACTION_COLUMN_FLAG);
  return actionColumn?.align ?? 'center';
});

function getTooltip(data: string | any): any {
  return {
    getPopupContainer: () => unref((table as any)?.wrapRef.value) ?? document.body,
    position: 'top',
    content: data,
  };
}

function onCellClick(e: MouseEvent) {
  if (!props.stopButtonPropagation) return;
  const path = e.composedPath() as HTMLElement[];
  const isInButton = path.find((ele) => {
    return ele.tagName?.toUpperCase() === 'BUTTON';
  });
  if (isInButton) {
    e.stopPropagation();
  }
}

function setActions(actions: ActionItem[]) {
  const columns = cloneDeep(actions);
  if (!isArray(columns)) return;

  if (columns.length <= 0) {
    actionsRef.value = [];
  }

  actionsRef.value = columns;
}

defineExpose({ setActions });
</script>

<style lang="less">
.basic-table-action {
  display: flex;
  align-items: center;

  .action-divider {
    display: table;
  }

  &.left {
    justify-content: flex-start;
  }

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .ant-btn {
    padding: 0 4px;
    height: auto;
    border-width: 0;
  }
}
</style>
