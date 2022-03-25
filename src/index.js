import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import "assets";
import { DataContextProvider } from "contexts";
// import "App.css";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <Router>
        <App />
      </Router>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
