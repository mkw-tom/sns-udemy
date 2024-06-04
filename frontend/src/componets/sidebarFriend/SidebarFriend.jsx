import React from "react";

const SidebarFriend = ({user}) => {
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sideberFriend">
      <img src={PUBLIC_FOLDER + user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
};

export default SidebarFriend;
