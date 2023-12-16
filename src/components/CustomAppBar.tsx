import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { AuthProviderContext } from "../context/AuthProviderContext";
import { useContext, useState } from "react";
import { AccountCircle } from "@mui/icons-material";

const CustomAppBar = () => {
  const authContext = useContext<any>(AuthProviderContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Service Call Schedules
        </Typography>
        {authContext.currentUser && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                mt: '2rem',
                display: { xs: 'block', md: 'block' },
              }}
            >
              <MenuItem onClick={()=>authContext.handleLogout()}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default CustomAppBar;
