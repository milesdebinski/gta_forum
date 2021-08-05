import React from "react";
import Post from "./Post/Post";

const Posts = ({ posts, threadId }) => {
  let title = "";
  let content = [];
  if (posts.length > 0) {
    title = posts[threadId].title;
    content = posts[threadId].content;
    // fetch single treads instead of the whole api
  }

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {content.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
