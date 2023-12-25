import { getDateTimeDifference } from "@/src/utils/handleFunction";
import React from "react";

interface NotificationItemsProps {
  data: any;
}

const NotificationItems: React.FC<NotificationItemsProps> = ({ data }) => {
  console.log(data);
  return (
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
  );
};

export default NotificationItems;
