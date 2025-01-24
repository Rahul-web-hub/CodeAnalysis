import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
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
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
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
