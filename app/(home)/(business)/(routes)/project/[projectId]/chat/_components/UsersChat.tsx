"use client";

import React from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/src/utils/configFirebase";
import { useAuthContext } from "@/src/utils/context/auth-provider";

const UsersChat = () => {
  const [usersChat, setUsersChat] = React.useState<any>([]);

  const { selectedUserChat, setSelectedUserChat }: any = useAuthContext();

  React.useEffect(() => {
    const q = query(collection(db, "userChats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersChat: any[] = [];
      console.log("querySnapshot", querySnapshot.docs);
      querySnapshot.forEach((doc: any) => {
        const docData = doc.data() as any;
        usersChat.push({ ...docData, id: doc.id });
        console.log("come here");
      });

      setUsersChat(usersChat);
    });

    return () => unsubscribe();
  }, []);

  const handleUserClick = (userEmail: any, fullName: string) => {
    setSelectedUserChat({ userEmail: userEmail, userName: fullName });
    console.log("selectedUserChat", selectedUserChat);
  };

  return (
    <div>
      <div className={"userChat"}>
        <img
          src={
            "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"
          }
          alt=""
        />
        <div className="userChatInfo">
          <span>Nhóm 1</span>
          <p>Xin hỏi là khi nà...</p>
        </div>
      </div>
    </div>

    // <div>
    //   {usersChat?.map((obj: any) => (
    //     <div
    //       className={
    //         selectedUserChat?.userEmail === obj?.senderEmail
    //           ? "userChat selected"
    //           : "userChat"
    //       }
    //       key={obj?.senderEmail}
    //       onClick={() => handleUserClick(obj?.userEmail, obj?.name)}
    //     >
    //       <img src={obj?.avatar} alt="" />
    //       <div className="userChatInfo">
    //         <span>{obj?.name}</span>
    //         <p>{obj?.lastMessages}</p>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default UsersChat;
