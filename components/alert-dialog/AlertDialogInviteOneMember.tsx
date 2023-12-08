"use client";

import React from "react";

import { Typography } from "@material-tailwind/react";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { formatDate } from "@/src/utils/handleFunction";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  createGroup,
  inviteMemberByLeader,
} from "@/src/redux/features/groupSlice";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import toast from "react-hot-toast";

interface DialogViewProjectProps {
  children: React.ReactNode;
  groupId: number;
}

export const AlertDialogInviteOneMember: React.FC<DialogViewProjectProps> = ({
  children,
  groupId,
}) => {
  const [open, setOpen] = React.useState(false);

  const [groupName, setGroupName] = React.useState<string>("");
  const [newMember, setNewMember] = React.useState<string>("");
  const [memberList, setMemberList] = React.useState<any[]>([]);
  const [
    loadingHandleInviteAndCreateGroup,
    setLoadingHandleInviteAndCreateGroup,
  ] = React.useState(false);
  const dispatch = useAppDispatch();
  const { loadingGroup, error } = useAppSelector((state) => state.group);

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value);
  };

  const handleNewMemberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewMember(event.target.value);
  };

  const handleNewMemberKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      setMemberList((prevMembers) => [...prevMembers, newMember]);
      setNewMember("");
    }
  };

  const handleCreateNewGroupAndInviteMember = () => {
    setLoadingHandleInviteAndCreateGroup(true);
    if (memberList.length !== 0) {
      for (const userEmail of memberList) {
        dispatch(inviteMemberByLeader({ groupId, userEmail })).then((res) => {
          if (inviteMemberByLeader.rejected.match(res)) {
            toast.error(`Mời ${userEmail} thất bại!`);
            console.log(res.payload);
          } else {
            console.log(res.payload);
          }
        });
      }
    }
    toast.success("Tạo nhóm thành công!");
    setLoadingHandleInviteAndCreateGroup(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="opacity-100 max-w-lg bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Tạo nhóm mới</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="mb-4">
          <div className="mt-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="invited_member"
            >
              Thành viên
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="invited_member"
              type="text"
              placeholder="Thêm thành viên vào nhóm"
              value={newMember}
              onChange={handleNewMemberChange}
              onKeyPress={handleNewMemberKeyPress}
            />
          </div>

          <div className="mt-4">
            {memberList.length !== 0 && (
              <label className="block text-gray-700 font-bold mb-2">
                Những người đã mời
              </label>
            )}

            <div>
              {memberList.map((member, index) => (
                <div className="flex items-center gap-3 mt-4" key={index}>
                  <img
                    src={
                      "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg"
                    }
                    alt={""}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`font-normal`}
                    >
                      Tên người được mời
                    </Typography>

                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={`font-normal opacity-70`}
                    >
                      {member}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4">
            <AlertDialogCancel className="rounded-sm bg-orange-200 border-orange-200 border-2">
              Hủy
            </AlertDialogCancel>
            <Button
              className="rounded-sm bg-blue-200 border-blue-200 border-2"
              onClick={handleCreateNewGroupAndInviteMember}
            >
              Tạo nhóm
            </Button>
          </div>
        </div>
      </AlertDialogContent>

      {loadingHandleInviteAndCreateGroup && <SpinnerLoading />}
    </AlertDialog>
  );
};
