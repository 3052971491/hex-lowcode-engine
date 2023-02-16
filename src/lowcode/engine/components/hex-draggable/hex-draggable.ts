/**
 * HexDraggable
 * 基于vuedraggable二次封装的拖拽组件
 */
export namespace HexDraggable {
  export interface Group {
    /** 分组名称
     * @description 名称相同的分组之前可以相互拖拽
     */
    name: string;
    /** 是否允许拖入当前组 */
    pull: boolean | string | 'clone' | Function;
    /** 是否允许拖出当前组 */
    put: boolean | string | 'clone' | Function;
  }

  interface ComponentData {
    name: string;
  }

  /** 配置 */
  export interface Options {
    /** 分组配置 */
    group: Group | string;
    /** 设置draggable标签解析html标签 */
    tag: string;
    /** 唯一标识 */
    itemKey: string;
    /** 过渡效果时间 */
    animation: number;
    /** 过渡效果 */
    componentData: ComponentData;
    /** 只有当鼠标移动到css为mover类的元素上才能拖动 */
    handle: string;
    /** 设置拖动元素的占位符类名 */
    ghostClass: string;
    /** 是否开启当前分组排序 */
    sort: boolean;
    /** 自定义控制元素是否允许拖拽 */
    move: Function;
    /** 从一个数组拖拽到另外一个数组时触发的事件和add不同，clone是复制了数组元素 */
    clone: Function;
  }

  /** 方法 */
  export interface Methods {}
}
