"use client";
import { createTheme } from "@mui/material/styles";
import { colorSchemes } from "./palette";

const theme = createTheme({
  ...colorSchemes.dark,
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    ...colorSchemes.dark.palette,
    mode: "dark",
  },
})

const darkTheme = createTheme({
  ...colorSchemes.dark,
  palette: {
    ...colorSchemes.dark.palette,
    mode: "dark",
  },
});

const lightTheme = createTheme({
  ...colorSchemes.light,
  palette: {
    ...colorSchemes.light.palette,
    mode: "light",
  },
});


export { theme, darkTheme, lightTheme };