import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { esES } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  esES
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
