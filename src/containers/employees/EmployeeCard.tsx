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
  imagePath: string;
}

const EmployeeCard: React.FC<Props> = ({
  name = "employee name",
  office = "office",
  department = "department",
  position = "position",
  imagePath,
}) => {
  const employeeInitials = getNameInitials(name);

  return (
    <div className="employee-card">
      <div className="h-[100px] w-[100px] overflow-hidden rounded-full bg-black self-center bg-white border border-black">
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
              bgcolor: "#333",
              borderBottom: "3px solid dodgerblue",
              alignSelf: "center",
            }}
          >
            {employeeInitials}
          </Avatar>
        )}
      </div>
      <div className="flex flex-col justify-around">
        <p className="capitalize">- {name}</p>
        <p className="capitalize">- {office}</p>
        <p className="capitalize">- {department}</p>
        <p className="capitalize">- {position}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
