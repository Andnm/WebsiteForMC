import React from "react";
import ChatSpace from "./_components/ChatSpace";
import SidebarChat from "./_components/SidebarChat";
import "./style/style.scss";

const ChatPage = () => {
  return (
    <div className="p-2 h-full">
      <div className="default-chatbox-home">
        <div className="chatbox-management">
          <SidebarChat />
          <ChatSpace />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
