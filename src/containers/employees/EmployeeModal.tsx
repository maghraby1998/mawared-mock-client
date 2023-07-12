import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleEmployeeModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import ModalSize from "../../enums/ModalSize";

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  officeId: number | null;
  departmentId: number | null;
  positionId: number | null;
  managerId: number | null;
}

const EmployeeModal: React.FC = () => {
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const sharedProps = { setClientErrors, isFormSubmitted };

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    password: "",
    officeId: null,
    departmentId: null,
    positionId: null,
    managerId: null,
  });

  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.general.isEmployeeModalOpen
  );

  const onClose = () => {
    dispatch(toggleEmployeeModal(false));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (clientErrors.length) return;
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="add new employee"
      modalSize={ModalSize.LARGE}
    >
      <form className="form-container grid grid-cols-2 gap-10">
        <TextInput
          name="name"
          label="name"
          placeholder="Employee Name"
          onChange={handleInputChange}
          value={formData.name}
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />
        <TextInput
          name="email"
          label="email"
          placeholder="Email"
          onChange={handleInputChange}
          value={formData.email}
          validateAt={ValidateAt.isEmail}
          {...sharedProps}
        />
        <TextInput
          name="password"
          label="password"
          placeholder="Password"
          onChange={handleInputChange}
          value={formData.password}
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />
      </form>
    </CustomModal>
  );
};

export default EmployeeModal;
