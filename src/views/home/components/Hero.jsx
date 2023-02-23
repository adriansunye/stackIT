import React from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import heroImage from "@/assets/develop.jpg";

function Hero() {
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      px={{ xs: "7%", sm: "7%" }}
      pt="20px"
      pb="50px"
    >
      <Box flex={0.4} pt={{ xs: "15px", sm: "30px" }}>
        <Typography
          variant="h1"
          fontWeight="800"
          fontSize={{ xs: "40px", sm: "50px", md: "66px" }}
        >
          Increase your followers on social media
        </Typography>
        <Typography mt="15px" variant="body1" fontWeight="500">
          Yet bed any for travelling assistance indulgence unpleasing. Not
          thoughts all exercise blessing. Indulgence way everything joy
          alteration boisterous the attachment.
        </Typography>
        <Button
          sx={{ mt: "20px" }}
          variant="contained"
          endIcon={<ArrowRightAltIcon />}
        >
          Get started
        </Button>
        
        <Typography mt="10px" variant="body1" fontWeight="500">
          12,000+ people already joined the AKP's increase followers plan. Get
          started today!
        </Typography>
      </Box>
      <Box flex={0.6} >
        <img className="hero-image" src={heroImage} alt="graphic" />
      </Box>
    </Stack>
  );
}

export default Hero;
