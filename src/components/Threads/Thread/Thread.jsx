import React from "react";
import "./thread.css";
import { Link } from "react-router-dom";

const Thread = ({ thread, threadId }) => {
  return (
    <div className="thread">
      <Link to="/thread">
        <div onClick={() => threadId(thread.id)} className="title">
          {thread.title}
        </div>
      </Link>
      <div className="author">{thread.author}</div>
      <div className=""></div>
    </div>
  );
};

export default Thread;
