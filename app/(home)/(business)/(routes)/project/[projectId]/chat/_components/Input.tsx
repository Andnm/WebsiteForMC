"use client";

import { useAuthContext } from "@/src/utils/context/auth-provider";
import { Image, Send } from "lucide-react";
import React from "react";
import { IoAttach } from "react-icons/io5";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/src/utils/configFirebase";
import { useUserLogin } from "@/src/hook/useUserLogin";

const Input = () => {
  const [valueText, setValueText] = React.useState("");

  const { selectedUserChat }: any = useAuthContext();
  const [userLogin, setUserLogin] = useUserLogin();

  const compareCombinedEmail = `${userLogin?.email}-admin@gmail.com`

  const handleSendMessage = async (e: any) => {
    e.preventDefault();

    if (valueText.trim() === "") {
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: valueText,
        name: userLogin?.fullname,
        avatar: userLogin?.avatar_url,
        createdAt: serverTimestamp(),
        combinedEmail: compareCombinedEmail,
        senderEmail: userLogin?.email,
         
      });
    } catch (error) {
      console.error("Error send messages from admin to customer:", error);
    }

    setValueText("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage(e);
      setValueText("");
    }
  };
  return (
    <div className="input-chatbox">
      <input
        type="text"
        placeholder="Gõ gì đó..."
        onChange={(e) => setValueText(e.target.value)}
        onKeyPress={handleKeyPress}
        value={valueText}
      />
      <div className="send">
        <IoAttach className="w-6 h-6" />
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <Image className="w-5 h-5" />
        </label>
        <button onClick={handleSendMessage}>
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Input;
