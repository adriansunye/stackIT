import React from "react";
import { Box, Typography } from "@mui/material";

function Copyright() {
  return (
    <Box
      px={{ xs: "2%", sm: "7%" }}
      color="#ffffff"
      className="copyright"
      display="flex"
      py="3%"
      justifyContent="space-between"
    >
      <Typography variant="caption">
        2023 <strong>Stack-IT</strong> - all right reserved
      </Typography>
      <Typography variant="caption">
        Supported by <strong>FactoriaF5</strong>{" "}
      </Typography>
    </Box>
  );
}

export default Copyright;
