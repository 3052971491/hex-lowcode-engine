import { computed, reactive, unref } from 'vue';
import { GridRow, GridCol, Grid } from '/@/schema/common/schema';

interface Props {
  value: Grid;
  disabled?: boolean;
}
export function useFeatures(data: GridRow[], op: Props) {
  const state = reactive<{
    cells: GridCol[];
  }>({
    /** 选中单元格 */
    cells: [],
  });

  /**
   * 标准单元格
   * @description 规则: 左上角(最小列位置，最小行位置)单元格, 以该单元格为基准进行合并
   */
  const standardCell = computed((): GridCol | null => {
    if (state.cells.length < 1) return null;
    let result: GridCol | null = null;
    state.cells.forEach((current) => {
      if (!result || current.props.colIndex < result.props.colIndex || current.props.rowIndex < result.props.rowIndex) {
        result = current as any;
      }
    });
    return result;
  });

  /**
   * 是否允许合并
   */
  const isAllowMerge = computed(() => {
    // 1、选中单元格必须大于1;
    if (state.cells.length < 2) return false;
    const hasSpanCell = state.cells.some(({ props }) => props.rowSpan > 1 || props.colSpan > 1);
    // 2、选中单元格中不允许有已合并单元格;
    if (hasSpanCell) return false;

    // 3、选中单元格不是规则矩形不允许合并
    const isRectangle = state.cells.some((item) => {
      return (item.rowEnd() - item.rowStart()) * (item.colEnd() - item.colStart()) !== state.cells.length;
    });
    if (!isRectangle) return false;

    return true;
  });

  /**
   * 是否存在跨列或者跨行
   * @description 如果有则不允许合并
   */
  const hasOverColorRow = computed(() => {
    const { colStart, colEnd, rowStart, rowEnd } = state.cells.reduce(
      (acc, current) => ({
        colStart: Math.min(acc.colStart, current.colStart()),
        colEnd: Math.max(acc.colEnd, current.colEnd()),
        rowStart: Math.min(acc.rowStart, current.rowStart()),
        rowEnd: Math.max(acc.rowEnd, current.rowEnd()),
      }),
      {
        colStart: Infinity,
        colEnd: -Infinity,
        rowStart: Infinity,
        rowEnd: -Infinity,
      },
    );
    if (state.cells.length !== (rowEnd - rowStart) * (colEnd - colStart)) {
      return false;
    }
    return true;
  });

  /** 选中单元格都是同一行 */
  function isSelectOnlyRows() {
    if (!standardCell.value) return false;
    const { rowIndex } = standardCell.value.props;
    return !state.cells.some((item) => item.props.rowIndex !== rowIndex);
  }

  /** 选中单元格都是同一列 */
  function isSelectOnlyCols() {
    if (!standardCell.value) return false;
    const { colIndex } = standardCell.value.props;
    return !state.cells.some((item) => item.props.colIndex !== colIndex);
  }

  function clear() {
    state.cells = [];
  }

  /**
   * 合并单元格
   * @method
   */
  function merge() {
    // 禁用模式不允许合并
    if (op.disabled) return;
    if (!unref(isAllowMerge)) return;
    if (!unref(hasOverColorRow)) return;
    if (!standardCell.value) return;
    const { props } = standardCell.value;
    const colSpan = state.cells
      .filter((item) => item.props.rowIndex === props.rowIndex)
      .reduce((result, current) => {
        result += current.props.colSpan;
        return result;
      }, 0);
    const rowSpan = state.cells
      .filter((item) => item.props.colIndex === props.colIndex)
      .reduce((result, current) => {
        result += current.props.rowSpan;
        return result;
      }, 0);
    state.cells.forEach((item) => {
      const { rowIndex, colIndex } = item.props;
      const targetCelProps = data[rowIndex].children?.[colIndex].props ?? null;
      if (!targetCelProps || !standardCell.value) return;
      targetCelProps.merged = standardCell.value.id !== item.id;
      targetCelProps.selected = false;
      if (isSelectOnlyRows()) {
        // 情况一: 只选中了某一行的单元格
        targetCelProps.colSpan = colSpan;
      } else if (isSelectOnlyCols()) {
        // 情况二: 只选中了某一列的单元格
        targetCelProps.rowSpan = rowSpan;
      } else if (!isSelectOnlyRows() && !isSelectOnlyCols()) {
        // 情况三: 行和列的单元格皆有选中
        targetCelProps.colSpan = colSpan;
        targetCelProps.rowSpan = rowSpan;
      }
    });
    clear();
  }

  /**
   * 拆分单元格
   * @method
   */
  function split() {
    // 禁用模式不允许拆分
    if (op.disabled) return;
    state.cells.map((item) => {
      const { rowIndex, colIndex } = item.props;
      const targetCelProps = data[rowIndex].children?.[colIndex].props ?? null;
      if (!targetCelProps) return;
      // 需要拆分的单元格
      if (item.props.colSpan > 1 || item.props.rowSpan > 1) {
        for (let i = 0; i < item.props.rowSpan; i++) {
          for (let j = 0; j < item.props.colSpan; j++) {
            const target = data[item.props.rowIndex + i].children?.[item.props.colIndex + j].props ?? null;
            if (!target) return;
            target.merged = false;
            target.rowSpan = 1;
            target.colSpan = 1;
            target.selected = false;
          }
        }
      } else {
        targetCelProps.selected = false;
      }
      return null;
    });
    clear();
  }

  /**
   * 切换单元格为选中状态
   * @method
   */
  function setSelected(cell: GridCol) {
    // 禁用模式不允许选中
    if (op.disabled) return;
    // 当children有值时不允许被选中
    if (cell.children && cell.children?.length > 0) return;
    cell.props.selected = !cell.props.selected;
    const idx = state.cells.findIndex((item) => item.id === cell.id);
    if (idx !== -1) {
      state.cells.splice(idx, 1);
    } else {
      state.cells.push(cell as any);
    }
  }

  return {
    merge,
    split,
    setSelected,
  };
}
