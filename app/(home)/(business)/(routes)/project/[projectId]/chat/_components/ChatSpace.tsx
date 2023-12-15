import { Camera, MoreHorizontal } from "lucide-react";
import React from "react";
import Messages from "./Messages";
import Input from "./Input";

const ChatSpace = () => {
  return (
    <div className="chat-space">
      <div className="chatInfo">
        <span>Nhóm 1</span>
        <div className="chatIcons">
          <Camera />
          <MoreHorizontal />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default ChatSpace;
