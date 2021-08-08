import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./registrationForm.css";

const RegistrationForm = ({ onRegister, users }) => {
  const [login, setLogin] = useState("");
  const [validLogin, setValidLogin] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [validRepeatPassword, setValidRepeatPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const logins = users.map((user) => user.login);
  const emails = users.map((user) => user.email);

  const isValidLogin = (login) => {
    const loginValidation = /^[a-zA-Z0-9]+$/;
    return (
      !logins.some((name) => name.toLowerCase() === login.toLowerCase()) &&
      loginValidation.test(String(login)) &&
      login.length > 4
    );
  };
  const isValidPassword = (password, repeatPassword) => {
    const passwordValidation =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (repeatPassword === undefined) {
      return passwordValidation.test(String(password));
    } else {
      return (
        password === repeatPassword && passwordValidation.test(String(password))
      );
    }
  };
  const isValidEmail = (email) => {
    const emailValidation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (
      emailValidation.test(String(email).toLowerCase()) &&
      !emails.some((mail) => mail.toLowerCase() === email.toLowerCase())
    );
  };
  // Form Validation
  const formValidation = (login, password, repeatPassword, email) => {
    if (!isValidLogin(login)) {
      return "Login is not valid";
    }
    if (!isValidPassword(password, repeatPassword)) {
      return "Password is not valid";
    }
    if (!isValidEmail(email)) {
      return "Email is not valid";
    }
    return false;
  };
  // live login validation
  useEffect(() => {
    if (!isValidLogin(login)) {
      setValidLogin(true);
    } else {
      setValidLogin(false);
    }
  }, [login]);
  // live password validation
  useEffect(() => {
    if (!isValidPassword(password)) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }, [password]);
  // live repeat password validation
  useEffect(() => {
    if (!isValidPassword(password, repeatPassword)) {
      setValidRepeatPassword(true);
    } else {
      setValidRepeatPassword(false);
    }
  }, [password, repeatPassword]);
  // live email validation
  useEffect(() => {
    if (!isValidEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  const onSubmit = (e) => {
    e.preventDefault();

    const message = formValidation(login, password, repeatPassword, email);
    if (message) {
      alert(message);
      return;
    }
    // stop
    setLogin("");
    setPassword("");
    setRepeatPassword("");
    setEmail("");

    onRegister({ login, password, email });
    alert("Check your email to complete registration!");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="formControl">
        <label>Login</label>
        <input
          className={validLogin ? "wrong" : ""}
          type="text"
          value={login}
          onChange={(el) => setLogin(el.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Password</label>
        <input
          className={validPassword ? "wrong" : ""}
          type="password"
          value={password}
          onChange={(el) => setPassword(el.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Repeat password</label>
        <input
          className={validRepeatPassword ? "wrong" : ""}
          type="password"
          value={repeatPassword}
          onChange={(el) => setRepeatPassword(el.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Email</label>
        <input
          className={validEmail ? "wrong" : ""}
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
