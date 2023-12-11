import React from "react";
import { Tab, Tabs } from "@mui/material"
import { useNavigate } from "react-router-dom";

const CustomTabs = ({ page }: any) => {
  const navigate = useNavigate();

  const handleNavigate = (e: any, newValue: string) => {
    navigate(`/${newValue}`);
  }

  return (
    <Tabs value={page} onChange={handleNavigate} aria-label="Navigation">
      <Tab label="Schedules" value="schedules" />
      <Tab label="Directory" value="directory" />
    </Tabs>
  )  
}

export default CustomTabs;
