import * as React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{ position: "relative", display: "inline-flex", marginLeft: "16px" }}
    >
      <CircularProgress
        variant="determinate"
        color={
          props.value < 30 ? "error" : props.value < 65 ? "primary" : "success"
        }
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className={
            props.value < 30
              ? "progressPercent error"
              : props.value < 65
              ? "progressPercent primary"
              : "progressPercent success"
          }
        >{`${Math.round(props.value)}%`}</span>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CircularStatic({ value }) {
  return <CircularProgressWithLabel value={value} />;
}
