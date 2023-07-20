import React, { useCallback, useState } from "react";
import CustomModal from "../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toggleEmployeeModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import ModalSize from "../../enums/ModalSize";
import DropDown from "../../inputs/Dropdown";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { createEmployee } from "../../axios/mutations";

interface EmployeeFormData {
  name: string;
  email: string;
  password: string;
  officeId: string;
  departmentId: string;
  positionId: string;
  managerId: string;
  userImage: File | null;
}

interface Props {
  employeeFormOptions: {
    offices: any[];
    departments: any[];
    positions: any[];
  };
  refetchEmployeesList: () => void;
}

const EmployeeModal: React.FC<Props> = ({
  employeeFormOptions,
  refetchEmployeesList,
}) => {
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const formDataInitialState: EmployeeFormData = {
    name: "",
    email: "",
    password: "",
    officeId: "",
    departmentId: "",
    positionId: "",
    managerId: "",
    userImage: null,
  };

  const [formData, setFormData] = useState<EmployeeFormData>({
    ...formDataInitialState,
  });

  const sharedProps = { setClientErrors, isFormSubmitted, setFormData };

  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.general.isEmployeeModalOpen
  );

  const onClose = () => {
    dispatch(toggleEmployeeModal(false));
    setFormData({ ...formDataInitialState });
  };

  // remove this
  const { mutate } = useMutation({
    mutationFn: ({ file }: any) => {
      return createEmployee(file);
    },
    onSuccess: (_) => {
      dispatch(toggleEmployeeModal(false));
      refetchEmployeesList();
      setFormData({...formDataInitialState})
    },
  });
  // remove this

  const handleSubmit = () => {
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    const customFormData = new FormData();

    customFormData.append("image", formData.userImage);
    customFormData.append("name", formData.name);
    customFormData.append("email", formData.email);
    customFormData.append("password", formData.password);
    customFormData.append("officeId", formData.officeId);
    customFormData.append("departmentId", formData.departmentId);
    customFormData.append("positionId", formData.positionId);

    mutate({ file: customFormData });
  };

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFormData((prev) => ({ ...prev, userImage: acceptedFiles[0] }));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, userImage: null }));
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="add new employee"
      modalSize={ModalSize.LARGE}
      saveBtnLabel="save"
      saveBtnFunction={handleSubmit}
    >
      <form>
        <div className="relative h-[120px] w-[230px] border-2 border-slate-500 flex items-center justify-center mb-3 rounded">
          <button
            onClick={handleRemoveImage}
            type="button"
            className="absolute top-0 right-1 text-red-600"
          >
            x
          </button>
          {formData.userImage ? (
            <img
              className="h-full"
              src={URL.createObjectURL(formData.userImage)}
            />
          ) : (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-center capitalize text-slate-500 text-sm">
                drop image here or browse.
              </p>
            </div>
          )}
        </div>
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

          <DropDown
            name="positionId"
            value={formData.positionId}
            options={employeeFormOptions?.positions ?? []}
            label="Position"
            isClearable
            placeholder="Position"
            validateAt={ValidateAt.isString}
            {...sharedProps}
          />
        </div>
      </form>
    </CustomModal>
  );
};

export default EmployeeModal;
