import React, { useState } from "react";
import CustomAppBar from "../components/CustomAppBar";
import CustomTabs from "../components/CustomTabs";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DirectoryForm from "../components/DirectoryForm";

const columns = [
  { field: 'nameFull', headerName: 'Full Name', width: 300 },
  { field: 'phone1', headerName: 'Phone 1' },
  { field: 'phone2', headerName: 'Phone 2' },
  { field: 'employmentStatus', headerName: 'Employment Status', width: 300 },
]

const PageDirectory = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              rows={[]}
              columns={columns}
              autoPageSize
              pageSizeOptions={[5, 10, 20]}
              isCellEditable={() => true}
              autoHeight
              slots={{ toolbar: GridToolbar}}
            />
          </Grid>
        </Grid>
        <DirectoryForm title="Add Employee" open={open} handleClose={handleClose} />
      </div>
    </div>
  )  
}

export default PageDirectory;
