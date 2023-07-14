import React, { useState } from "react";
import { useQuery } from "react-query";
import TextInput from "../../inputs/TextInput";
import { findAllOffices } from "../../axios/queries";
import { useDispatch } from "react-redux";
import { toggleOfficeModal } from "../../redux/slices/generalSlice";
import OfficeModal from "./OfficeModal";
import { OfficeForm } from "../../enums/enums";

const OfficesList: React.FC = () => {
  const dispatch = useDispatch();

  const [officeFormData, setOfficeFormData] = useState<OfficeForm>({
    name: "",
    address: "",
    currencyId: null,
  });

  const [filter, setFilter] = useState<string>("");

  const handleInputChange = (e: any) => {
    let { value } = e.target;
    setFilter(value);
  };

  const { data, isLoading } = useQuery(["officesList", filter], () => {
    return findAllOffices(filter);
  });

  const handleAddNew = () => {
    dispatch(toggleOfficeModal(true));
  };

  return (
    <div className="page-container">
      <div className="flex gap-5 items-end mb-5">
        <TextInput
          name="filter"
          value={filter}
          onChange={handleInputChange}
          placeholder="Search..."
          containerStyle="w-full"
        />
        <button className="add-new-btn-style" onClick={handleAddNew}>
          add new
        </button>
      </div>
      <div className="list-header-style">
        <p className="flex-1">name</p>
        <p className="flex-1">address</p>
        <p className="flex-1">currency</p>
        <p className="flex-1">actions</p>
      </div>

      {data?.data.map((office: any) => {
        return (
          <div className="list-row-style">
            <p className="flex-1">{office?.name}</p>
            <p className="flex-1">{office?.address}</p>
            <p className="flex-1">{office?.currency?.name}</p>
            <p className="flex-1">actions</p>
          </div>
        );
      })}

      <OfficeModal
        officeFormData={officeFormData}
        setOfficeFormData={setOfficeFormData}
      />
    </div>
  );
};

export default OfficesList;
