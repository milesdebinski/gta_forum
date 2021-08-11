import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Activated = ({ nextStep, users, activation_link_url }) => {
  const getUParameters = async () => {
    await window.history.replaceState(
      null,
      null,
      `/register?u=${activation_link_url}`
    );
  };
  getUParameters();

  const user_id = users.length - 1;

  const correctActivationCode = users[user_id].activation_code;

  const [activationLinks, setActivationLinks] = useState([]);
  const [activationCode, setActivationCode] = useState("");
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const activationLink = query.get("u");
  console.log(activationLink);

  // const getActivationLinks = async () => {
  //   const linksFromServer = await fetchActivationLinks();
  //   setActivationLinks(linksFromServer);
  // };

  // const fetchActivationLinks = async () => {
  //   const response = await fetch("http://localhost:5000/activationLinks");
  //   const data = response.json();
  //   return data;
  // };

  const activateUser = async (activationLink) => {
    await fetch(`http://localhost:5000/activationLinks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activationLink),
    });
    setActivationLinks([...activationLinks, activationLink]);
  };

  // useEffect(() => {
  //   getActivationLinks();
  // }, []);

  useEffect(() => {
    activateUser({ activationLink });
  }, [activationLink]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (correctActivationCode === activationCode) {
      console.log("activated");
      nextStep();
    } else {
      console.log("wrong activation code");
    }
  };

  // ACTIVATE USER
  return (
    <>
      <p>Check your email for activation code to activate your account!</p>
      <p style={{ color: "red" }}>
        Do we want activation code or activation link?
      </p>
      <form action="/activated" onSubmit={onSubmit}>
        <div className="formControl">
          <label>Activation Code</label>
          <input
            // className={validLogin ? "wrong" : ""}
            type="text"
            // value={login}
            onChange={(el) => setActivationCode(el.target.value)}
          />
        </div>

        <button type="submit">Activate</button>
      </form>
    </>
  );
};

export default Activated;
