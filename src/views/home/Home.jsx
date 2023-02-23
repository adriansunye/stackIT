import React from "react";
import { createTheme, ThemeProvider, Divider } from "@mui/material";
import Hero from "@/components/layout/content/Hero";
import Businesses from "@/components/layout/content/Bussines";
import Features from "@/components/layout/content/Features";


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
  return (
    <>
      <ThemeProvider theme={theme}>
        <Hero />
        <Divider orientation="horizontal" />
        <Businesses />
        <Divider orientation="horizontal" />
        <Features />
      </ThemeProvider>
    </>
  );
}

export default Home;