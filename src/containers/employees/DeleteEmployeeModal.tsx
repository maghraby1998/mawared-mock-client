import React, { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import ModalSize from "../../enums/ModalSize";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import { getRandomString } from "../../helpers/helpers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleDeleteEmployeeModal } from "../../redux/slices/generalSlice";

interface Props {
  deleteEmployeeMutation: (obj: { employeeId: number }) => void;
}

const DeleteEmployeeModal: React.FC<Props> = ({ deleteEmployeeMutation }) => {
  const dispatch = useDispatch();

  const deleteEmployeeModalData = useSelector(
    (state: RootState) => state.general.deleteEmployeeModal
  );

  const { isOpen, employeeId } = deleteEmployeeModalData;

  const [exceptionMessage, setExceptionMessage] = useState("");

  const [randomToken, setRandomToken] = useState("");
  const [formData, setFormData] = useState({ token: "" });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  useEffect(() => {
    setRandomToken(getRandomString(10));
    resetModal();
  }, [isOpen]);

  const resetModal = () => {
    setIsFormSubmitted(false);
    setFormData({ token: "" });
    setExceptionMessage("");
    setClientErrors([]);
  };

  const handleSubmit = () => {
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    if (randomToken === formData.token && employeeId) {
      deleteEmployeeMutation({ employeeId });
    } else {
      setExceptionMessage("not matched");
    }
  };

  const handleClose = () => {
    dispatch(toggleDeleteEmployeeModal({ isOpen: false, employeeId: null }));
    resetModal();
  };

  return (
    <CustomModal
      modalTitle="delete employee"
      isOpen={isOpen}
      modalSize={ModalSize.POPUP}
      onClose={handleClose}
      saveBtnLabel="delete"
      saveBtnStyle="bg-red-500"
      saveBtnFunction={handleSubmit}
    >
      <p className="text-center">Copy the following token in the input below</p>
      <p className="text-center text-slate-600 my-2">{randomToken}</p>
      <TextInput
        name="token"
        value={formData.token}
        validateAt={ValidateAt.isString}
        setFormData={setFormData}
        autoFocus
        isFormSubmitted={isFormSubmitted}
        setClientErrors={setClientErrors}
        placeholder="Insert Text Here..."
      />
      <p className="error-validation-message">{exceptionMessage}</p>
    </CustomModal>
  );
};

export default DeleteEmployeeModal;
