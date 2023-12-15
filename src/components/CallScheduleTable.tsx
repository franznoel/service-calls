import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CallScheduleModalBookingForm from "./CallScheduleModalBookingForm";
import { getDepartmentSchedulesByDate, iAssignedEmployee } from "../models/firestore/schedule";

const columns = [
  { field: 'timeFrom', headerName: 'Time From', width: 100 },
  { field: 'timeTo', headerName: 'Time To', width: 100 },
  { field: 'position', headerName: 'Position', width: 200 },
  { field: 'fullName', headerName: 'Name', width: 200 },
  { field: 'firstCall', headerName: '1st Call', width: 200 },
  { field: 'secondCall', headerName: '2nd Call', width: 200 },
  { field: 'calledBy', headerName: 'Called By', width: 200 },
  { field: 'timeResponded', headerName: 'Time Responded', width: 200 },
];

const CallScheduleTable = ({ date, department }: any) => {
  const [open, setOpen] = useState(false);
  const [schedules, setSchedules] = useState<iAssignedEmployee[]>([]);
  const dateString = date.format('YYYY-MM-DD');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDepartmentSchedulesByDate(dateString, department)
      .then((schedules: any) => {
        setSchedules(schedules);
      })
  }, [dateString, department])

  return (
    <div style={{ margin: '2rem 0 2rem 0' }}>
      <Divider variant="fullWidth" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginTop: '1rem'}}>{department}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="small" onClick={() => handleOpen()}>Add</Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={schedules}
            columns={columns}
            pageSizeOptions={[5, 10, 20, 100]}
            isCellEditable={() => true}
            autoHeight
          />
        </Grid>
      </Grid>
      <CallScheduleModalBookingForm
        date={date}
        department={department}
        open={open}
        handleClose={handleClose}
        setSchedules={setSchedules}
        schedules={schedules}
      />
    </div>
  )
}

export default CallScheduleTable;
