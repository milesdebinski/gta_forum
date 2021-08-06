// https://github.com/typicode/json-server
// npm i json-server - "mock" backend
// add to scripts: "server": "json-server --watch db.json --port 5000"
// -------------------------------
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Threads from "./components/Threads/Threads";
import Posts from "./components/Posts/Posts";
const App = () => {
  const [threads, setThreads] = useState([]);

  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    const getThreads = async () => {
      const threadsFromServer = await fetchThreads();
      setThreads(threadsFromServer);
    };

    getThreads();
  }, []);

  // Fetch Threads
  const fetchThreads = async () => {
    const response = await fetch("http://localhost:5000/threads");
    const data = await response.json();
    return data;
  };

  // Set Thread Id
  const getThreadId = async (id) => {
    const setId = await id;
    setThreadId(setId);
  };
  //  Add New Post << ??? >>
  const addPost = async (content) => {
    const res = await fetch("http://localhost:5000/threads/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    console.log(res);
  };

  return (
    <Router>
      <Route exact path="/">
        <Threads threads={threads} threadId={getThreadId} />
      </Route>
      <Route exact path="/thread">
        {threadId !== null && (
          <Posts threads={threads} threadId={threadId} onAdd={addPost} />
        )}
      </Route>
    </Router>
  );
};

export default App;
