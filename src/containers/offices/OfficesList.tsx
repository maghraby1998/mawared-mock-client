import React, { useState } from "react";
import { useQuery } from "react-query";
import TextInput from "../../inputs/TextInput";
import { findAllOffices, getAllCurrencies } from "../../axios/queries";
import { useDispatch } from "react-redux";
import { toggleOfficeModal } from "../../redux/slices/generalSlice";
import OfficeModal from "./OfficeModal";
import { OfficeForm } from "../../enums/enums";
import { CircularProgress, Slide } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";

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
    reFetchCurrenciesData();
  };

  const handleDeleteOffice = (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Warning!",
      text: "This action can't be reverted.",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d9534f",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      }
    });
  };

  const handleEditOffice = (id: number) => {};

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
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <button className="add-new-btn-style" onClick={handleAddNew}>
            add new
          </button>
        </Slide>
      </div>
      <div className="list-header-style">
        <p className="flex-1">name</p>
        <p className="flex-1">address</p>
        <p className="flex-1">currency</p>
        <p className="flex-1">actions</p>
      </div>

      {data?.data.map((office: any, index: number) => {
        return (
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={(index + 1) * 100}
          >
            <div className="list-row-style">
              <p className="flex-1">{office?.name}</p>
              <p className="flex-1">{office?.address}</p>
              <p className="flex-1">{office?.currency?.name}</p>
              <div className="flex-1 flex gap-4">
                <button
                  onClick={() => handleDeleteOffice(office?.id)}
                  title="edit"
                >
                  <DeleteForeverIcon className="base-icon-style edit-icon text-red-500" />
                </button>

                <button
                  onClick={() => handleEditOffice(office?.id)}
                  title="delete"
                >
                  <EditIcon className="base-icon-style edit-icon text-green-500" />
                </button>
              </div>
            </div>
          </Slide>
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
