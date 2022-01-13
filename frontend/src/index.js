import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import { esES as esTable } from "@mui/x-data-grid";
import { blue, green, grey, orange, red } from "@mui/material/colors";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: blue[700],
      },
      secondary: {
        main: "#5e35b1",
      },
      success: {
        main: green[600],
      },
      warning: {
        main: orange[600],
        dark: "#db7100",
      },
      error: {
        main: red[700],
        dark: red[900],
      },
      info: {
        main: grey[500],
      },
    },
  },
  esES,
  esTable
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
