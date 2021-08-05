import React from "react";
import "./post.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="text">{post.text}</div>
      <div className="flex">
        <div className="author">{post.author}</div>
        <div className="date">{post.date}</div>
      </div>
    </div>
  );
};

export default Post;
