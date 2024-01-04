import React, { useState } from "react";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DirectoryForm from "../components/DirectoryForm";
import { deleteEmployee, getEmployees } from "../models/firestore/employee";
import { useLoaderData, useNavigate } from "react-router-dom";

const columns = [
  { field: 'fullName', headerName: 'Full Name', width: 300 },
  { field: 'phone1', headerName: 'Phone 1', width: 200 },
  { field: 'phone2', headerName: 'Phone 2', width: 200 },
  { field: 'employmentStatus', headerName: 'Employment Status', width: 300 },
];

const PageDirectory = () => {
  const navigate = useNavigate();
  const data: any = useLoaderData();
  const [employees, setEmployees] = useState<any[]>(data.employees ?? []);
  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('.', { replace: true });
  };

  const handleDelete = () => {
    deleteEmployee(selectedEmployeeId);
    setEmployees(data.employees.filter((employee: any) => employee.id !== selectedEmployeeId))
  }

  return (
    <div>
      <CustomAppBar />
      <CustomTabs page="directory" />
      <div style={{ margin: '1rem' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginTop: '1rem'}}>Directory</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="small" onClick={() => handleOpen()}>Add Employee</Button>
              <Button variant="contained" size="small" onClick={() => handleDelete()}>Delete Employee</Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              columns={columns}
              rows={employees}
              pageSizeOptions={[5, 10, 20, 100]}
              isCellEditable={() => true}
              slots={{ toolbar: GridToolbar}}
              onRowSelectionModelChange={(employeeId: any) => setSelectedEmployeeId(employeeId[0])}
              autoHeight
            />
          </Grid>
        </Grid>
        <DirectoryForm title="Add Employee" open={open} handleClose={handleClose} />
      </div>
    </div>
  )  
}

export const directoryLoader = async () => {
  const employees = await getEmployees();
  return { employees };
}

export default PageDirectory;
