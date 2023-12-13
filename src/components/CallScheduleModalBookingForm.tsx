import React, { useState } from "react";
import { Autocomplete, Button, Grid, MenuItem, Select, TextField } from "@mui/material"
import CallScheduleModal from "./CallScheduleModal";
import dayjs, { Dayjs } from "dayjs";
import { iSearch, searchEmployee } from "../models/firestore/employee";
import { TimePicker } from "@mui/x-date-pickers";
import { saveSchedule } from "../models/firestore/schedule";
import { useNavigate } from "react-router-dom";

const CallScheduleModalBookingForm = ({ date, title, open, handleClose, existingSchedules }: any) => {
  const navigate = useNavigate();
  const [timeFrom, setTimeFrom] = useState<Dayjs>(dayjs());
  const [timeTo, setTimeTo] = useState<Dayjs>(dayjs());
  const [position, setPosition] = useState<string>('RN');
  const [searchedEmployees, setSearchedEmployees] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<null|iSearch>(null);
  const [inputValue, setInputValue] = useState('');

  const submitHandler = (e: any) => {
    e.preventDefault()
    const newSchedule = {
      timeFrom: timeFrom.format('HH:mm'),
      timeTo: timeTo.format('HH:mm'),
      title: position,
      id:  searchedEmployees[0].id,
      employeeId: searchedEmployees[0].id,
      fullName: searchedEmployees[0].label,
      department: title,
      firstCall: searchedEmployees[0].phone1,
      secondCall: searchedEmployees[0].phone2,
    };

    const schedule = {
      date: date.format('YYYY-MM-DD'),
      schedules: [
        newSchedule,
        ...existingSchedules
      ]
    }

    saveSchedule(schedule);
    navigate(0);
  }

  const handleSearch = (value: string) => {
    setInputValue(value);
    searchEmployee({ id: '', label: value }).then((employees: any) => {
      setSearchedEmployees(employees);
    });
  }

  return (
    <CallScheduleModal title={title} open={open} handleClose={handleClose}>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TimePicker label="Time From" onChange={(value: any)=>setTimeFrom(value)} value={timeFrom} />
          </Grid>
          <Grid item xs={12}>
            <TimePicker label="Time To" onChange={(value: any)=>setTimeTo(value)} value={timeTo}/>
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
            <Autocomplete
              options={searchedEmployees}
              value={searchValue}
              renderInput={(params) => <TextField {...params} label="Name" />}
              onChange={(e, value) => setSearchValue(value)}
              inputValue={inputValue}
              onInputChange={(e, value) => handleSearch(value)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
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
