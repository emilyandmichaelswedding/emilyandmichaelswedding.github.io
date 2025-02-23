import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Mate } from 'next/font/google'

const mate = Mate({ subsets: ['latin'], weight: ["400"] });

export default function ButtonAppBar() {
  return (
    <Box>
        <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        </Typography>
          <Button color="inherit" href="/" className={mate.className + " text-md"}>Home</Button>
        </Toolbar>
    </Box>
  );
}