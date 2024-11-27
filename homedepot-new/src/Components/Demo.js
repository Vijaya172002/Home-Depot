import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Menu, MenuItem, Box, useTheme, CssBaseline, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import MuiAppBar from '@mui/material/AppBar';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AdminDashboard from '../Admin/AdminDashboard';
import { Route, Routes, Link } from 'react-router-dom';
import Incidents from '../Admin/Incidents';
import CreateIncidents from '../User/CreateIncident';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const GradientDrawer = styled(Box)(({ theme }) => ({
  width: drawerWidth,
  height: '100%',
  background: 'linear-gradient(to bottom, #002171, #82b1ff)',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textRendering: 'optimizeLegibility', // Improve text rendering
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: '#000',
  variants: [
    {
      props: ({ open }) => open,
      style: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const Demo = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  //
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* Menu Icon */}

          <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 22, ml: 3 }}>
            Incident Management
          </Typography>
          {/* Icons on the right */}
          {/* <IconButton color="inherit">
            <AddIcon sx={{ fontSize: 24 }} />
          </IconButton> */}
          {/* <IconButton color="inherit" component={Link} to="/">
            <LogoutIcon sx={{ fontSize: 24 }} />
          </IconButton> */}
          {/* Avatar that triggers the menu */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              alt="S"
              src="url"
              sx={{
                width: 40,
                height: 40,
                backgroundColor: 'white', // White background
                color: 'black',           // Black text color
                fontWeight: 'bold',       // Optional: To make the text bold
                border: '1px solid black',
              }}
            />
          </IconButton>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {/* Logout Menu Item */}
            <MenuItem
              component={Link}
              to="/"
              onClick={handleMenuClose}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            marginTop: `65px`, // Drawer starts below the App Bar
          },
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <GradientDrawer>
          {/* <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <img src="https://firebasestorage.googleapis.com/v0/b/me-portal.appspot.com/o/Miraclelogo%2FMiracle-Logo-White.png?alt=media&token=284bfe57-14a0-49eb-823b-c891e2278d5e" alt="Logo" style={{ height: '65px', marginLeft: '18px' }} />
          </Typography> */}
          <img
            src="https://me.miraclesoft.com/assets/img/miracle-logo.svg"
            alt="Logo"
            style={{ height: '65px', marginLeft: '18px', marginBottom: '3px' }} // Adjust marginBottom
          />
          {/* <Typography variant="h5" component="div" >
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2
            }}
          >
            {/* <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'white',
                color: 'black',
                fontSize: 54,
              }}
            >
              s
            </Avatar> */}
            <Avatar alt="s" src="https://images.miraclesoft.com/employee-profile-pics/sthota1.png" sx={{
              width: 65, height: 65, border: '0.5px solid white', // White outline
              boxShadow: '0 0 0 0.5px white',
            }} />
            <Typography variant="h6" sx={{ mt: 1 }}>
              sthota
            </Typography>
          </Box>
          <Divider sx={{ bgcolor: 'white', width: '80%', my: 2 }} />
          {/* Menu Items */}
          <List sx={{ width: '100%', }}>
            <ListItem component={Link} to="./dashboard" sx={{ color: 'white' }}>
              <ListItemIcon ><DashboardIcon sx={{ fontSize: 28, color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="./create-incidents" sx={{ color: 'white' }}>
              <ListItemIcon ><AddCircleOutline sx={{ fontSize: 28, color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Create Incident" />
            </ListItem>
            <ListItem component={Link} to="./incidents" sx={{ color: 'white' }}>
              <ListItemIcon ><ReportProblemIcon sx={{ fontSize: 28, color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Incidents" />
            </ListItem>
            <ListItem component={Link} to="/" sx={{ color: 'white' }}>
              <ListItemIcon ><LogoutIcon sx={{ fontSize: 28, color: 'white' }} /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </GradientDrawer>
        {/* <DrawerHeader/> */}
        {/* <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>
          <Routes>
            {/* <Route path='/' element={<Navigate to="dashboard" replace />} /> */}
            <Route path='/dashboard' element={<AdminDashboard />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/create-incidents" element={<CreateIncidents />} />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
}

export default Demo;
