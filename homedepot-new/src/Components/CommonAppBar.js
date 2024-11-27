import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const drawerWidth = 280; // Drawer width
const appBarHeight = 90; // AppBar height

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

export default function CustomAppBar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const [email, setEmail] = useState('');
    useEffect(() => {
        // Retrieve email from LocalStorage
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    if (!email) {
        return <Typography>Loading...</Typography>;
    }

    // Extract initial and username
    const initial = email.charAt(0).toUpperCase();
    const username = email.split('@')[0];
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* App Bar */}
            <AppBar
                position="static"
                sx={{
                    bgcolor: 'black',
                    height: appBarHeight,
                    justifyContent: 'center',
                }}
            >
                <Toolbar>
                    {/* Menu Icon */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon sx={{ fontSize: 30 }} /> {/* Increased icon size */}
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontSize: 22 }}>
                        Incident Management
                    </Typography>
                    {/* Icons on the right */}
                    <IconButton color="inherit">
                        <AddIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                    <IconButton color="inherit">
                        <LogoutIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        marginTop: `${appBarHeight}px`, // Drawer starts below the App Bar
                    },
                }}
            >
                <GradientDrawer>
                    {/* Avatar and Admin Name */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 3,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 80,
                                height: 80,
                                bgcolor: 'white',
                                color: 'black',
                                fontSize: 24,
                            }}
                        >
                            {initial}
                        </Avatar>
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            {username}
                        </Typography>
                    </Box>
                    <Divider sx={{ bgcolor: 'white', width: '80%', my: 2 }} />
                    {/* Menu Items */}
                    <List sx={{ width: '100%' }}>
                        {[
                            // { text: 'Home', icon: <HomeIcon sx={{ fontSize: 28 }} /> },
                            {text: 'Create', icon: <AddCircleOutline sx={{ fontSize: 28 }} />},
                            { text: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 28 }} /> },
                            { text: 'Incidents', icon: <ReportProblemIcon sx={{ fontSize: 28 }} /> },
                            { text: 'Logout', icon: <LogoutIcon sx={{ fontSize: 28 }} /> },
                        ].map((item, index) => (
                            <ListItem button key={index}>
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </GradientDrawer>
            </Drawer>
        </Box>
    );
}
