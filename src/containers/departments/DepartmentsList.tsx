import { CircularProgress, Grow, Slide } from "@mui/material";
import React, { useState } from "react";
import TextInput from "../../inputs/TextInput";
import { useQuery } from "react-query";
import { getAllManagers, getCompanyDepartments } from "../../axios/queries";
import { useDispatch } from "react-redux";
import { toggleDepartmentModal } from "../../redux/slices/generalSlice";
import DepartmentModal from "./DepartmentModal";

const DepartmentsList: React.FC = () => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("");

  const {
    data,
    isLoading: fetchCompanyDepartmentsLoading,
    refetch: refetchDepartmentsList,
  } = useQuery(["getCompanyDepartments", filter], () => {
    return getCompanyDepartments(filter);
  });

  const companyDepartments = data?.data ?? [];

  const {
    isLoading: fetchManagersLoading,
    data: managersData,
    refetch: fetchManagersOptions,
  } = useQuery("getAllManagers", getAllManagers, {
    enabled: false,
    onSuccess: (_) => {
      dispatch(toggleDepartmentModal(true));
    },
  });

  const managersOptions = managersData?.data;

  const handleNameFilterInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let { value } = e.target;

    setFilter(value);
  };

  const handleAddNew = () => {
    fetchManagersOptions();
  };

  return (
    <div className="page-container">
      {fetchCompanyDepartmentsLoading || fetchManagersLoading ? (
        <CircularProgress className="absolute top-[50%] left-[50%]" />
      ) : null}
      <h2 className="page-title">departments</h2>

      <div className="flex gap-5 items-end mb-5">
        <Grow in={true} timeout={300}>
          <div className="w-full">
            <TextInput
              name="filter"
              value={filter}
              onChange={handleNameFilterInputChange}
              placeholder="Search..."
              containerStyle="w-full"
            />
          </div>
        </Grow>
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <button className="add-new-btn-style" onClick={handleAddNew}>
            add new
          </button>
        </Slide>
      </div>

      <div className="list-header-style">
        <p className="flex-1">name</p>
        <p className="flex-1">manager</p>
        <p className="flex-1">actions</p>
      </div>

      {companyDepartments.map((department: any, index: number) => {
        return (
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            timeout={(index + 1) * 100}
          >
            <div className="list-row-style">
              <p className="flex-1">{department?.name}</p>
              <p className="flex-1">{department?.manager?.name}</p>
              <p className="flex-1">actions</p>
            </div>
          </Slide>
        );
      })}

      <DepartmentModal
        managersOptions={managersOptions}
        refetchDepartmentsList={refetchDepartmentsList}
      />
    </div>
  );
};

export default DepartmentsList;
