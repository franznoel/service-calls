import { AppBar, Toolbar, Typography } from "@mui/material"

const CustomAppBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Service Call Schedules
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar;
