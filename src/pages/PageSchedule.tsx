import { Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";
import { getSchedulesByDate } from "../models/firestore/schedule";
import { useEffect, useState } from "react";

const PageScheduler = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [schedules, setSchedules] = useState<any>(null);
  const [anesthesiaSchedules, setAnesthesiaSchedules] = useState([]);
  const [laborAndDeliverySchedules, setLaborAndDeliverySchedules] = useState([]);
  const [operatingRoomSchedules, setOperatingRoomSchedules] = useState([]);
  const [pacuSchedules, setPacuSchedules] = useState([])
  const [recoveryRoomSchedules, setRecoveryRoomSchedules] = useState([]);

  useEffect(() => {
    const givenDate = date.format('YYYY-MM-DD');
    getSchedulesByDate(givenDate).then((scheduleDoc: any) => {
      console.log('schedules', givenDate, schedules);
      if (!schedules || (schedules.date !== givenDate)) {
        setSchedules(scheduleDoc.data());
      }
    });
  }, [date, schedules])

  console.log('schedules', schedules);
  
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
        <CallScheduleTable title="Anesthesia" date={date} data={anesthesiaSchedules}/>
        <CallScheduleTable title="Labor and Delivery" date={date} data={laborAndDeliverySchedules}/>
        <CallScheduleTable title="Operating Room" date={date} data={operatingRoomSchedules}/>
        <CallScheduleTable title="Operating Room Staff/PACU" date={date} data={pacuSchedules}/>
        <CallScheduleTable title="Recovery Room Staff" date={date} data={recoveryRoomSchedules}/>
      </div>
    </div>
  );
}

export default PageScheduler;
