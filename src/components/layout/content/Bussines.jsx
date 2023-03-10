import React from "react";
import { Box, Typography, Stack } from "@mui/material";

function Businesses(texts) {
  return (
    <Box textAlign="center" py="50px" px="7%">
      <Typography variant="h6" fontWeight="600" m="auto">
        {texts.texts.bussiness.title}
      </Typography>
      <Stack
        pt="50px"
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={{ xs: 4, sm: 2 }}
        alignItems="center"
        justifyContent="space-between"
      >
      </Stack>
    </Box>
  );
}

export default Businesses;
