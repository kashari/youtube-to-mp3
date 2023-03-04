import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HamburgerMenu from "./HamburgerMenu";

export default function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
            <HamburgerMenu />
          <Typography variant="h6" color="inherit" component="div">
            YTmp3/4
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}