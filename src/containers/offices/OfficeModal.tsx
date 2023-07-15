import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleOfficeModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import { OfficeForm } from "../../enums/enums";
import ValidateAt from "../../enums/ValidateAt";
import DropDown from "../../inputs/Dropdown";

interface Props {
  officeFormData: OfficeForm;
  setOfficeFormData: React.Dispatch<React.SetStateAction<OfficeForm>>;
}

const OfficeModal: React.FC<Props> = ({
  officeFormData,
  setOfficeFormData,
}) => {
  const dispatch = useDispatch();

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const sharedProps = { setClientErrors, isFormSubmitted };

  const isOpen = useSelector(
    (state: RootState) => state.general.isOfficeModalOpen
  );

  const handleClose = () => {
    dispatch(toggleOfficeModal(false));
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setOfficeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    console.log("should submit");
  };

  console.log(officeFormData);
  return (
    <CustomModal isOpen={isOpen} modalTitle="add office" onClose={handleClose}>
      <form
        onSubmit={handleSubmit}
        className="form-container flex flex-col gap-7"
      >
        <TextInput
          name="name"
          label="name"
          placeholder="Office Name..."
          value={officeFormData.name}
          onChange={handleInputChange}
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />

        <TextInput
          name="address"
          label="address"
          placeholder="Office Address..."
          value={officeFormData.address}
          onChange={handleInputChange}
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />

        <DropDown
          label="currency"
          options={[{ name: "egp", value: 1 }] as any}
          name="currencyId"
          value={officeFormData.currencyId}
          isClearable
          validateAt={ValidateAt.isString}
          setState={setOfficeFormData}
          {...sharedProps}
        />
        <button>submit</button>
      </form>
    </CustomModal>
  );
};

export default OfficeModal;
