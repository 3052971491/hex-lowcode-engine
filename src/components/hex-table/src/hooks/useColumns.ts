import { ComputedRef, Ref, computed, ref, toRaw, unref, watch } from 'vue';
import { cloneDeep, isEqual } from 'lodash-es';
import { isArray, isBoolean, isFunction, isString } from '/@/utils/is';
import { DataIndex } from 'ant-design-vue/es/vc-table/interface';
import { dateUtil } from '../utils';
import { BasicColumn, BasicTableProps, CellFormat, GetColumnsParams, Recordable } from '../types/table';
import { ACTION_COLUMN_FLAG, INDEX_COLUMN_FLAG } from '../../const';

function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = [];
  const fixedRightColumns: BasicColumn[] = [];
  const defColumns: BasicColumn[] = [];

  columns.forEach((column) => {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
      return;
    }
    if (column.fixed === 'right') {
      fixedRightColumns.push(column);
      return;
    }
    defColumns.push(column);
  });
  return [...fixedLeftColumns, ...defColumns, ...fixedRightColumns].filter((item) => !item.defaultHidden);
}
export function formatCell(text: string, format: CellFormat, record: Recordable, index: number) {
  if (!format) {
    return text;
  }
  if (isFunction(format)) {
    return format(text, record, index);
  }

  try {
    // date type
    const DATE_FORMAT_PREFIX = 'date|';
    if (isString(format) && format.startsWith(DATE_FORMAT_PREFIX)) {
      const dateFormat = format.replace(DATE_FORMAT_PREFIX, '');
      if (!dateFormat) {
        return text;
      }
      return dateUtil.formatToDate(text, dateFormat);
    }
  } catch (error) {
    return text;
  }
  return text;
}
export default function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  // getPaginationRef: ComputedRef<boolean | PaginationProps>
) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns?.filter((item) => !item.flag) ?? [];
    },
  );

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));
    if (!columns) {
      return [];
    }
    return columns;
  });

  /** 是否显示 */
  function isIfShow(column: BasicColumn): boolean {
    const { ifShow } = column;

    let show = true;

    if (isBoolean(ifShow)) {
      show = ifShow;
    }
    if (isFunction(ifShow)) {
      show = ifShow(column);
    }
    return show;
  }

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const columns = cloneDeep(viewColumns);

    if (propsRef.value.actionColumn) {
      columns.push(unref(propsRef.value.actionColumn));
    }
    return columns
      .filter((column) => {
        // 缺少一个权限过滤
        return isIfShow(column);
      })
      .map((column) => {
        const { format, dataIndex } = column;
        if (format && dataIndex) {
          column.render = (data) => {
            return formatCell(data.record[dataIndex as number], format, data.record, data.rowIndex);
          };
        }
        return column;
      });
  });

  function setCacheColumnsByField(dataIndex: string | undefined, value: Partial<BasicColumn>) {
    if (!dataIndex || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.dataIndex === dataIndex) {
        Object.assign(item, value);
      }
    });
  }

  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: Partial<BasicColumn>[] | string[]) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];

    const cacheKeys = cacheColumns.map((item) => item.dataIndex);

    if (!isString(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = columns as DataIndex[];
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(item?.dataIndex ?? ''),
        });
      });
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return columnKeys.indexOf(prev.dataIndex as string) - columnKeys.indexOf(next.dataIndex as string);
        });
      }
      columnsRef.value = newColumns;
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG);
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG);
    }

    if (sort) {
      columns = sortFixedColumn(columns);
    }

    return columns;
  }

  function getCacheColumns() {
    return cacheColumns;
  }
  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns,
    setCacheColumnsByField,
  };
}
