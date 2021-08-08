import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./registrationForm.css";

const RegistrationForm = ({ onRegister, users }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const logins = users.map((user) => user.login);
  const emails = users.map((user) => user.email);
  const isValidEmail = (email) => {
    const emailValidation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailValidation.test(String(email).toLowerCase());
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Form Validation
    if (login.length < 5) {
      return alert("Login has to be longer than 5 characters!");
    }
    if (logins.some((name) => name.toLowerCase() === login.toLowerCase())) {
      return alert("Your login has to be unique!");
    }
    if (emails.some((mail) => mail.toLowerCase() === email.toLowerCase())) {
      return alert("Your email has to be unique!");
    }
    if (!isValidEmail(email)) {
      return alert("Wrong email format!");
    }
    if (password !== repeatPassword) {
      return alert("Your passwords don’t match!");
    }
    if (password.length <= 5) {
      return alert("Password has to be longer than 5 characters!");
    }

    setLogin("");
    setPassword("");
    setRepeatPassword("");
    setEmail("");

    onRegister({ login, password, email });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="formControl">
        <label>Login</label>
        <input
          type="text"
          value={login}
          onChange={(el) => setLogin(el.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(el) => setPassword(el.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Repeat password</label>
        <input
          type="password"
          value={repeatPassword}
          onChange={(el) => setRepeatPassword(el.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(el) => setEmail(el.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
