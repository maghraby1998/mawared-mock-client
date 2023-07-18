import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { togglePositionModal } from "../../redux/slices/generalSlice";
import TextInput from "../../inputs/TextInput";
import ValidateAt from "../../enums/ValidateAt";
import { useMutation } from "react-query";
import { upsertPosition } from "../../axios/mutations";

interface Props {
  refetchPositionsList: () => void;
}

const AddPositionModal: React.FC<Props> = ({ refetchPositionsList }) => {
  const dispatch = useDispatch();

  const [positionFormData, setPositionFormData] = useState({ name: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [clientErrors, setClientErrors] = useState<string[]>([]);

  const sharedProps = {
    isFormSubmitted,
    setClientErrors,
    setFormData: setPositionFormData,
  };

  const { isLoading: upsertPositionLoading, mutate: upsertPositionFunc } =
    useMutation({
      mutationFn: ({ name }: { name: string }) => {
        return upsertPosition(name);
      },
      onSuccess: (_) => {
        dispatch(togglePositionModal(false));
        refetchPositionsList();
      },
    });

  const isOpen = useSelector(
    (state: RootState) => state.general.isPositionsModalOpen
  );

  const resetModal = () => {
    setPositionFormData({ name: "" });
    setClientErrors([]);
    setIsFormSubmitted(false);
  };

  const handleClose = () => {
    dispatch(togglePositionModal(false));
    resetModal();
  };

  const handaleSubmit = () => {
    setIsFormSubmitted(true);

    if (clientErrors.length) return;

    upsertPositionFunc({ name: positionFormData.name });
  };

  return (
    <CustomModal
      modalTitle="add position"
      isOpen={isOpen}
      onClose={handleClose}
      saveBtnLabel="save"
      saveBtnFunction={handaleSubmit}
      saveBtnLoading={upsertPositionLoading}
    >
      <form>
        <TextInput
          name="name"
          value={positionFormData.name}
          autoFocus
          label="name"
          placeholder="name"
          validateAt={ValidateAt.isString}
          {...sharedProps}
        />
      </form>
    </CustomModal>
  );
};

export default AddPositionModal;
