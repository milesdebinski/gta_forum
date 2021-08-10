import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Activated = () => {
  const [activationLinks, setActivationLinks] = useState([]);
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  // http://localhost:3000/activated?u=1236777&f=15&test=666
  // useLocation ?? read
  // 1. User dostaje email z linkiem np. roleplayplus/activate?u=jkdjh773gya164
  // 2. Kilka w link ( a ja pobieram parametr u jak wejdzie na strone )
  // 3. Uzywajac query.get("u") pobieram parametr za u.
  // 4. Uzywajac fetch / post wysylam activation link na backend
  const activationLink = query.get("u");
  console.log(activationLink);

  const getActivationLinks = async () => {
    const linksFromServer = await fetchActivationLinks();
    setActivationLinks(linksFromServer);
  };

  const fetchActivationLinks = async () => {
    const response = await fetch("http://localhost:5000/activationLinks");
    const data = response.json();
    return data;
  };

  const activateUser = async (activationLink) => {
    const res = await fetch(`http://localhost:5000/activationLinks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activationLink),
    });
    setActivationLinks([...activationLinks, activationLink]);
  };
  console.log(activationLinks);
  useEffect(() => {
    getActivationLinks();
    activateUser(activationLink);
  }, [activationLink]);
  useEffect(() => {});

  // ACTIVATE USER
  return (
    <div>
      {/* <div>{}</div> */}
      <div>{query.get("f")}</div>
      <div>{query.get("test")}</div>
      <h2>activated</h2>
      <p></p>
    </div>
  );
};

export default Activated;
