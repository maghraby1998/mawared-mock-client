import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import SuperCompaniesList from "./SuperCompaniesList";

const Super = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_: any, value: any) => {
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
        <SuperCompaniesList />
      ) : value === 1 ? (
        <div>tab two</div>
      ) : (
        <div>tab three</div>
      )}
    </div>
  );
};

export default Super;
