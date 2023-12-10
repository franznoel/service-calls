import { Button, Grid, TextField } from "@mui/material"
import CallScheduleModal from "./CallScheduleModal";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const CallScheduleModalBookingForm = ({ title, open, handleClose }: any) => {
  return (
    <CallScheduleModal title={title} open={open} handleClose={handleClose}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DateTimePicker label="Time From" />
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker label="Time To" />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Full Name" fullWidth/>
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

export default CallScheduleModalBookingForm;
