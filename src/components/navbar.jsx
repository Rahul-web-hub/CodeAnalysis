import React, { useState } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Stack,
  Box,
  Link,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Explore', href: '#' },
    { text: 'Problems', href: '#' },
    { text: 'Discuss', href: '#' },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: 'center', bgcolor: '#1A1A1A', color: 'white', height: '100%' }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <Link
              href={item.href}
              color="inherit"
              underline="none"
              sx={{
                width: '100%',
                padding: '12px 16px',
                color: 'white',
                display: 'block',
                '&:hover': {
                  backgroundColor: '#2E2E2E',
                }
              }}
            >
              <ListItemText primary={item.text} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          left: 0,
          right: 0,
          top: 0,
          bgcolor: '#1A1A1A',
          color: 'white',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            padding: '0 16px',
            minHeight: '64px',
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: 'orange',
                marginRight: '16px',
              }}
            >
              CodeAnalysis
            </Typography>
            {!isMobile && (
              <Stack direction="row" spacing={2}>
                {menuItems.map((item) => (
                  <Link
                    key={item.text}
                    href={item.href}
                    color="inherit"
                    underline="none"
                    sx={{
                      color: '#fff9',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      transition: 'background-color 0.3s',
                      '&:hover': {
                        backgroundColor: '#2E2E2E',
                      }
                    }}
                  >
                    {item.text}
                  </Link>
                ))}
              </Stack>
            )}
          </Box>

          {/* <Button
            sx={{ color: 'white' }}
            onClick={() => isAuthenticated ? logout({ returnTo: window.location.origin }) : loginWithRedirect()}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button> */}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, bgcolor: '#1A1A1A', color: 'white' },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
