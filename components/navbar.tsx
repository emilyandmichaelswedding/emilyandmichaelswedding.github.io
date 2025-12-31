import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Mate } from 'next/font/google'

const mate = Mate({ subsets: ['latin'], weight: ["400"] });

const fontFamily = mate.style.fontFamily;

export default function ButtonAppBar() {
  return (
    <Box className={mate.className} sx={{ fontFamily }}>
        <Toolbar variant="dense" className={mate.className} sx={{ fontFamily }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily }} className={mate.className}>
        </Typography>
          <Button color="inherit" href="/home" className={mate.className + " text-md"} sx={{ fontFamily, textTransform: 'none' }}>Home</Button>
          <Button color="inherit" href="/schedule" className={mate.className + " text-md"} sx={{ fontFamily, textTransform: 'none' }}>Schedule of Events</Button>
        </Toolbar>
    </Box>
  );
}