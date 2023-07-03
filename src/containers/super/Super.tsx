import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import SuperCompanies from "./SuperCompanies";

const Super = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e: any, value: any) => {
    setValue(value);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Companies" />
          <Tab label="plans" />
        </Tabs>
      </Box>
      {value === 0 ? (
        <SuperCompanies />
      ) : value === 1 ? (
        <div>tab two</div>
      ) : (
        <div>tab three</div>
      )}
    </div>
  );
};

export default Super;
