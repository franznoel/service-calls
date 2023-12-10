import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CallScheduleTable from "../components/CallScheduleTable";

const PageRoot = () => {
  const now = dayjs();

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
              <Typography variant="body1">{now.format('dddd')}</Typography>
              <DatePicker label="Date" value={now} sx={{ width: 400 }} />
            </Grid>
          </Grid>
        </form>
        <CallScheduleTable title="Anesthesia" />
        <CallScheduleTable title="Operating Room" />
        <CallScheduleTable title="O.R. Staff/PACU" />
        <CallScheduleTable title="R.R. Staff" />
      </div>
    </div>
  );
}

export default PageRoot;
