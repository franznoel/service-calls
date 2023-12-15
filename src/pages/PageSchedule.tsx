import { Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";
import { Departments } from "../models/firestore/schedule";
import {useState } from "react";

const PageScheduler = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());

  return (
    <div>
      <CustomAppBar />
      <CustomTabs page="schedules" />
      <div style={{ margin: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">{dayjs(date).format('MMMM D, YYYY, dddd')}</Typography>
            <DatePicker label="Date" value={date} sx={{ width: 400 }} onChange={(newDate: any) => setDate(newDate)}/>
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
