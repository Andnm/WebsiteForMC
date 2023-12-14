"use client";
import React from "react";
import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiDetail } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { changeStatusFromEnToVn, formatDate } from "@/src/utils/handleFunction";
import StatusCell from "./StatusCell";
import InfoText from "./InfoText";
import { useAppDispatch } from "@/src/redux/store";
import { getAllMemberByGroupId } from "@/src/redux/features/groupSlice";
import { AlertDialogConfirmChoose } from "@/components/alert-dialog/AlertDialogConfirmChoose";
import { Hint } from "@/components/hint";

interface TableProps {
  register_pitching_status: string;
  group: any;
  projectId: number;
}

const TABLE_HEAD = ["Thành viên", "Chức vụ", "Trạng thái", "Ngày tham gia"];

const DefaultAvatarURL =
  "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg";

const TableMemberInGroup: React.FC<TableProps> = ({
  register_pitching_status,
  group,
  projectId,
}) => {
  const [memberInGroup, setMemberInGroup] = React.useState<any>([]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllMemberByGroupId(group?.group?.id)).then((result: any) => {
      if (getAllMemberByGroupId.fulfilled.match(result)) {
        setMemberInGroup(result.payload);
        console.log(result.payload);
      }
    });
  }, []);

  return (
    <>
      <div className="absolute top-1 right-3">
        {register_pitching_status !== "Selected" && (
          <AlertDialogConfirmChoose
            groupId={group?.group?.id}
            projectId={projectId}
          >
            <div className="cursor-pointer hover:underline">Chọn nhóm</div>
          </AlertDialogConfirmChoose>
        )}
      </div>

      <CardBody className="px-0">
        <table
          className=" w-full min-w-max table-auto text-left bg-white"
          style={{ borderRadius: "7px" }}
        >
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <InfoText className="flex items-center gap-2 leading-none opacity-70">
                    {head}
                    {index !== TABLE_HEAD.length && (
                      <RiExpandUpDownLine className="h-4 w-4" />
                    )}
                  </InfoText>
                </th>
              ))}
            </tr>
          </thead>
          {memberInGroup.map((member: any, index: number) => {
            const isLast = index === group.length - 1;

            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tbody key={index}>
                <tr>
                  <td className={classes}>
                    <Hint
                      sideOffset={10}
                      description={`Card thông tin detail thành viên`}
                      side={"top"}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={member?.user?.avatar_url || DefaultAvatarURL}
                          alt={member?.user?.fullname}
                          size="sm"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                          <InfoText className="text-start">
                            {member?.user?.fullname}
                          </InfoText>

                          <InfoText className="opacity-70">
                            {member?.user?.email}
                          </InfoText>
                        </div>
                      </div>
                    </Hint>
                  </td>

                  <td className={classes}>
                    <InfoText>
                      {changeStatusFromEnToVn(member?.role_in_group)}
                    </InfoText>
                  </td>

                  <StatusCell
                    status={member.relationship_status}
                    classes={classes}
                  />

                  <td className={classes}>
                    <InfoText>{formatDate(member?.updatedAt)}</InfoText>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </CardBody>
    </>
  );
};

export default TableMemberInGroup;
