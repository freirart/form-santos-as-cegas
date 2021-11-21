import React from "react";

import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import Routes from "./routes";

import "./assets/styles/global.css";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Routes />
    </LocalizationProvider>
  );
}

export default App;
