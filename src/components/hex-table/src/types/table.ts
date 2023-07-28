import type { RenderFunction, VNodeChild } from 'vue';
import { PaginationProps, TableColumnType } from 'ant-design-vue';
import { TableRowSelection } from 'ant-design-vue/es/table/interface';
import { Fn } from './index';

// eslint-disable-next-line no-undef
export type VueNode = VNodeChild | JSX.Element;
export type Recordable<T = any> = Record<string, T>;
export type EmitType = (e: any, ...args: any[]) => void;

export interface FetchParams {
  searchInfo?: Recordable;
  page?: number;
  sortInfo?: Recordable;
  filterInfo?: Recordable;
}

/** 表格设置 */
export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  fullScreen?: boolean;
}

export interface FetchSetting {
  // 请求接口当前页数
  pageField: string;
  // 每页显示多少条
  sizeField: string;
  // 请求结果列表字段  支持 a.b.c
  listField: string;
  // 请求结果总数字段  支持 a.b.c
  totalField: string;
}

export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;

/** 表格列配置 */
export interface BasicColumn extends TableColumnType {
  // children?: BasicColumn[];
  // filters?: {
  //   text: string;
  //   value: string;
  //   children?:
  //     | unknown[]
  //     | (((props: Record<string, unknown>) => unknown[]) &
  //         (() => unknown[]) &
  //         (() => unknown[]));
  // }[];

  /**
   * 标记
   */
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION';
  /**
   * 自定义标题
   */
  customTitle?: string | RenderFunction;

  slots?: Recordable;

  render?: (data: { record: any; column: TableColumnType; rowIndex: number }) => VNodeChild;

  /**
   * 是否默认隐藏列，可在列配置中显示
   */
  defaultHidden?: boolean;

  // Help text for table column header
  // helpMessage?: string | string[];

  format?: CellFormat;
  customRender?: any;

  // Editable
  // edit?: boolean;
  // editRow?: boolean;
  // editable?: boolean;
  //   editComponent?: ComponentType;
  // editComponentProps?: Recordable;
  // editRule?: boolean | ((text: string, record: Recordable) => Promise<string>);
  // editValueMap?: (value: any) => string;
  // onEditRow?: () => void;
  // 权限编码控制是否显示
  //   auth?: RoleEnum | RoleEnum[] | string | string[];
  /**
   * 业务控制是否显示
   */
  ifShow?: boolean | ((column: BasicColumn) => boolean);
}

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  sort?: boolean;
}

export interface BasicTableProps {
  /** 点击行是否选中 checkbox 或者 radio。需要开启 */
  clickToRowSelect?: boolean;
  isTreeTable?: boolean;
  // 自定义排序方法
  // sortFn?: (sortInfo: SorterResult) => any;
  // 排序方法
  // filterFn?: (data: Partial<Recordable<string[]>>) => any;
  // 取消表格的默认padding
  // inset?: boolean;
  /** 显示表格设置 */
  showTableSetting?: boolean;
  /** 表格设置 */
  tableSetting?: TableSetting;
  /**
   * 斑马纹
   */
  stripe?: boolean;
  // 是否自动生成key
  autoCreateKey?: boolean;
  // 计算合计行的方法
  // summaryFunc?: (...arg: any) => Recordable[];
  // 自定义合计表格内容
  // summaryData?: Recordable[];
  // 是否显示合计行
  // showSummary?: boolean;
  /**
   * 是否可拖拽列
   */
  canColDrag?: boolean;
  /** 接口请求对象 */
  api?: (...arg: any) => Promise<any>;
  /** 请求之前处理参数 */
  beforeFetch?: Fn;
  /** 自定义处理接口返回参数 */
  afterFetch?: Fn;
  /** 查询条件请求之前处理 */
  handleSearchInfoFn?: Fn;
  /** 请求接口配置 */
  fetchSetting?: Partial<FetchSetting>;
  /** 立即请求接口 */
  immediate?: boolean;
  /** 在开起搜索表单的时候，如果没有数据是否显示表格 */
  emptyDataIsShowTable?: boolean;
  /** 额外的请求参数 */
  searchInfo?: Recordable;
  /** 默认的排序参数 */
  defSort?: Recordable;
  /** 列配置 */
  columns: BasicColumn[];
  // 是否显示序号列
  // showIndexColumn?: boolean;
  // 序号列配置
  // indexColumnProps?: BasicColumn;
  /** 操作列配置 */
  actionColumn?: BasicColumn;
  // 文本超过宽度是否显示。。。
  // ellipsis?: boolean;
  // 是否可以自适应高度
  // canResize?: boolean;
  // 自适应高度偏移， 计算结果-偏移量
  // resizeHeightOffset?: number;

  // 在分页改变的时候清空选项
  // clearSelectOnPageChange?: boolean;
  //
  rowKey?: string | ((record: Recordable) => string);
  // 数据
  // dataSource?: Recordable[];
  // 标题右侧提示
  // titleHelpMessage?: string | string[];
  // 表格滚动最大高度
  // maxHeight?: number;
  /** 是否显示表格边框 */
  bordered?: boolean;
  /** 分页配置 */
  pagination?: PaginationProps | boolean;
  /** loading加载 */
  loading?: boolean;

  // /**
  //  * The column contains children to display
  //  * @default 'children'
  //  * @type string | string[]
  //  */
  // childrenColumnName?: string;

  // /**
  //  * Override default table elements
  //  * @type object
  //  */
  // components?: object;

  // /**
  //  * Expand all rows initially
  //  * @default false
  //  * @type boolean
  //  */
  // defaultExpandAllRows?: boolean;

  // /**
  //  * Initial expanded row keys
  //  * @type string[]
  //  */
  // defaultExpandedRowKeys?: string[];

  // /**
  //  * Current expanded row keys
  //  * @type string[]
  //  */
  // expandedRowKeys?: string[];

  // /**
  //  * Expanded container render for each row
  //  * @type Function
  //  */
  // expandedRowRender?: (
  //   record?: ExpandedRowRenderRecord<T>
  // ) => VNodeChild | JSX.Element;

  // /**
  //  * Customize row expand Icon.
  //  * @type Function | VNodeChild
  //  */
  // expandIcon?: Function | VNodeChild | JSX.Element;

  // /**
  //  * Whether to expand row by clicking anywhere in the whole row
  //  * @default false
  //  * @type boolean
  //  */
  // expandRowByClick?: boolean;

  // /**
  //  * The index of `expandIcon` which column will be inserted when `expandIconAsCell` is false. default 0
  //  */
  // expandIconColumnIndex?: number;

  // /**
  //  * Table footer renderer
  //  * @type Function | VNodeChild
  //  */
  // footer?: Function | VNodeChild | JSX.Element;

  // /**
  //  * Indent size in pixels of tree data
  //  * @default 15
  //  * @type number
  //  */
  // indentSize?: number;

  // /**
  //  * i18n text including filter, sort, empty text, etc
  //  * @default { filterConfirm: 'Ok', filterReset: 'Reset', emptyText: 'No Data' }
  //  * @type object
  //  */
  // locale?: object;

  // /**
  //  * Row's className
  //  * @type Function
  //  */
  // rowClassName?: (record: TableCustomRecord<T>, index: number) => string;

  /** 行选择配置 */
  rowSelection?: TableRowSelection;

  /**
   * Set horizontal or vertical scrolling, can also be used to specify the width and height of the scroll area.
   * It is recommended to set a number for x, if you want to set it to true,
   * you need to add style .ant-table td { white-space: nowrap; }.
   * @type object
   */
  scroll?: { x?: number | true; y?: number };

  // /**
  //  * Whether to show table header
  //  * @default true
  //  * @type boolean
  //  */
  // showHeader?: boolean;

  // /**
  //  * Size of table
  //  * @default 'default'
  //  * @type string
  //  */
  size?: string;

  /**
   * 表格标题
   */
  title?: string;

  // /**
  //  * Set props on per header row
  //  * @type Function
  //  */
  // customHeaderRow?: (column: ColumnProps, index: number) => object;

  // /**
  //  * Set props on per row
  //  * @type Function
  //  */
  // customRow?: (record: T, index: number) => object;

  // /**
  //  * `table-layout` attribute of table element
  //  * `fixed` when header/columns are fixed, or using `column.ellipsis`
  //  *
  //  * @see https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
  //  * @version 1.5.0
  //  */
  // tableLayout?: 'auto' | 'fixed' | string;

  // /**
  //  * the render container of dropdowns in table
  //  * @param triggerNode
  //  * @version 1.5.0
  //  */
  // getPopupContainer?: (triggerNode?: HTMLElement) => HTMLElement;

  // /**
  //  * Data can be changed again before rendering.
  //  * The default configuration of general user empty data.
  //  * You can configured globally through [ConfigProvider](https://antdv.com/components/config-provider-cn/)
  //  *
  //  * @version 1.5.4
  //  */
  // transformCellText?: Function;

  // /**
  //  * Callback executed before editable cell submit value, not for row-editor
  //  *
  //  * The cell will not submit data while callback return false
  //  */
  // beforeEditSubmit?: (data: {
  //   record: Recordable;
  //   index: number;
  //   key: string | number;
  //   value: any;
  // }) => Promise<any>;

  // /**
  //  * Callback executed when pagination, filters or sorter is changed
  //  * @param pagination
  //  * @param filters
  //  * @param sorter
  //  * @param currentDataSource
  //  */
  // onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;

  // /**
  //  * Callback executed when the row expand icon is clicked
  //  *
  //  * @param expanded
  //  * @param record
  //  */
  // onExpand?: (expande: boolean, record: T) => void;

  // /**
  //  * Callback executed when the expanded rows change
  //  * @param expandedRows
  //  */
  // onExpandedRowsChange?: (expandedRows: string[] | number[]) => void;

  // onColumnsChange?: (data: ColumnChangeParam[]) => void;
}

export interface TableActionType {
  reload: (opt?: FetchParams) => Promise<void>;
  getSelectRows: <T = Recordable>() => T[];
  clearSelectedRowKeys: () => void;
  //   expandAll: () => void;
  //   collapseAll: () => void;
  getSelectRowKeys: () => (string | number)[];
  deleteSelectRowByKey: (key: string) => void;
  /** 设置分页配置 */
  setPagination: (info: Partial<PaginationProps>) => void;
  //   setTableData: <T = Recordable>(values: T[]) => void;
  //   updateTableDataRecord: (
  //     rowKey: string | number,
  //     record: Recordable
  //   ) => Recordable | void;
  //   deleteTableDataRecord: (
  //     rowKey: string | number | string[] | number[]
  //   ) => void;
  //   insertTableDataRecord: (
  //     record: Recordable,
  //     index?: number
  //   ) => Recordable | void;
  //   findTableDataRecord: (rowKey: string | number) => Recordable | void;
  /** 获取表格列配置 */
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  /** 设置表格列配置 */
  setColumns: (columns: BasicColumn[]) => void;
  //   getDataSource: <T = Recordable>() => T[];
  //   getRawDataSource: <T = Recordable>() => T;
  /** 设置是否加载中 */
  setLoading: (loading: boolean) => void;
  /** 用于设置表格参数 */
  setProps: (props: Partial<BasicTableProps>) => void;
  //   redoHeight: () => void;
  setSelectedRowKeys: (rowKeys: (string | number)[]) => void;
  getPaginationRef: () => PaginationProps | boolean;
  getSize: () => string;
  getRowSelection: () => TableRowSelection | null;
  getCacheColumns: () => BasicColumn[];
  //   updateTableData: (index: number, key: string, value: any) => Recordable;
  /** 设置是否显示分页 */
  setShowPagination: (show: boolean) => Promise<void>;
  /** 是否显示分页 */
  getShowPagination: () => boolean;
  setCacheColumnsByField?: (dataIndex: string | undefined, value: BasicColumn) => void;
}
