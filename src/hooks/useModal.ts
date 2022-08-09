import { ConfirmModalProps } from "../components/Modal/ConfirmModal";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { IModal, setModal } from "../store/modules/Modal";

export default function useModal() {
  const dispatch = useAppDispatch();
  const { modalType } = useAppSelector((state) => state.modal);

  const openModal = ({ modalType, modalProps }: IModal) => {
    dispatch(setModal({ modalType, modalProps }));
  };

  const closeModal = () => {
    dispatch(setModal({ modalProps: null, modalType: null }));
  };

  const showAlert = ({
    title,
    message,
  }: {
    title: string;
    message?: string;
  }) => {
    openModal({
      modalType: "AlertModal",
      modalProps: {
        title,
        message,
        closeHandle: () => closeModal(),
        btnHandle: () => closeModal(),
      },
    });
  };

  const showConfirmModal = ({
    title,
    message,
    firstBtnText,
    secondBtnText,
    onClickFirstHandle,
    onClickSecondHandle,
    firstFocus = true,
    secondFocus = false,
  }: ConfirmModalProps) => {
    openModal({
      modalType: "ConfirmModal",
      modalProps: {
        title,
        message,
        firstBtnText,
        secondBtnText,
        firstFocus,
        secondFocus,
        closeHandle: () => closeModal(),
        onClickFirstHandle: () => onClickFirstHandle(),
        onClickSecondHandle: () => onClickSecondHandle(),
      },
    });
  };

  return {
    modalType,
    showAlert,
    showConfirmModal,
    openModal,
    closeModal,
  };
}
