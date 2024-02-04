import React from "react";
import { Tab, Tabs } from "@mui/material"
import { useNavigate } from "react-router-dom";

const CustomTabs = ({ page }: any) => {
  const currentPage = !page ? 'schedules' : page;
  const navigate = useNavigate();

  const handleNavigate = (e: any, newValue: string) => {
    navigate(`/${newValue}`);
  }

  return (
    <Tabs
      value={currentPage}
      onChange={handleNavigate}
      aria-label="Navigation"
      sx={{
        flexGrow: 100,
        display: 'flex',
      }}
      textColor="inherit"
      selectionFollowsFocus
    >
      <Tab label="Schedules" value="schedules" />
      <Tab label="Directory" value="directory" />
    </Tabs>
  )  
}

export default CustomTabs;
