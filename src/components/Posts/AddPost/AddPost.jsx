import React from "react";
import { useState } from "react";
import "./addpost.css";

const AddPost = ({ onAdd }) => {
  const [text, setText] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert("please, write your post!");
    }

    onAdd({ text });

    setText("");
  };

  return (
    <form onSubmit={onSubmit} className="addPost">
      <textarea
        value={text}
        onChange={(el) => setText(el.target.value)}
        type="text"
        className="textArea"
      />
      <button type="submit" className="btn">
        Add
      </button>
    </form>
  );
};

export default AddPost;
