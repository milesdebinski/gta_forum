import "./register.css";
import React from "react";
import { useState } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import UserDataForm from "../UserDataForm";
import ActivateAccountForm from "../ActivateAccoutForm";
import Confirmation from "../Confirmation";

const Register = ({ getCurrentDate, onRegister, users }) => {
  const steps = ["Create New Account", "Activate Your Account"];
  const [activeStep, setActiveStep] = useState(0);
  const activation_link_url = Math.floor(Math.random() * 100 + 1).toString();
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const Form = () =>
    activeStep === 0 ? (
      <UserDataForm
        nextStep={nextStep}
        getCurrentDate={getCurrentDate}
        onRegister={onRegister}
        users={users}
      />
    ) : (
      <ActivateAccountForm
        activation_link_url={activation_link_url}
        nextStep={nextStep}
        users={users}
      />
    );
  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? <Confirmation /> : <Form />}
    </div>
  );
};

export default Register;
