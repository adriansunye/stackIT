import React from "react";
import { createTheme, ThemeProvider, Divider } from "@mui/material";
import Hero from "./components/Hero";
import Businesses from "./components/Bussines";
import Features from "./components/Features";


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