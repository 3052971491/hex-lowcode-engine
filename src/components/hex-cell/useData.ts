import { GridCol, GridRow } from '/@/schema/common/schema';

export function useData() {
  /**
   * 生成单元格
   * @param rowNumber 几行
   * @param colNumber 几列
   * @returns
   */
  function build(rowNumber: number, colNumber: number) {
    const result: GridRow[] = [];
    for (let i = 0; i < rowNumber; i++) {
      const row = new GridRow();
      row.children = [];
      for (let j = 0; j < colNumber; j++) {
        const col = new GridCol();
        col.props.rowIndex = i;
        col.props.colIndex = j;
        row.children.push(col);
      }
      result.push(row);
    }
    return result;
  }

  return {
    build,
  };
}
