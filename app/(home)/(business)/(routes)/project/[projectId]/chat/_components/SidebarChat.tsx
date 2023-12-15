import React from "react";
import Search from "./Search";
import UsersChat from "./UsersChat";

const SidebarChat = () => {
  return (
    <div className="sidebar-chat">
      <div className="navbar">
        <span>Đoạn Chat</span>
      </div>

      <Search />

      <UsersChat />
    </div>
  );
};

export default SidebarChat;
