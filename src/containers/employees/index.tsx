import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import { useMutation, useQuery } from "react-query";
import {
  findAllUsers,
  findOneUser,
  getEmployeeFormOptions,
} from "../../axios/queries";
import TextInput from "../../inputs/TextInput";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDeleteEmployeeModal,
  toggleEmployeeModal,
} from "../../redux/slices/generalSlice";
import EmployeeModal from "./EmployeeModal";
import { EmployeeFormData } from "../../interfaces/interfaces";
import { Box, Grow, Skeleton, Slide } from "@mui/material";
import { RootState } from "../../redux/store";
import { deleteUser } from "../../axios/mutations";
import DeleteEmployeeModal from "./DeleteEmployeeModal";

const Employees: React.FC = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");

  const formDataInitialState: EmployeeFormData = {
    id: null,
    name: "",
    email: "",
    officeId: "",
    departmentId: "",
    positionId: "",
    managerId: "",
    userImageFile: null,
    userImagePath: null,
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

  const isOpen = useSelector(
    (state: RootState) => state.general.isEmployeeModalOpen
  );

  const { isLoading: fetchEmployeeDataLoading } = useQuery(
    ["findOneUser", employeeId],
    () => {
      if (employeeId) {
        return findOneUser(employeeId);
      }
    },
    {
      enabled: !!employeeId && !isOpen,
      onSuccess: (data) => {
        let user = data?.data;
        if (employeeId) {
          setFormData({
            id: user.id,
            name: user.name,
            email: user.email,
            officeId: user.officeId,
            departmentId: user.departmentId,
            positionId: user.positionId,
            userImagePath: user.image_path,
          });
        }
      },
    }
  );

  const { mutate: deleteUserFunc, isLoading: deleteUserLoading } = useMutation({
    mutationFn: ({ employeeId }: { employeeId: number }) => {
      return deleteUser(employeeId);
    },
    onSuccess: (_) => {
      dispatch(toggleDeleteEmployeeModal({ isOpen: false, employeeId: null }));
      refetchEmployeesList();
    },
  });

  const handleFetchEmployeeData = (employeeId: number) => {
    setEmployeeId(employeeId);
    fetchEmployeeFormOptions();
  };

  const handleDeleteUser = (employeeId: number) => {
    dispatch(toggleDeleteEmployeeModal({ isOpen: true, employeeId }));
  };

  return (
    <div className="page-container">
      <h2 className="page-title">employees</h2>
      <div className="flex items-end gap-3 mb-5">
        <TextInput
          name="employeeName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search By Employee"
          containerStyle="w-full"
        />
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
          <button className="add-new-btn-style" onClick={handleAddNew}>
            add new
          </button>
        </Slide>
      </div>
      {/* <Box
        sx={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          // position: "absolute",
          // paddingInline: 5,
          // borderRadius: 5,
        }}
      > */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Conditionally applies the timeout prop to change the entry speed. */}

        {findAllUsersLoading
          ? [...new Array(8)].map(() => (
              <Skeleton
                variant="rectangular"
                width={350}
                height={150}
                style={{ borderRadius: 4 }}
              />
            ))
          : null}

        {data?.data?.map((employee: any, index: number) => {
          return (
            <Grow
              in={true}
              style={{ transformOrigin: "0 0 0" }}
              timeout={150 * (index + 1)}
            >
              <div>
                <EmployeeCard
                  key={index}
                  id={employee?.id}
                  name={employee?.name}
                  office={employee?.office?.name}
                  department={employee?.department?.name}
                  position={employee?.position?.name}
                  imagePath={employee?.image_path}
                  handleFetchEmployeeData={handleFetchEmployeeData}
                  handleDeleteUser={handleDeleteUser}
                />
              </div>
            </Grow>
          );
        })}
      </div>
      {/* </Box> */}
      <EmployeeModal
        employeeFormOptions={normalizeEmployeeFormOptions()}
        refetchEmployeesList={refetchEmployeesList}
        formData={formData}
        setFormData={setFormData}
        formDataInitialState={formDataInitialState}
        setEmployeeId={setEmployeeId}
      />

      <DeleteEmployeeModal deleteEmployeeMutation={deleteUserFunc} />
    </div>
  );
};

export default Employees;
