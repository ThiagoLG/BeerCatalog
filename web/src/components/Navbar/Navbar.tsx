import * as React from 'react';
import { AppBar, Container, Toolbar, Typography, Box, IconButton } from "@mui/material";
import SportsBarIcon from '@mui/icons-material/SportsBar';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '../CustomFormsComponents/Tooltip';

export default function Navbar() {

  return (
    <>
      <AppBar position="static">

        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display:'flex', flexDirection: "row", justifyContent: 'space-between' }}>

            <Box sx={{ display:'flex', flexDirection: "row", alignItems: 'center' }}>

              {/* Icon */}
              <SportsBarIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />


              {/* Text */}
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

            </Box>


            <Box sx={{ display:'flex', flexDirection: "row", alignItems: 'center' }}>

              {/* Theme control */}
              <Box sx={{ flexGrow: 1 }}>
                <Tooltip title="Change theme">
                  <IconButton sx={{ p: 2 }}>
                    <Brightness7Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                  </IconButton>
                </Tooltip>
              </Box>


              {/* User Settings */}
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="User settings">
                  <IconButton sx={{ p: 0 }}>
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
              </Box>

            </Box>

          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}