import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleDepartmentModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import DropDown from "../../inputs/Dropdown";
import { useMutation } from "react-query";
import { upsertDepartment } from "../../axios/mutations";

interface Props {
  managersOptions: any[];
  refetchDepartmentsList: () => void;
}

interface DepartmentFormData {
  name: string;
  managerId: string;
}

const DepartmentModal: React.FC<Props> = ({
  managersOptions,
  refetchDepartmentsList,
}) => {
  const dispatch = useDispatch();

  const [clientErrors, setClientErrors] = useState<string[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const [departmentFormData, setDepartmentFormData] =
    useState<DepartmentFormData>({
      name: "",
      managerId: "",
    });

  const { mutate: upsertDepartmentFunc, isLoading: upsertDepartmentLoading } =
    useMutation({
      mutationFn: ({
        name,
        managerId,
      }: {
        name: string;
        managerId: number;
      }) => {
        return upsertDepartment(name, managerId);
      },
      onSuccess: (_) => {
        dispatch(toggleDepartmentModal(false));
        refetchDepartmentsList();
      },
    });

  const sharedProps = {
    setClientErrors,
    isFormSubmitted,
    setFormData: setDepartmentFormData,
  };

  const isOpen = useSelector(
    (state: RootState) => state.general.isDepartmentsModalOpen
  );

  const resetModal = () => {
    setDepartmentFormData({ name: "", managerId: "" });
    setClientErrors([]);
    setIsFormSubmitted(false);
  };

  const onClose = () => {
    dispatch(toggleDepartmentModal(false));
    resetModal();
  };

  const handleSubmit = () => {
    setIsFormSubmitted(true);
    if (clientErrors.length) return;
    upsertDepartmentFunc({
      name: departmentFormData.name,
      managerId: +departmentFormData.managerId,
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      modalTitle="Add Department"
      onClose={onClose}
      saveBtnLabel="save"
      saveBtnFunction={handleSubmit}
      saveBtnLoading={upsertDepartmentLoading}
    >
      <form>
        <div className="flex flex-col gap-3">
          <TextInput
            name="name"
            value={departmentFormData.name}
            autoFocus
            label="name"
            placeholder="name"
            validateAt={ValidateAt.isString}
            {...sharedProps}
          />
          <DropDown
            name="managerId"
            value={departmentFormData.managerId}
            options={managersOptions ?? []}
            label="manager"
            isClearable
            placeholder="Select Manager"
            {...sharedProps}
          />
        </div>
      </form>
    </CustomModal>
  );
};

export default DepartmentModal;
