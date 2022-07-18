import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/index.scss";
import App from "./App";
import "normalize.css";
import { ProviderApp } from "./context/contextApp";
//importing all the pages of the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <ProviderApp>
    <App />
  </ProviderApp>
  //</React.StrictMode>
);
