import React from "react";
import Post from "./Post/Post";
import AddPost from "./AddPost/AddPost";

const Posts = ({ threads, threadId, posts, onAdd, getCurrentDate }) => {
  let title = threads[threadId].title;
  let content = posts;

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {content
          .filter((post) => post.thread_id === threadId)
          .map((post) => (
            <Post key={post.id} post={post} threadId={threadId} />
          ))}
        <AddPost
          getCurrentDate={getCurrentDate}
          onAdd={onAdd}
          threadId={threadId}
        />
      </div>
    </div>
  );
};

export default Posts;
