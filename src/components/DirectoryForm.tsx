import React, { useState } from "react";
import { Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import CallScheduleModal from "./CallScheduleModal";
import { saveEmployee } from "../models/firestore/employee";

const DirectoryForm = ({ title, open, handleClose }: any) => {
  const [fullName, setFullName] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState<string>('fullTime');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const employee = {
      fullName,
      phone1,
      phone2,
      employmentStatus
    };
    console.log('submit', employee);
    saveEmployee(employee)
    handleClose();
  }

  return (
    <CallScheduleModal title={title} open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Full Name" onChange={(e: any) => setFullName(e.target.value)} value={fullName} fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Phone 1" onChange={(e: any) => setPhone1(e.target.value)} value={phone1} fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Phone 2" onChange={(e: any) => setPhone2(e.target.value)} value={phone2} fullWidth/>
          </Grid>
          <Grid item xs={12}>
            <Select value={employmentStatus} onChange={(e: any) => setEmploymentStatus(e.target.value)} label="Employment Status" fullWidth>
              <MenuItem value="perDiem">Per Diem</MenuItem>
              <MenuItem value="partTime">Part Time</MenuItem>
              <MenuItem value="fullTime">Full Time</MenuItem>
            </Select>
          </Grid>          
          <Grid item xs={12}>
            <Button variant="contained" size="small" type="submit" style={{ marginTop: '1rem' }}>Save</Button>
            <Button variant="outlined" size="small" style={{ marginTop: '1rem', marginLeft: '1rem' }} onClick={() => handleClose()}>Close</Button>
          </Grid>
        </Grid>
      </form>
    </CallScheduleModal>
  )
}

export default DirectoryForm;
