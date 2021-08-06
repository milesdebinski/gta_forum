import React from "react";
import Post from "./Post/Post";
import AddPost from "./AddPost/AddPost";

const Posts = ({ threads, threadId, onAdd }) => {
  let title = threads[threadId].title;
  let content = threads[threadId].posts;

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {content.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        <AddPost onAdd={onAdd} />
      </div>
    </div>
  );
};

export default Posts;
