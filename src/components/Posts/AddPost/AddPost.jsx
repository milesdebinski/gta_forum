import React from "react";
import { useState } from "react";
import "./addpost.css";

const AddPost = ({ onAdd, threadId, getCurrentDate }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const date = getCurrentDate();

    if (!text) {
      alert("please, write your post!");
    }

    let thread_id = threadId;
    onAdd({ text, author, date, thread_id });

    setText("");
    setAuthor("");
  };

  return (
    <form onSubmit={onSubmit} className="addPost">
      <div className="formControl">
        <label>message</label>
        <textarea
          value={text}
          onChange={(el) => setText(el.target.value)}
          type="text"
          className="textArea"
        />
      </div>
      <div className="formControl">
        <label>author</label>
        <input
          value={author}
          onChange={(el) => setAuthor(el.target.value)}
          type="text"
          className="input"
        />
      </div>
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
};

export default AddPost;
