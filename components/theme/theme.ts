"use client";
import { createTheme } from "@mui/material/styles";
import { colorSchemes } from "./palette";

const theme = createTheme({
  ...colorSchemes.light,
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  palette: {
    ...colorSchemes.light.palette,
    mode: "light",
  },
  components: {
    MuiPopover: {
      defaultProps: {
        disableScrollLock: true,  
      },
    },
  },
})


export { theme };