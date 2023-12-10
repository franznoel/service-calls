import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";
import { useState } from "react";

const PageRoot = () => {
  const [now, setNow] = useState<Dayjs|null>(dayjs());

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            In-House And Preoperative Servics Call Schedule
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: '1rem' }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1">{now?.format('MMMM D, YYYY, dddd')}</Typography>
              <DatePicker label="Date" value={now} sx={{ width: 400 }} onChange={(date) => setNow(date)}/>
            </Grid>
          </Grid>
        </form>
        <CallScheduleTable title="Anesthesia" />
        <CallScheduleTable title="Labor and Delivery" />
        <CallScheduleTable title="Operating Room" />
        <CallScheduleTable title="Operating Room Staff/PACU" />
        <CallScheduleTable title="Recovery Room Staff" />
      </div>
    </div>
  );
}

export default PageRoot;
