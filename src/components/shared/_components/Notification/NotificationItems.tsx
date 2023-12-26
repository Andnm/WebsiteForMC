"use client";

import { updateSelectedNotification } from "@/src/redux/features/notificationSlice";
import { useAppDispatch } from "@/src/redux/store";
import { getDateTimeDifference } from "@/src/utils/handleFunction";
import Link from "next/link";
import React from "react";

interface NotificationItemsProps {
  data: any;
}

const NotificationItems: React.FC<NotificationItemsProps> = ({ data }) => {
  console.log(data)
  const [navigateToLink, setNavigateToLink] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const handleClickMarkReadNotification = () => {
    dispatch(updateSelectedNotification(data.id)).then((result) => {
      console.log(result);
    });
  };

  React.useEffect(() => {
    const typeToLinkMapping: Record<string, string> = {
      CREATE_PROJECT: "/manage-project",
      CONFIRM_PROJECT: "/business-board",
      UPDATE_PROJECT: "/business-board",
      INVITE_GROUP: "/group",
      REPLY_INVITE_MEMBER: "/group",
      REGISTER_PITCHING_BUSINESS: "/business-board",
      INVITE_LECTURER: "/lecturer-board",
      REPLY_INVITE_LECTURER: "/#",
      SELECTED_REGISTER_PITCHING: "/student-board",
      REJECTED_REGISTER_PITCHING: "/student-board",
      DONE_PHASE_BUSINESS: `/project/${data.note}/view`,
      DONE_PHASE_LECTURER: `/project/${data.note}/view`,
      POST_EVIDENCE_BUSINESS: `/#`,
      DONE_PROJECT_BUSINESS: `/project/${data.note}/view`,
      DONE_PROJECT_STUDENT: `/project/${data.note}/view`,
    };

    setNavigateToLink(typeToLinkMapping[data.notification_type] || "");
  }, [data]);

  return (
    <Link href={navigateToLink} onClick={handleClickMarkReadNotification}>
      <div
        className={`relative cursor-pointer border rounded-xl ${
          data.is_new && "border-orange-500"
        } hover:bg-gray-200 hover:rounded-xl`}
      >
        {data.is_new && (
          <button className="absolute -top-1 p-1 bg-orange-300 border border-orange-300 rounded-full"></button>
        )}

        <div className="flex items-center p-4">
          <img
            className="object-cover w-12 h-12 rounded-full border"
            src={data.sender.avatar_url}
            alt="ava"
          />

          <div className="ml-3 w-80">
            <p
              className={`h-full w-full text-sm  ${
                data.is_new ? "text-black" : "text-gray-500"
              }`}
            >
              {data.information}
            </p>
            <p
              className={`text-xs  ${
                data.is_new ? "text-black" : "text-gray-500"
              }`}
            >
              {getDateTimeDifference(data.createdAt)} trước
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationItems;
