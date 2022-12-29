import * as React from 'react';
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Tooltip, Avatar } from "@mui/material";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';

export default function Navbar() {

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <SportsBarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                ml: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 600,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              BEER CATALOG
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Change theme">
                <IconButton sx={{ p: 2 }}>
                  <Brightness7Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User settings">
                <IconButton sx={{ p: 0 }}>
                  <PersonIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}