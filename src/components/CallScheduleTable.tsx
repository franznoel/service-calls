import { Divider, Grid, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: 'date', headerName: 'Date', width: 70 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'firstCall', headerName: '1st Call', width: 200 },
  { field: 'secondCall', headerName: '2nd Call', width: 200 },
  { field: 'calledBy', headerName: 'Called By', width: 200 },
  { field: 'timeResponded', headerName: 'Time Responded', width: 200 },
];

const CallScheduleTable = ({ title }: any) => {
  return (
    <div style={{ margin: '2rem 0 2rem 0' }}>
      <Divider variant="fullWidth" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginTop: '1rem'}}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <DataGrid
            rows={[]}
            columns={columns}
            autoPageSize
            pageSizeOptions={[5, 10, 20]}
            isCellEditable={() => true}
            slots={{ toolbar: Toolbar }}
            autoHeight
          />
        </Grid> 
      </Grid>
    </div>
  )
}

export default CallScheduleTable;
