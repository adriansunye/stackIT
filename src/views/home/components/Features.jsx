import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import feature1 from "@/assets/como-ser-freelance.jpg";
import feature2 from "@/assets/14828621777297.jpg";



function Features() {
  return (
    <Box px={{ xs: "7%", sm: "7%" }}>
      {/* section first */}
      <Stack direction={{ xs: "column", sm: "row" }}>
        <Box flex={{ sm: "0.5", md: "0.4" }} pt={{ sm: "0%", md: "15%" }}>
          <Typography
            variant="h2"
            fontWeight="800"
            fontSize={{ xs: "34px", sm: "44px", md: "54px" }}
            mb={{ xs: "15px", sm: "25px" }}
          >
            Get thousands of active followers
          </Typography>
          <Typography
            variant="body1"
            fontWeight="500"
            mb={{ xs: "15px", sm: "25px" }}
          >
            Yet bed any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy
            alteration boisterous the attachment.
          </Typography>
          <Button variant="contained">Start free</Button>
        </Box>
        <Box flex="0.6" mt={1}>
        <img className="feature1-image" src={feature1} alt="person" />
        </Box>
      </Stack>
      {/* section two */}
      <Stack direction={{ xs: "column-reverse", sm: "row" }}>
        <Box
          flex={{ sm: "0.5", md: "0.6" }}
          pt={{ xs: "10%", sm: "5%", lg: "0%" }}
          sx={{mt:2}}
        >
        <img className="feature2-image" src={feature2} alt="person" />

        </Box>
        <Box flex="0.4" pt={{ sm: "0%", md: "5%" }}>
          <Typography
            variant="h2"
            fontWeight="800"
            fontSize={{ xs: "34px", sm: "44px", md: "54px" }}
            mb={{ xs: "15px", sm: "25px" }}
          >
            Daily active users on social media
          </Typography>
          <Typography
            variant="body1"
            fontWeight="500"
            mb={{ xs: "15px", sm: "10px", md: "25px" }}
          >
            Yet bed any for travelling assistance indulgence unpleasing. Not
            thoughts all exercise blessing. Indulgence way everything joy
            alteration boisterous the attachment.
          </Typography>
          <Button variant="contained">Start free</Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default Features;
