import { Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";
import { Departments, getSchedulesByDate } from "../models/firestore/schedule";
import { useEffect, useState } from "react";

const PageScheduler = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [schedules, setSchedules] = useState<any>(null);

  useEffect(() => {
    const givenDate = date.format('YYYY-MM-DD');
    getSchedulesByDate(givenDate).then((scheduleDoc: any) => {
      if (!schedules || (schedules.date !== givenDate)) {
        setSchedules(scheduleDoc.data());
      }
    });
  }, [date, schedules])

  const anesthesiaSchedules = schedules?.schedules.filter((schedule: any) => schedule.department === Departments.ANESTHESIA) ?? [];
  const laborAndDeliverySchedules = schedules?.schedules.filter((schedule: any) => schedule.department === Departments.LABOR_AND_DELIVERY) ?? [];
  const operatingRoomSchedules = schedules?.schedules.filter((schedule: any) => schedule.department === Departments.OPERATING_ROOM) ?? [];
  const pacuSchedules = schedules?.schedules.filter((schedule: any) => schedule.department === Departments.PACU) ?? [];
  const recoveryRoomSchedules = schedules?.schedules.filter((schedule: any) => schedule.department === Departments.RECOVERY_ROOM) ?? [];
  const existingSchedules = schedules && (schedules?.schedules ?? []);

  console.log('anesthesiaSchedules', anesthesiaSchedules);

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
        <CallScheduleTable title={Departments.ANESTHESIA} date={date} data={anesthesiaSchedules} existingSchedules={existingSchedules} />
        <CallScheduleTable title={Departments.LABOR_AND_DELIVERY} date={date} data={laborAndDeliverySchedules} existingSchedules={existingSchedules}/>
        <CallScheduleTable title={Departments.OPERATING_ROOM} date={date} data={operatingRoomSchedules} existingSchedules={existingSchedules}/>
        <CallScheduleTable title={Departments.PACU} date={date} data={pacuSchedules} existingSchedules={existingSchedules}/>
        <CallScheduleTable title={Departments.RECOVERY_ROOM} date={date} data={recoveryRoomSchedules} existingSchedules={existingSchedules}/>
      </div>
    </div>
  );
}

export default PageScheduler;
