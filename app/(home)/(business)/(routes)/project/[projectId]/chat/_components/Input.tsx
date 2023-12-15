import { Image, Send } from "lucide-react";
import React from "react";
import { IoAttach } from "react-icons/io5";

const Input = () => {
  return (
    <div className="input-chatbox">
      <input
        type="text"
        placeholder="Gõ gì đó..."
      />
      <div className="send">
        <IoAttach className="w-6 h-6"/>
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <Image className="w-5 h-5"/>
        </label>
        <button>
          <Send className="w-4 h-4"/>
        </button>
      </div>
    </div>
  );
};

export default Input;
