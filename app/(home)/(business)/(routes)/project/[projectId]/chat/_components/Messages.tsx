"use client";

import { useAuthContext } from "@/src/utils/context/auth-provider";
import React from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/src/utils/configFirebase";
import { useUserLogin } from "@/src/hook/useUserLogin";

interface Message {
  text: string;
  name: string;
  avatar: string;
  createdAt: string;
  combinedEmail: string;
  senderEmail: string;
  identifierUserChat: string;
}

interface MessageProps {
  message: Message;
}

interface MessagesProps {
  arrayGroupId?: number[];
  projectId: number;
}

const Messages: React.FC<MessagesProps> = ({ arrayGroupId, projectId }) => {
  const { selectedUserChat, setSelectedUserChat }: any = useAuthContext();
  const [messages, setMassages] = React.useState<any>([]);
  const [userLogin, setUserLogin] = useUserLogin();
  const compareIdentifierUserChat = `${projectId}-${selectedUserChat.groupId}`;
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  React.useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt")
      // limit(50),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesInChat: any[] = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        if (docData.identifierUserChat === compareIdentifierUserChat) {
          messagesInChat.push({ ...docData, id: doc.id });
        }
      });

      setMassages(messagesInChat);
    });

    return () => unsubscribe();
  }, [selectedUserChat]);

  const Message: React.FC<MessageProps> = ({ message }) => {
    return (
      <div
        className={
          message.senderEmail === userLogin?.email ? "message owner" : "message"
        }
      >
        <div className="messageInfo">
          <img className="logo-owner" src={message.avatar} alt="" />
        </div>
        <div className="messageContent">
          <p>{message.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="messages overflow-y-scroll">
      {Array.isArray(messages) &&
        messages.map((m: any, index: any) => (
          <Message message={m} key={index} />
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;
