import "../sass/RegistrationPage.scss";
import React from "react";
import { useState, useEffect } from "react";
import { AlertMessage, FormInput } from "../components";
import { useContextApp } from "../context/contextApp";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

//consists of a form with user registeration inputs

//setting up the inistial state
const State = {
  name: "",
  email: "",
  password: "",
  isaMember: true,
  //displayAlertMsg: false,
};

const RegisterUser = () => {
  //get user state and invoke the use navigator hook
  const navigate = useNavigate();
  const [values, setValues] = useState(State);
  const {
    user,
    isLoading,
    displayAlertMsg,
    showAlert,
    userRegistration,
    loginUser,
    setupUser,
  } = useContextApp();
  //console.log(state);

  //to toggle between login and register form
  const toggleRegister = () => {
    setValues({ ...values, isaMember: !values.isaMember });
  };

  //Function to change after user changes his input
  const handleChange = (e) => {
    //console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //Function to perform action after user clicks on submit button
  const fnSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isaMember } = values;
    // console.log(e.target);

    //adding validation check for the input fields before submit
    if (
      !values.email ||
      !values.password ||
      (!values.isaMember && !values.name)
    ) {
      showAlert();
      return;
    }
    const currentUser = { name, password, email };
    if (isaMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertMsg: "Login successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertMsg: "User Created! Redirecting...",
      });
      e.preventDefault();

      let reply_to = e.target[1].value;
      var contactParams = {
        reply_to: reply_to,
      };

      //sending an email to user as soon as they register
      emailjs
        .send(
          "service_07228zq",
          "template_g23o757",
          contactParams,
          "9HB12qcHBbdIggQe6"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
    //console.log(values);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <div className="regCom">
      {/*Form HTML element for user Login or Registration */}

      <h1>
        Intelli<b>Jobs</b>
      </h1>
      <form className="formReg" onSubmit={fnSubmit}>
        <h3>{values.isaMember ? "Log-in" : "Register Now"}</h3>
        {displayAlertMsg && <AlertMessage></AlertMessage>}

        {/* Form Name input field HTML elements displayed only for non members */}
        {!values.isaMember && (
          <FormInput
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* Form Email input field HTML elements */}
        <FormInput
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Form Password input field HTML elements */}
        <FormInput
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        {/* Adding a register button and calling the toggle function between registered user login and new user login*/}
        <p>
          {values.isaMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleRegister} className="member-btn">
            {values.isaMember ? "Register Now" : "Log-in"}
          </button>
        </p>
      </form>
      <h1></h1>
    </div>
  );
};

export default RegisterUser;
