import { computed } from 'vue';
import ModalHelper from './modal-service';

export default function useModal(props?: any) {
  /** 模态框服务 */
  const modalHelper = computed(() => {
    return ModalHelper;
  });

  function success(result: any = true) {
    if (result) {
      props?.modalRef.close(result);
    } else {
      props.close();
    }
  }
  function close() {
    props?.modalRef.close(false);
  }

  return {
    modalHelper,
    success,
    close,
  };
}
