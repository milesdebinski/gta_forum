// https://github.com/typicode/json-server
// npm i json-server - "mock" backend
// add to scripts: "server": "json-server --watch db.json --port 5000"
// -------------------------------
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Threads from "./components/Threads/Threads";
import Posts from "./components/Posts/Posts";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/RegisterForm/Register/Register";
// import ActivateAccoutForm from "./components/RegisterForm/ActivateAccoutForm";
// import UserDataForm from "./components/RegisterForm/UserDataForm";
const App = () => {
  const [users, setUsers] = useState([]);
  const [threads, setThreads] = useState([]);
  const [posts, setPosts] = useState([]);
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    };
    const getThreads = async () => {
      const threadsFromServer = await fetchThreads();
      setThreads(threadsFromServer);
    };
    const getPosts = async () => {
      const postsFromServer = await fetchPosts();
      setPosts(postsFromServer);
    };
    getUsers();
    getThreads();
    getPosts();
  }, []);
  // Fetch Users
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    return data;
  };
  // Fetch Threads
  const fetchThreads = async () => {
    const response = await fetch("http://localhost:5000/threads");
    const data = await response.json();
    return data;
  };
  // Fetch Posts
  const fetchPosts = async () => {
    const response = await fetch("http://localhost:5000/posts");
    const data = await response.json();
    return data;
  };
  // Set Thread Id
  const getThreadId = async (id) => {
    const setId = await id;
    setThreadId(setId);
  };
  //  Add New Post
  const addPost = async (content) => {
    const res = await fetch(`http://localhost:5000/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const id = Math.floor(Math.random() * 10000);
    const newPost = { id, ...content };
    setPosts([...posts, newPost]);
  };
  // Register New User
  const registerNewUser = async (newUser) => {
    await fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    setUsers([...users, newUser]);
    console.log(newUser);
  };
  // Get current date/time
  const getCurrentDate = () => {
    let currentDate = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    let getTime =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();

    let getDate = currentDate.toLocaleDateString("en-GB", options);
    return getTime + " " + getDate;
  };
  return (
    <Router>
      <Navbar />

      <Route exact path="/register">
        <Register
          getCurrentDate={getCurrentDate}
          onRegister={registerNewUser}
          users={users}
        />
      </Route>
      <Route exact path="/">
        <Threads threads={threads} threadId={getThreadId} />
      </Route>
      <Route exact path="/thread">
        {threadId !== null && (
          <Posts
            getCurrentDate={getCurrentDate}
            threads={threads}
            threadId={threadId}
            posts={posts}
            onAdd={addPost}
          />
        )}
      </Route>
    </Router>
  );
};

export default App;
