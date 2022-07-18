import React from "react";
import img from "../assets/images/images.png";
import "../sass/ErrorPage.scss";
import { Link } from "react-router-dom";

// error page which is displayed when user types an incorrect url and adding a link to redirect the user back to homepage
const ErrorPage = () => {
  return (
    <div className="errorCom">
      <h1>
        <b>ErrorPage</b>
      </h1>
      <p>Looks like your search URL is incorrect!</p>
      <img src={img} alt="error" />

      <Link to="/">BackHome</Link>
    </div>
  );
};

export default ErrorPage;
