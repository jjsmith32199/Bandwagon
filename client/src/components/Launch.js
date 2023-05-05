import React from 'react';
import { Button } from '@mui/material';

const LaunchButton = ({ text }) => {

  return (
    <Button
      variant="outlined"
      sx={{
        color: '#9893DA',
        borderColor: '#9893DA',
        '&:hover': {
          backgroundColor: '#9893DA',
          color: '#fff',
        },
      }}
      to="/planner"
    >
      {text}
    </Button>
  );
};

export default LaunchButton;
