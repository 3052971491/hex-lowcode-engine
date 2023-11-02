import type { EventBusKey } from '@vueuse/core';
import { OperateType } from '/@/components/hex-cell/useFeatures';

/** 单元格操作: 新增、删除、合并、拆分 */
export const gridOperateKey: EventBusKey<{ id: string; name: OperateType }> = Symbol('grid-operate');
export const gridInstanceKey: EventBusKey<any> = Symbol('grid-instance');
