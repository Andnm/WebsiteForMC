"use client";

import React, { Fragment } from "react";

import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

import "./style.scss";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import toast from "react-hot-toast";
import { registerPitching } from "@/src/redux/features/pitchingSlice";
import { FaCheck } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";

import { Listbox, Transition } from "@headlessui/react";

interface AlertDialogConfirmPitchingProps {
  children: React.ReactNode;
  projectId: number;
  groupList: any;
}

export const AlertDialogConfirmPitching: React.FC<
  AlertDialogConfirmPitchingProps
> = ({ children, projectId, groupList }) => {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loadingPitching } = useAppSelector((state) => state.pitching);

  const [selected, setSelected] = React.useState(groupList[0]?.group?.group_name);

  const handleConfirmRegisterPitching = () => {
    const groupId = selected.group.id;
    dispatch(registerPitching({ groupId, projectId })).then((result) => {
      if (registerPitching.fulfilled.match(result)) {
        router.push("/student-board");
        toast.success("Đăng kí thành công!");
      } else {
        console.log(result.payload)
        toast.error("Đã có lỗi xảy ra vui lòng thử lại sau!");
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className="opacity-100 max-w-lg bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Chọn nhóm đăng kí</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="top-16 w-72">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="h-10 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">
                  {selected?.group?.group_name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiChevronUpDown
                    className="h-5 w-5 text-black-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {groupList.map((group: any, index: number) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={group}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {group.group?.group_name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <FaCheck
                                className="h-5 w-5 text-amber-600"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <AlertDialogCancel className="rounded-sm bg-orange-200 border-orange-200 border-2">
            Hủy
          </AlertDialogCancel>
          <Button
            className="rounded-sm bg-blue-200 border-blue-200 border-2"
            onClick={handleConfirmRegisterPitching}
          >
            Xác nhận đăng kí
          </Button>
        </div>
      </AlertDialogContent>

      {loadingPitching && <SpinnerLoading />}
    </AlertDialog>
  );
};
