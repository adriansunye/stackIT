import React from "react";
import { createTheme, ThemeProvider, Divider, Box, Container } from "@mui/material";
import Hero from "@/components/layout/content/Hero";
import Businesses from "@/components/layout/content/Bussines";
import Features from "@/components/layout/content/Features";
import { useLanguageModeContext } from "../../services/providers/LanguageModeContext";


const theme = createTheme({
  typography: {
    fontFamily: [
      "Manrope",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function Home() {
  const languageModeContext = useLanguageModeContext();
  const texts = languageModeContext.state.texts
  return (
    <>
      <ThemeProvider theme={theme}>
      
        <Hero texts={texts}/>
        <Divider orientation="horizontal" />
        <Businesses texts={texts}/>
        <Divider orientation="horizontal" />
        <Features texts={texts}/>
      
      </ThemeProvider>
    </>
  );
}

export default Home;
