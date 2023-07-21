import React, { useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useQuery } from "react-query";
import {
  findAllUsers,
  findOneUser,
  getEmployeeFormOptions,
} from "../../axios/queries";
import TextInput from "../../inputs/TextInput";
import { useDispatch } from "react-redux";
import { toggleEmployeeModal } from "../../redux/slices/generalSlice";
import EmployeeModal from "./EmployeeModal";
import { EmployeeFormData } from "../../interfaces/interfaces";

const Employees: React.FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");

  const formDataInitialState: EmployeeFormData = {
    id: null,
    name: "",
    email: "",
    password: "",
    officeId: "",
    departmentId: "",
    positionId: "",
    managerId: "",
    userImageFile: null,
  };

  const [formData, setFormData] = useState<EmployeeFormData>({
    ...formDataInitialState,
  });

  const {
    data,
    isLoading: findAllUsersLoading,
    refetch: refetchEmployeesList,
  } = useQuery(["findAllUsers", name], () => {
    return findAllUsers(name);
  });

  const {
    data: employeeFormOptions,
    isLoading: fetchEmployeeFormOptionsLoading,
    refetch: fetchEmployeeFormOptions,
  } = useQuery("getEmployeeFormOptions", getEmployeeFormOptions, {
    enabled: false,
    onSuccess: (_) => {
      dispatch(toggleEmployeeModal(true));
    },
  });

  const normalizeEmployeeFormOptions = () => {
    const result: { offices: any[]; departments: any[]; positions: any[] } = {
      offices: [],
      departments: [],
      positions: [],
    };

    employeeFormOptions?.forEach((employeeFormOption, index: number) => {
      switch (index) {
        case 0:
          result.offices = employeeFormOption?.data;
          break;
        case 1:
          result.departments = employeeFormOption?.data;
          break;
        case 2:
          result.positions = employeeFormOption?.data;
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

  const [employeeId, setEmployeeId] = useState<number | null>(null);

  const { isLoading: fetchEmployeeDataLoading } = useQuery(
    ["findOneUser", employeeId],
    () => {
      if (employeeId) {
        return findOneUser(employeeId);
      }
    },
    {
      onSuccess: (data) => {
        console.log(data);
        let user = data?.data;
        setFormData({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          officeId: user.officeId,
          departmentId: user.departmentId,
          positionId: user.positionId,
          userImagePath: user.image_path,
        });
      },
    }
  );

  const handleFetchEmployeeData = (employeeId: number) => {
    fetchEmployeeFormOptions();
    setEmployeeId(employeeId);
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
      <div className="flex gap-10 flex-wrap items-center">
        {data?.data?.map((employee: any, index: number) => {
          return (
            <EmployeeCard
              key={index}
              id={employee?.id}
              name={employee?.name}
              office={employee?.office?.name}
              department={employee?.department?.name}
              position={employee?.position?.name}
              imagePath={employee?.image_path}
              handleFetchEmployeeData={handleFetchEmployeeData}
            />
          );
        })}
      </div>
      <EmployeeModal
        employeeFormOptions={normalizeEmployeeFormOptions()}
        refetchEmployeesList={refetchEmployeesList}
        formData={formData}
        setFormData={setFormData}
        formDataInitialState={formDataInitialState}
      />
    </div>
  );
};

export default Employees;
