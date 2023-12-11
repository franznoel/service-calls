import { Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";
import { useState } from "react";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";

const PageRoot = () => {
  const [date, setDate] = useState<Dayjs|null>(dayjs());

  return (
    <div>
      <CustomAppBar />
      <CustomTabs page="schedules" />
      <div style={{ margin: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">{date?.format('MMMM D, YYYY, dddd')}</Typography>
            <DatePicker label="Date" value={date} sx={{ width: 400 }} onChange={(newDate) => setDate(newDate)}/>
          </Grid>
        </Grid>
        <CallScheduleTable title="Anesthesia" date={date}/>
        <CallScheduleTable title="Labor and Delivery" date={date}/>
        <CallScheduleTable title="Operating Room" date={date}/>
        <CallScheduleTable title="Operating Room Staff/PACU" date={date}/>
        <CallScheduleTable title="Recovery Room Staff" date={date}/>
      </div>
    </div>
  );
}

export default PageRoot;
