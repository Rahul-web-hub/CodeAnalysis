import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Stack,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', to: '/' },
    { text: 'Explore', to: '/explore' },
  ];

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ 
        textAlign: 'center', 
        bgcolor: '#282828', 
        color: 'white', 
        height: '100%' 
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <RouterLink
              to={item.to}
              style={{
                width: '100%',
                padding: '12px 16px',
                color: '#f5f5f5',
                textDecoration: 'none',
              }}
            >
              <ListItemText primary={item.text} />
            </RouterLink>
          </ListItem>
        ))}
        {isAuthenticated ? (
          <ListItem disablePadding>
            <Button
              onClick={onLogout}
              sx={{
                width: '100%',
                padding: '12px 16px',
                color: '#f5f5f5',
                justifyContent: 'left',
                '&:hover': {
                  backgroundColor: '#3c3c3c',
                },
              }}
            >
              Logout
            </Button>
          </ListItem>
        ) : (
          <>
            <ListItem disablePadding>
              <RouterLink
                to="/login"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  color: '#f5f5f5',
                  textDecoration: 'none',
                }}
              >
                Login
              </RouterLink>
            </ListItem>
            <ListItem disablePadding>
              <RouterLink
                to="/register"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  color: '#f5f5f5',
                  textDecoration: 'none',
                }}
              >
                Register
              </RouterLink>
            </ListItem>
          </>
        )}
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
          bgcolor: '#282828',
          color: 'white',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#ffa116',
                marginLeft: '10px',
              }}
            >
              CodeAnalysis
            </Typography>

            {!isMobile && (
              <Stack direction="row" spacing={2} sx={{ marginLeft: 2 }}>
                {menuItems.map((item) => (
                  <RouterLink
                    key={item.text}
                    to={item.to}
                    style={{
                      color: '#f5f5f5',
                      textDecoration: 'none',
                      padding: '8px 16px',
                    }}
                  >
                    {item.text}
                  </RouterLink>
                ))}
              </Stack>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isAuthenticated ? (
              <Button
                onClick={onLogout}
                sx={{
                  color: '#f5f5f5',
                  bgcolor: '#3c3c3c',
                  padding: '6px 16px',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: '#4d4d4d',
                  },
                  display: 'flex',
                  alignItems: 'center',
                }}
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            ) : (
              <>
                <RouterLink
                  to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    marginRight: '8px',
                  }}
                >
                  <Button
                    sx={{
                      color: '#282828',
                      bgcolor: '#ffa116',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      '&:hover': {
                        bgcolor: '#ffaa29',
                      },
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    startIcon={<LoginIcon />}
                  >
                    Login
                  </Button>
                </RouterLink>

                <RouterLink
                  to="/register"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                  }}
                >
                  <Button
                    sx={{
                      color: '#ffa116',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      border: '1px solid #ffa116',
                      '&:hover': {
                        bgcolor: 'rgba(255, 161, 22, 0.1)',
                      },
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    Register
                  </Button>
                </RouterLink>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240, 
            bgcolor: '#282828', 
            color: 'white' 
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;