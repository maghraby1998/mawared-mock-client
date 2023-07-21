import React, { useState } from "react";
import { Avatar, Box, Grow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getNameInitials } from "../../helpers/helpers";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

interface Props {
  id: number;
  name: string;
  office: string;
  department: string;
  position: string;
  imagePath: string;
  handleFetchEmployeeData: (employeeId: number) => void;
}

const EmployeeCard: React.FC<Props> = ({
  id,
  name,
  office,
  department,
  position,
  imagePath,
  handleFetchEmployeeData,
}) => {
  const employeeInitials = getNameInitials(name);

  const handleEditButton = (employeeId: number) => {
    handleFetchEmployeeData(employeeId);
  };

  const [isEmployeeSettingsHovered, setIsEmployeeSettingsHovered] =
    useState(false);

  return (
    <div className="employee-card">
      <div className="flex flex-col items-center justify-center">
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
        <div
          className="w-fit cursor-pointer"
          onMouseEnter={() => setIsEmployeeSettingsHovered(true)}
          onMouseLeave={() => setIsEmployeeSettingsHovered(false)}
        >
          <SettingsIcon className="base-icon-style text-primary-color" />
          {isEmployeeSettingsHovered ? (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                position: "absolute",
                backgroundColor: "#C5DFF8",
                paddingInline: 5,
                borderRadius: 5,
              }}
            >
              {/* Conditionally applies the timeout prop to change the entry speed. */}
              <Grow
                in={isEmployeeSettingsHovered}
                style={{ transformOrigin: "0 0 0" }}
                {...(isEmployeeSettingsHovered ? { timeout: 1000 } : {})}
              >
                <button
                  onClick={() => handleEditButton(id)}
                  title="edit"
                  // className="absolute bottom-0 right-0"
                >
                  <EditIcon className="base-icon-style edit-icon" />
                </button>
              </Grow>
            </Box>
          ) : null}
        </div>
      </div>
      <div className="employee-card-divider"></div>
      <div className="flex flex-col justify-start">
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
      </div>
    </div>
  );
};

export default EmployeeCard;
