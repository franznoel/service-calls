import { AppBar, Box, Container, Divider, IconButton, ListItem, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { AuthProviderContext } from "../context/AuthProviderContext";
import { useContext, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import CustomTabs from "./CustomTabs";

const CustomAppBar = (props: any) => {
  const { currentPage } = props;
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
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: 'flex',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Service Call Schedules
          </Typography>
          <CustomTabs page={currentPage} />
          {authContext && authContext.currentUser && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{ flexGrow: 1, display: 'flex' }}
              >
                <Typography variant="body1" sx={{ mr: 1 }}>{authContext.currentUser.displayName}</Typography>
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
                  display: 'block',
                }}
              >
                <ListItem>{authContext.currentUser.displayName} ({authContext.currentUser.email})</ListItem>
                <Divider />
                <MenuItem onClick={()=>authContext.handleLogout()}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default CustomAppBar;
