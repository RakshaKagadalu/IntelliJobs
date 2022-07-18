import React from "react";
import { useContextApp } from "../context/contextApp";

//creating an dynamic alert component to display any typr of alert in the application, where the values are provided from the global context
const AlertMessage = () => {
  const { alertType, alertMsg } = useContextApp();
  //using template string to generalize the type of alert to be displayed
  return <div className={`alert alert-${alertType}`}>{alertMsg}</div>;
};
//exporting the alert text and type to be displayed
export default AlertMessage;
