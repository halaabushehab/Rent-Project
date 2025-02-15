import React from "react";

const UserItem = ({ user, onBlock }) => {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {!user.blocked && <button onClick={() => onBlock(user.id)}>Block</button>}
    </div>
  );
};

export default UserItem;
