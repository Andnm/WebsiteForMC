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
import {
  convertTimestampToDate,
  extractNumberAtIndex,
  getDateTimeDifference,
  truncateString,
} from "@/src/utils/handleFunction";
import { useUserLogin } from "@/src/hook/useUserLogin";

interface UsersChatProps {
  arrayGroupId?: number[];
  projectId: number;
  userLogin: any;
}

const UsersChat: React.FC<UsersChatProps> = ({
  arrayGroupId,
  projectId,
  userLogin,
}) => {
  const [usersChat, setUsersChat] = React.useState<any>([]);
  const { selectedUserChat, setSelectedUserChat }: any = useAuthContext();

  React.useEffect(() => {
    const q = query(collection(db, "userChats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersChat: any[] = [];
      querySnapshot.forEach((doc: any) => {
        const docData = doc.data() as any;

        if (extractNumberAtIndex(docData.identifierUserChat, 1) === projectId) {
          if (userLogin?.role_name === "Business") {
            usersChat.push({ ...docData, id: doc.id });
          } else if (
            arrayGroupId?.includes(
              extractNumberAtIndex(docData.identifierUserChat, 2) as number
            )
          ) {
            usersChat.push({ ...docData, id: doc.id });
          }
        }
      });

      setUsersChat(usersChat);
    });

    return () => unsubscribe();
  }, [usersChat]);

  const handleUserClick = (identifierUserChat: string, groupName: string) => {
    setSelectedUserChat({
      groupId: extractNumberAtIndex(identifierUserChat, 2),
      groupName: groupName,
    });
  };

  return (
    <div>
      {usersChat?.map((obj: any, index: number) => (
        <div
          className={
            selectedUserChat?.groupName === obj?.groupName
              ? "userChat selected"
              : "userChat"
          }
          key={index}
          onClick={() =>
            handleUserClick(obj?.identifierUserChat, obj?.groupName)
          }
        >
          <img src={obj?.avatarGroup} alt="" />
          <div className="userChatInfo">
            <span>{obj?.groupName}</span>

            <p
              className={`block ${
                obj?.newMsg ? "text-black font-bold" : "text-gray-400"
              }`}
            >
              {userLogin?.email === obj?.senderEmail
                ? "Bạn: "
                : `${obj?.lastNameSender}: `}
              {truncateString(obj?.lastMessages, 9)}{" "}
              <p className="inline-block font-normal align-text-bottom">.</p>{" "}
              <p className="inline-block font-normal">
                {getDateTimeDifference(
                  convertTimestampToDate(
                    obj?.createdAt?.seconds,
                    obj?.createdAt?.nanoseconds
                  )
                )}
              </p>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersChat;
