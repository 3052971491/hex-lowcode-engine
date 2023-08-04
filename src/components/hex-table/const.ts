const componentSetting = {
  table: {
    pageSizeOptions: [10, 50, 80, 100],
    defaultPageSize: 10,
  },
  // support xxx.xxx.xxx
  fetchSetting: {
    // 传递给后台的当前页面的字段名
    pageField: 'pageNum',
    // 在后台显示的每个页面的数字字段名称
    sizeField: 'pageSize',
    // 接口返回的表单数据的字段名
    listField: 'content',
    // 接口字段名返回的表总数
    totalField: 'totalPages',
  },
};
const { table, fetchSetting } = componentSetting;

const { pageSizeOptions, defaultPageSize } = table;

/**
 * 表格行 key 的取值字段
 * @description 表格行 key 的取值字段
 */
export const ROW_KEY = 'key';

export const NO_KEY = 'no';

/**
 * 分页-数据条数选择器的选项列表
 * @description
 */
export const PAGE_SIZE_OPTIONS = pageSizeOptions;

/**
 * 分页-每页展示的数据条数
 * @description
 */
export const PAGE_SIZE = defaultPageSize;

// // Common interface field settings
export const FETCH_SETTING = fetchSetting;

// // Default Size
// export const DEFAULT_SIZE = defaultSize;

// // Configure general sort function
// export const DEFAULT_SORT_FN = defaultSortFn;

// export const DEFAULT_FILTER_FN = defaultFilterFn;

/**
 * 表格单元格的默认布局
 */
export const DEFAULT_ALIGN = 'center';

export const INDEX_COLUMN_FLAG = 'INDEX';

export const ACTION_COLUMN_FLAG = 'ACTION';
