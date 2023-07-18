import React, { useState } from "react";
import { useQuery } from "react-query";
import TextInput from "../../inputs/TextInput";
import { findAllOffices, getAllCurrencies } from "../../axios/queries";
import { useDispatch } from "react-redux";
import { toggleOfficeModal } from "../../redux/slices/generalSlice";
import OfficeModal from "./OfficeModal";
import { OfficeForm } from "../../enums/enums";
import { CircularProgress } from "@mui/material";

const OfficesList: React.FC = () => {
  const dispatch = useDispatch();

  const [officeFormData, setOfficeFormData] = useState<OfficeForm>({
    name: "",
    address: "",
    currencyId: "",
  });

  const [filter, setFilter] = useState<string>("");

  const handleNameFilterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { value } = e.target;
    setFilter(value);
  };

  const {
    data,
    isLoading: fetchOfficesListLoading,
    refetch: refetchOfficesList,
  } = useQuery(
    ["officesList", filter],
    () => {
      return findAllOffices(filter);
    },
    {
      cacheTime: 0,
    }
  );

  const {
    data: currenciesData,
    isLoading: fetchCurrencyDataLoading,
    refetch: reFetchCurrenciesData,
  } = useQuery("getAllCurrencies", getAllCurrencies, {
    enabled: false,
    onSuccess: () => {
      dispatch(toggleOfficeModal(true));
    },
    cacheTime: 0,
  });

  const currenciesOptions = currenciesData?.data;

  const handleAddNew = () => {
    console.log("refetching");
    reFetchCurrenciesData();
  };

  return (
    <div className="page-container">
      {fetchOfficesListLoading || fetchCurrencyDataLoading ? (
        <CircularProgress className="absolute top-[50%] left-[50%]" />
      ) : null}
      <h2 className="page-title">offices</h2>
      <div className="flex gap-5 items-end mb-5">
        <TextInput
          name="filter"
          value={filter}
          onChange={handleNameFilterInputChange}
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
        currenciesOptions={currenciesOptions}
        refetchOfficesList={refetchOfficesList}
      />
    </div>
  );
};

export default OfficesList;
