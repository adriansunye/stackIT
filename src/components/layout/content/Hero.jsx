import React from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import heroImage from "@/assets/develop.jpg";
import { useNavigate } from 'react-router-dom';

function Hero(texts) {
  const navigate = useNavigate();
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
         {texts.texts.home.title}
        </Typography>
        <Typography mt="15px" variant="body1" fontWeight="500">
        { texts.texts.home.description}
        </Typography>
        <Button
          onClick={() => navigate('/login')}
          endIcon={<ArrowRightAltIcon />}
          sx={{ mt: "20px" }}
          variant="contained"
        >
          {texts.texts.home.start}
        </Button>
        
        <Typography mt="10px" variant="body1" fontWeight="500">
         {texts.texts.home.join}
        </Typography>
      </Box>
      <Box flex={0.6} >
        <img className="hero-image" src={heroImage} alt="graphic" />
      </Box>
    </Stack>
  );
}

export default Hero;
