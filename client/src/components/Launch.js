import React from 'react';
import { Button } from '@mui/material';

const LaunchButton = ({ text }) => {

  return (
    <Button variant="outlined" color='secondary' to="/planner">
      {text}
    </Button>
  );
};

export default LaunchButton;


/*  To use this button on different pages: 

<CustomButton text="Click me!" />

*/