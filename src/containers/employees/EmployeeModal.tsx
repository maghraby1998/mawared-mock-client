import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleEmployeeModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import ModalSize from "../../enums/ModalSize";
import DropDown from "../../inputs/Dropdown";

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  officeId: string;
  departmentId: string;
  positionId: string;
  managerId: string;
}

interface Props {
  employeeFormOptions: {
    offices: any[];
    departments: any[];
  };
}

const EmployeeModal: React.FC<Props> = ({ employeeFormOptions }) => {
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    password: "",
    officeId: "",
    departmentId: "",
    positionId: "",
    managerId: "",
  });

  const sharedProps = { setClientErrors, isFormSubmitted, setFormData };

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

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="add new employee"
      modalSize={ModalSize.LARGE}
    >
      <form onSubmit={handleSubmit} className="form-container">
        <div className="grid grid-cols-2 gap-10 items-start">
          <TextInput
            name="name"
            label="name"
            placeholder="Employee Name"
            value={formData.name}
            validateAt={ValidateAt.isString}
            {...sharedProps}
          />
          <TextInput
            name="email"
            label="email"
            placeholder="Email"
            value={formData.email}
            validateAt={ValidateAt.isEmail}
            {...sharedProps}
          />
          <TextInput
            name="password"
            label="password"
            placeholder="Password"
            value={formData.password}
            validateAt={ValidateAt.isString}
            {...sharedProps}
          />
          <DropDown
            name="officeId"
            value={formData.officeId}
            options={employeeFormOptions?.offices ?? []}
            label="Office"
            isClearable
            placeholder="Office"
            validateAt={ValidateAt.isString}
            {...sharedProps}
          />
          <DropDown
            name="departmentId"
            value={formData.departmentId}
            options={employeeFormOptions?.departments ?? []}
            label="Department"
            isClearable
            placeholder="Department"
            validateAt={ValidateAt.isString}
            {...sharedProps}
          />
        </div>
        <button>submit</button>
      </form>
    </CustomModal>
  );
};

export default EmployeeModal;
