import React from "react";
import { Avatar, Box, Grow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { getNameInitials } from "../../helpers/helpers";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupsIcon from "@mui/icons-material/Groups";

interface Props {
  id: number;
  name: string;
  office: string;
  department: string;
  position: string;
  imagePath: string;
  handleFetchEmployeeData: (employeeId: number) => void;
  handleDeleteUser: (employeeId: number) => void;
}

const EmployeeCard: React.FC<Props> = ({
  id,
  name,
  office,
  department,
  position,
  imagePath,
  handleFetchEmployeeData,
  handleDeleteUser,
}) => {
  const employeeInitials = getNameInitials(name);

  const handleEditButton = (employeeId: number) => {
    handleFetchEmployeeData(employeeId);
  };

  return (
    <div className="employee-card">
      <div className="h-[100px] min-w-[100px] w-[100px] overflow-hidden rounded-full bg-black self-center bg-white border border-black">
        {imagePath ? (
          <img
            className="h-full w-full"
            src={`data:image/jpeg;base64,${imagePath}`}
            alt="Red dot"
          />
        ) : (
          <Avatar
            sx={{
              height: "100%",
              width: "100%",
              bgcolor: "#C5DFF8",
              borderBottom: "5px solid #4A55A2",
              alignSelf: "center",
              color: "#4A55A2",
            }}
          >
            {employeeInitials}
          </Avatar>
        )}
      </div>
      <div className="employee-card-divider"></div>
      <div className="flex flex-col justify-between pb-[3px]">
        <p title={name} className="capitalize employee-card-name">
          <PersonIcon className="base-icon-style text-primary-color mr-[5px]" />
          {name}
        </p>
        <p className="capitalize">
          <ApartmentIcon className="base-icon-style text-primary-color mr-[5px]" />
          {office}
        </p>
        <p className="capitalize">
          <GroupsIcon className="base-icon-style text-primary-color mr-[5px]" />
          {department}
        </p>
        <p className="capitalize">
          <ManageAccountsIcon className="base-icon-style text-primary-color mr-[5px]" />
          {position}
        </p>
        <Box
          sx={{
            display: "flex",
            // gap: 1,
            alignItems: "center",
            justifyContent: "between",
            // backgroundColor: "#C5DFF8",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Grow className="flex-1 bg-red-400" in={true} timeout={100}>
            <button onClick={() => handleDeleteUser(id)} title="edit">
              <DeleteForeverIcon className="base-icon-style edit-icon text-white" />
            </button>
          </Grow>
          <Grow className="flex-1 bg-slate-400" in={true} timeout={100}>
            <button
              onClick={() => {
                handleEditButton(id);
              }}
              title="edit"
            >
              <EditIcon className="base-icon-style edit-icon text-white" />
            </button>
          </Grow>
          {/* <Grow className="flex-1 bg-sky-400" in={true} timeout={100}>
            <button onClick={() => handleEditButton(id)} title="edit">
              <EditIcon className="base-icon-style edit-icon" />
            </button>
          </Grow> */}
        </Box>
      </div>
    </div>
  );
};

export default EmployeeCard;
