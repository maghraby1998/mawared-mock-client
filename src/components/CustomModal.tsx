import { Modal } from "@mui/material";
import React from "react";
import ModalSize from "../enums/ModalSize";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  children: React.ReactNode;
  modalSize?: ModalSize;
}

const CustomModal: React.FC<Props> = ({
  modalTitle,
  isOpen,
  onClose,
  modalSize = ModalSize.SMALL,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      className={`w-[${modalSize}px] mx-auto my-[30px] rounded overflow-scroll flex flex-col itmes-start justify-start`}
      disableEscapeKeyDown
      slotProps={{ backdrop: { onClick: () => {} } }}
    >
      <>
        <div className="h-[50px] bg-slate-300 w-full capitalize flex justify-between items-center">
          <p className="px-5">{modalTitle}</p>
          <button
            className="bg-red-500 text-white text-xl font-bold h-full w-[50px]"
            onClick={onClose}
          >
            x
          </button>
        </div>
        {children}
      </>
    </Modal>
  );
};

export default CustomModal;
