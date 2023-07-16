import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleOfficeModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import { OfficeForm } from "../../enums/enums";
import ValidateAt from "../../enums/ValidateAt";
import DropDown from "../../inputs/Dropdown";
import { useMutation } from "react-query";
import { upsertOffice } from "../../axios/mutations";

interface Props {
  officeFormData: OfficeForm;
  setOfficeFormData: React.Dispatch<React.SetStateAction<OfficeForm>>;
  currenciesOptions: any[] | unknown;
  refetchOfficesList: () => any;
}

const OfficeModal: React.FC<Props> = ({
  officeFormData,
  setOfficeFormData,
  currenciesOptions,
  refetchOfficesList,
}) => {
  const dispatch = useDispatch();

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const sharedProps = {
    setFormData: setOfficeFormData,
    setClientErrors,
    isFormSubmitted,
  };

  const { isLoading: upsertOfficeLoading, mutate: upsertOfficeFunc } =
    useMutation({
      mutationFn: ({
        name,
        address,
        currencyId,
      }: {
        name: string;
        address: string;
        currencyId: number;
      }) => {
        return upsertOffice(name, address, currencyId);
      },
      onSuccess: (data) => {
        refetchOfficesList();
        handleClose();
      },
    });

  const isOpen = useSelector(
    (state: RootState) => state.general.isOfficeModalOpen
  );

  const handleClose = () => {
    dispatch(toggleOfficeModal(false));
    setOfficeFormData({ name: "", address: "", currencyId: "" });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    upsertOfficeFunc({
      name: officeFormData.name,
      address: officeFormData.address,
      currencyId: +officeFormData.currencyId,
    });
  };

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
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />

        <TextInput
          name="address"
          label="address"
          placeholder="Office Address..."
          value={officeFormData.address}
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />

        <DropDown
          label="currency"
          options={currenciesOptions ?? ([] as any)}
          name="currencyId"
          value={officeFormData.currencyId}
          isClearable
          validateAt={ValidateAt.isString}
          optionLabel="name"
          optionValue="id"
          {...sharedProps}
        />
        <button>{upsertOfficeLoading ? "loading..." : "submit"}</button>
      </form>
    </CustomModal>
  );
};

export default OfficeModal;
