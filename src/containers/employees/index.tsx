import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useQuery } from "react-query";
import { findAllUsers, getEmployeeFormOptions } from "../../axios/queries";
import TextInput from "../../inputs/TextInput";
import { useDispatch } from "react-redux";
import { toggleEmployeeModal } from "../../redux/slices/generalSlice";
import EmployeeModal from "./EmployeeModal";

const Employees: React.FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");

  const { data, isLoading: findAllUsersLoading } = useQuery(
    ["findAllUsers", name],
    () => {
      return findAllUsers(name);
    }
  );

  const {
    data: employeeFormOptions,
    isLoading: fetchEmployeeFormOptionsLoading,
    refetch: fetchEmployeeFormOptions,
  } = useQuery("getEmployeeFormOptions", getEmployeeFormOptions, {
    enabled: false,
    onSuccess: (data) => {
      console.log(data);
      dispatch(toggleEmployeeModal(true));
    },
  });

  const normalizeEmployeeFormOptions = () => {
    const result: { offices: any[]; departments: any[] } = {
      offices: [],
      departments: [],
    };

    employeeFormOptions?.forEach((employeeFormOption, index: number) => {
      switch (index) {
        case 0:
          result.offices = employeeFormOption?.data;
          break;
        case 1:
          result.departments = employeeFormOption?.data;
          break;
        default:
          break;
      }
    });

    return result;
  };

  const handleAddNew = () => {
    fetchEmployeeFormOptions();
  };

  return (
    <div className="page-container">
      <h2 className="page-title">employees</h2>
      <div className="flex items-end gap-3 mb-5">
        <TextInput
          name="employeeName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="search by employee"
          // label="name"
          containerStyle="w-full"
        />
        <button className="add-new-btn-style" onClick={handleAddNew}>
          add new
        </button>
      </div>
      {data?.data?.map((employee: any, index: number) => {
        return (
          <EmployeeCard
            key={index}
            name={employee?.name}
            office={employee?.office?.name}
            department={employee?.department?.name}
            position={employee?.position?.name}
          />
        );
      })}
      <EmployeeModal employeeFormOptions={normalizeEmployeeFormOptions()} />
    </div>
  );
};

export default Employees;
