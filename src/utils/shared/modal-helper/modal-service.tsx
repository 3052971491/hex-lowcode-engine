import AModal from 'ant-design-vue/lib/modal/Modal';
import { App, ComponentOptions, h, ref, render } from 'vue';
import ModalTitle from './modal-title.vue';

export class ModalService {
  instance: App | undefined;

  public init(app: App) {
    this.instance = app;
  }

  /**
   * 创建模态框
   * @param component 组件
   * @param params 组件参数
   * @param options 模态框选项
   * @returns
   */
  create(component: ComponentOptions | any, params: any = {}, options: any = {}): Promise<any> {
    return new Promise((resole) => {
      // 初始化检查
      if (!this.instance) {
        // 没有初始化，抛出异常
        // reject('请先实现ModalService');
      } else {
        // 模态框容器
        const container = document.createElement('div');
        document.body.appendChild(container);

        // eslint-disable-next-line no-unused-expressions
        AModal.destroyAll();

        const modalRef = {
          instance: null,
          close(args: boolean | any) {
            if (this.instance) {
              (this.instance as any).component.props.visible = false;
            }
            resole(args);
            // 弹出框关闭时移除节点
            setTimeout(() => {
              document.body.removeChild(container);
            }, 1000);
          },
          update() {
            if (this.instance) {
              (this.instance as any).component.props.fullscreen = !(this.instance as any).component.props.fullscreen;
              (this.instance as any).component.props.width = (this.instance as any).component.props.fullscreen
                ? '100%'
                : 900;
            }
          },
          fullScreen() {
            const { props } = (this.instance as any).component;
            props.fullscreen = !props.fullscreen;
            fullscreen.value = !fullscreen.value;
            if (props.wrapClassName === 'hex-modal-helper') {
              props.wrapClassName = 'hex-modal-helper-fullscreen';
            } else {
              props.wrapClassName = 'hex-modal-helper';
            }
          },
        };

        // 组件实例
        const componentInstance = h(component, {
          modalRef,
          ...params,
        });

        const fullscreen = ref(false);

        /** 模态框基本配置 */
        const defaultOptions: any = {
          title: 'Title',
          visible: true,
          footer: false,
          width: 900,
          wrapClassName: options.fullScreen ? 'hex-modal-helper-fullscreen' : 'hex-modal-helper',
          destroyOnClose: true,
          fullscreen: fullscreen.value,
          onCancel: () => {
            modalRef.close(false);
          },
          onOk: () => {
            modalRef.close(true);
          },
          getContainer: () => container,
        };

        Object.assign(defaultOptions, options);

        const titleInstance = h(ModalTitle, {
          title: defaultOptions.title,
          fullscreen: fullscreen.value,
          onCancel() {
            modalRef.close(false);
          },
          onFullscreen: (e: Event) => {
            fullscreen.value = !fullscreen.value;
            e?.stopPropagation();
            e?.preventDefault();
            modalRef.fullScreen();
          },
        });

        // 模态框实例
        const vm = h(
          AModal,
          {
            ...defaultOptions,
            onCancel: () => {},
          },
          {
            default: () => componentInstance,
            closeIcon: () => titleInstance,
          },
        );

        // 关联app上下文
        // eslint-disable-next-line no-underscore-dangle
        vm.appContext = this.instance._context;

        modalRef.instance = vm as any;
        render(vm, container);
      }
    });
  }
}

const modalHelper = new ModalService();
export default modalHelper;
