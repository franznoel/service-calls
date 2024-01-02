import { Button, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";
import { Departments } from "../models/firestore/schedule";
import {useState } from "react";
import { PrintOutlined } from "@mui/icons-material";
import saveScheduleReport from "../services/print-schedule-report";

const PageScheduler = () => {
  const sessionDate = sessionStorage.getItem('date');
  const [date, setDate] = useState<Dayjs>(!sessionDate ? dayjs() : dayjs(sessionDate));
  const dateString = dayjs(date).format('MMMM D, YYYY, dddd');

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
    sessionStorage.setItem('date', newDate);
  }

  const handlePrint = () => {
    saveScheduleReport(date);
  }

  return (
    <div>
      <CustomAppBar />
      <CustomTabs page="schedules" />
      <div style={{ margin: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">{dateString}</Typography>
            <DatePicker label="Date" value={date} sx={{ width: 400 }} onChange={(newDate: any) => handleDateChange(newDate)}/>
            <Button onClick={handlePrint} variant="outlined" sx={{ padding: '1rem 0', float: 'right' }}>
              <PrintOutlined />
            </Button>
          </Grid>
        </Grid>
        <CallScheduleTable department={Departments.ANESTHESIA} date={date} />
        <CallScheduleTable department={Departments.LABOR_AND_DELIVERY} date={date} />
        <CallScheduleTable department={Departments.OPERATING_ROOM} date={date} />
        <CallScheduleTable department={Departments.PACU} date={date} />
        <CallScheduleTable department={Departments.RECOVERY_ROOM} date={date} />
      </div>
    </div>
  );
}

export default PageScheduler;
