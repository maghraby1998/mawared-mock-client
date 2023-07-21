import { CircularProgress, Modal } from "@mui/material";
import React from "react";
import ModalSize from "../enums/ModalSize";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  children: React.ReactNode;
  modalSize?: ModalSize;
  saveBtnLabel?: string;
  saveBtnFunction?: (e?: any) => void;
  saveBtnLoading?: boolean;
}

const CustomModal: React.FC<Props> = ({
  modalTitle,
  isOpen,
  onClose,
  modalSize = ModalSize.SMALL,
  children,
  saveBtnLabel,
  saveBtnFunction = () => {},
  saveBtnLoading = false,
}) => {
  return (
    <Modal
      open={isOpen}
      className={`${
        modalSize === ModalSize.SMALL ? "w-[800px]" : "w-[1200px]"
      } mx-auto my-[30px] rounded overflow-scroll flex flex-col itmes-start justify-start`}
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
        <div className="bg-white px-5 py-5 rounded-bl rounded-br">
          {children}
          {/* <div className="h-[1px] w-full bg-black mt-5 mb-2 opacity-[0.5]"></div> */}
          {saveBtnLabel ? (
            <button
              onClick={saveBtnFunction}
              className="mx-auto block bg-slate-600 text-white rounded mt-5 capitalize h-[35px] min-w-[80px]"
              disabled={saveBtnLoading}
            >
              {saveBtnLoading ? (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              ) : (
                saveBtnLabel
              )}
            </button>
          ) : null}
        </div>
      </>
    </Modal>
  );
};

export default CustomModal;
