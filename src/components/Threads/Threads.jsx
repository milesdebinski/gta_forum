import React from "react";
import Thread from "./Thread/Thread";

const Threads = ({ threads, threadId }) => {
  return (
    <div>
      {threads.map((thread) => (
        <Thread key={thread.id} thread={thread} threadId={threadId}></Thread>
      ))}
    </div>
  );
};

export default Threads;
