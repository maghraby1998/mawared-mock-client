import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import { EmployeeFormData } from "../../interfaces/interfaces";

interface Props {
  formData: EmployeeFormData;
  setFormData: Dispatch<SetStateAction<EmployeeFormData>>;
  formDataInitialState: EmployeeFormData;
  employeeFormOptions: {
    offices: any[];
    departments: any[];
    positions: any[];
  };
  refetchEmployeesList: () => void;
  setEmployeeId: React.Dispatch<React.SetStateAction<number | null>>;
}

const EmployeeModal: React.FC<Props> = ({
  employeeFormOptions,
  refetchEmployeesList,
  formData,
  setFormData,
  formDataInitialState,
  setEmployeeId,
}) => {
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const sharedProps = { setClientErrors, isFormSubmitted, setFormData };

  const dispatch = useDispatch();
  const isOpen = useSelector(
    (state: RootState) => state.general.isEmployeeModalOpen
  );

  const resetModal = () => {
    setFormData({ ...formDataInitialState });
    setIsFormSubmitted(false);
    setClientErrors([]);
    setEmployeeId(null);
  };

  const onClose = () => {
    dispatch(toggleEmployeeModal(false));
    resetModal();
  };

  // remove this
  const { mutate: createUserFunc } = useMutation({
    mutationFn: ({ file }: any) => {
      return createEmployee(file);
    },
    onSuccess: (_) => {
      dispatch(toggleEmployeeModal(false));
      refetchEmployeesList();
      resetModal();
    },
  });
  // remove this
  const handleSubmit = () => {
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    const customFormData = new FormData();

    if (formData.id) {
      customFormData.append("id", formData.id.toString());
      if (formData.userImagePath) {
        customFormData.append("image", undefined);
      } else {
        if (formData.userImageFile) {
          customFormData.append("image", formData.userImageFile);
        } else {
          customFormData.append("removeImage", true);
        }
      }
    } else {
      customFormData.append("image", formData.userImageFile);
    }

    customFormData.append("name", formData.name);
    customFormData.append("email", formData.email);
    customFormData.append("officeId", formData.officeId);
    customFormData.append("departmentId", formData.departmentId);
    customFormData.append("positionId", formData.positionId);

    createUserFunc({ file: customFormData });
  };

  const onDrop = useCallback((acceptedFiles: any[]) => {
    setFormData((prev) => ({ ...prev, userImageFile: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      userImageFile: null,
      userImagePath: null,
    }));
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={formData.id ? "edit employee" : "add new employee"}
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
          {formData.userImageFile || formData.userImagePath ? (
            <img
              className="h-full"
              src={
                formData.userImagePath
                  ? `data:image/jpeg;base64,${formData.userImagePath}`
                  : URL.createObjectURL(formData.userImageFile)
              }
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
