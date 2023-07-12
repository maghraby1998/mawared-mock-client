import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useQuery } from "react-query";
import { findAllUsers } from "../../axios/queries";
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

  const handleAddNew = () => {
    dispatch(toggleEmployeeModal(true));
  };

  return (
    <div className="page-container">
      <div className="flex items-end gap-3 mb-5">
        <TextInput
          name="employeeName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="search by employee"
          label="employee name"
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
      <EmployeeModal />
    </div>
  );
};

export default Employees;
