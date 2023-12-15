import React from "react";

interface Message {
  text: string;
  avatar: string;
  owner: boolean;
}

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={message.owner ? "message owner" : "message"}>
      <div className="messageInfo">
        <img className="logo-owner" src={message.avatar} alt="" />
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
      </div>
    </div>
  );
};

const Messages: React.FC = () => {
  const messages: Message[] = [
    {
      text: "Hello xin chào mọi người",
      avatar:
        "https://inkythuatso.com/uploads/thumbnails/800/2021/11/logo-fpt-inkythuatso-1-01-01-14-33-35.jpg",
      owner: true,
    },
    {
      text: "Xin hỏi là khi nào có thể đăng kí pitching ạ?",
      avatar:
        "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg",
      owner: false,
    },
  ];

  return (
    <div className="messages">
      {messages?.map((m, index) => (
        <Message message={m} key={index} />
      ))}
    </div>
  );
};

export default Messages;
