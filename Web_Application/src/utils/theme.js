import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#031458",
    },
    secondary: {
      main: "#42a5f5",
    },
  },
  typography: {
    fontFamily: [
      "Proxima Nova",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif"
    ].join(",")
  }
});
