import { Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import CallScheduleModal from "./CallScheduleModal";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const CallScheduleModalBookingForm = ({ title, open, handleClose }: any) => {
  const [timeFrom, setTimeFrom] = useState<Dayjs>(dayjs());
  const [timeTo, setTimeTo] = useState<Dayjs>(dayjs());
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState<string>('RN');

  return (
    <CallScheduleModal title={title} open={open} handleClose={handleClose}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DateTimePicker label="Time From" onChange={(value: any)=>setTimeFrom(value)} value={timeFrom} />
          </Grid>
          <Grid item xs={12}>
            <DateTimePicker label="Time To" onChange={(value: any)=>setTimeTo(value)} value={timeTo}/>
          </Grid>
          <Grid item xs={12}>
            <Select value={position} label="Title" onChange={(e)=>setPosition(e.target.value)} fullWidth>
              <MenuItem value="RN">RN</MenuItem>
              <MenuItem value="RN1">RN #1</MenuItem>
              <MenuItem value="RN2">RN #2</MenuItem>
              <MenuItem value="MD">M.D.</MenuItem>
              <MenuItem value="CRNA">CRNA</MenuItem>
              <MenuItem value="ORT">OR Tech</MenuItem>
              <MenuItem value="ORT">On Call Training</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} fullWidth/>
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
