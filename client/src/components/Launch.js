import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LaunchButton = ({ text, to }) => {
  return (
    <Button
      component={Link}
      to={to}
      variant="outlined"
      color="primary"
      sx={{
        color: "#9893DA",
        borderColor: "#9893DA",
        "&:hover": {
          backgroundColor: "#9893DA",
          color: "#fff",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default LaunchButton;
