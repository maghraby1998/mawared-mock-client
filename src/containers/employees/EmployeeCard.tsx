import React from "react";
import { Avatar } from "@mui/material";

const getNameInitials = (name: string): string => {
  const result: string[] = [];
  const namesArray = name.split(" ");

  if (namesArray.length === 1) {
    return namesArray[0][0].toUpperCase();
  }

  namesArray.forEach((oneName: string): void => {
    if (result.length === 2) return;
    result.push(oneName[0].toUpperCase());
  });
  return result.join(".");
};

interface Props {
  name: string;
  office: string;
  department: string;
  position: string;
}

const EmployeeCard: React.FC<Props> = ({
  name = "employee name",
  office = "office",
  department = "department",
  position = "position",
}) => {
  const employeeInitials = getNameInitials(name);

  return (
    <div className="w-[250px] h-[300px] border-2 border-slate-500 rounded flex flex-col px-3">
      <Avatar
        sx={{
          bgcolor: "#333",
          height: 80,
          width: 80,
          margin: 3,
          borderBottom: "3px solid dodgerblue",
          alignSelf: "center",
        }}
      >
        {employeeInitials}
      </Avatar>
      <p className="capitalize">- {name}</p>
      <p className="capitalize">- {office}</p>
      <p className="capitalize">- {department}</p>
      <p className="capitalize">- {position}</p>
    </div>
  );
};

export default EmployeeCard;
