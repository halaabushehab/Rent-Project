import React from "react";

const PostItem = ({ post, onApprove }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
      {!post.approved && (
        <button onClick={() => onApprove(post.id)}>Approve</button>
      )}
    </div>
  );
};

export default PostItem;
