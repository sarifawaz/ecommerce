import React, { useState } from 'react';
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem, Badge  } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo2.png'
import { ShoppingCart } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

const pages = ['Home', 'About', 'Contact'];

const NavBar = ({ totalItems }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="static" color="default" sx={{ mb: '1rem' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component='img'
            sx={{ mr: 1, objectFit: 'contain' }}
            src={logo}
            alt="E-Commerce"
            height="25px"
          />
          <Typography
            component={Link}
            to="/"
            variant="h6"
            noWrap
            sx={{
              lineHeight: 'center',
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            E-Commerce
          </Typography>
          
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to="/"
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ mr: '1rem', color: 'black', display: 'block'}}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          {location.pathname === '/' && (
          <IconButton
              component={Link}
              to="/cart"
              size='small'
              aria-label="show cart item"
              color="inherit"
              edge='end'>
            <Badge 
              badgeContent={totalItems} 
              color='error'>
              <ShoppingCart />
            </Badge>
          </IconButton> ) }
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
