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
  setOfficeId: React.Dispatch<React.SetStateAction<number | null>>;
  currenciesOptions: any[] | unknown;
  refetchOfficesList: () => any;
}

const OfficeModal: React.FC<Props> = ({
  officeFormData,
  setOfficeFormData,
  currenciesOptions,
  refetchOfficesList,
  setOfficeId,
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
        id,
        name,
        address,
        currencyId,
      }: {
        id?: string;
        name: string;
        address: string;
        currencyId: number;
      }) => {
        return upsertOffice(id, name, address, currencyId);
      },
      onSuccess: (_) => {
        refetchOfficesList();
        handleClose();
      },
    });

  const isOpen = useSelector(
    (state: RootState) => state.general.isOfficeModalOpen
  );

  const resetModal = () => {
    setOfficeFormData({ name: "", address: "", currencyId: "" });
    setClientErrors([]);
    setIsFormSubmitted(false);
    setOfficeId(null);
  };

  const handleClose = () => {
    dispatch(toggleOfficeModal(false));
    resetModal();
  };

  const handleSubmit = () => {
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    upsertOfficeFunc({
      id: officeFormData.id,
      name: officeFormData.name,
      address: officeFormData.address,
      currencyId: +officeFormData.currencyId,
    });
  };

  return (
    <CustomModal
      isOpen={isOpen}
      modalTitle="add office"
      onClose={handleClose}
      saveBtnLabel="save"
      saveBtnFunction={handleSubmit}
      saveBtnLoading={upsertOfficeLoading}
    >
      <form className="flex flex-col gap-7">
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
          {...sharedProps}
        />
      </form>
    </CustomModal>
  );
};

export default OfficeModal;
