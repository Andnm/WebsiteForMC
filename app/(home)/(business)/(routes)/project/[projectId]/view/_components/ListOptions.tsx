"use client";

import { PhaseType } from "@/src/types/phase.type";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, MoreHorizontal, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUserLogin } from "@/src/hook/useUserLogin";
import { IoMdWarning } from "react-icons/io";
import {
  changeStatusPhaseByBusiness,
  uploadFeedback,
} from "@/src/redux/features/phaseSlice";
import { useAppDispatch } from "@/src/redux/store";
import toast from "react-hot-toast";

interface ListOptionsProps {
  data: PhaseType;
  setPhaseData: React.Dispatch<React.SetStateAction<any[]>>;
  onAddCategory: () => void;
}

const ListOptions = ({
  data,
  onAddCategory,
  setPhaseData,
}: ListOptionsProps) => {
  const [userLogin, setUserLogin] = useUserLogin();
  const dispatch = useAppDispatch();

  const handleChangeStatus = (status: string) => {
    const phaseId: number = data.id;
    const phaseStatus: string = status;
    dispatch(changeStatusPhaseByBusiness({ phaseId, phaseStatus })).then(
      (result) => {
        if (changeStatusPhaseByBusiness.fulfilled.match(result)) {
          setPhaseData((prevDataTable) => {
            const updatedIndex = prevDataTable.findIndex(
              (item) => item.id === result.payload.id
            );

            if (updatedIndex !== -1) {
              const newDataTable = [...prevDataTable];
              newDataTable[updatedIndex] = result.payload;
              return newDataTable;
            }

            return prevDataTable;
          });
          toast.success("Chuyển trạng thái thành công!");
        } else {
          toast.error("Đã có lỗi xảy ra, chuyển trạng thái thất bại!");
        }

        console.log(result);
      }
    );
  };

  const handleAddFeedback = () => {
    const dataBody = {
      phaseId: data.id,
      feedback: "hmmm",
    };
    
    dispatch(uploadFeedback(dataBody)).then((result) => {
      if (uploadFeedback.fulfilled.match(result)) {
        toast.success("Tạo feedback thành công!");
      } else {
        toast.error(`${result.payload}`);
      }
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3 bg-white"
        side="bottom"
        align="start"
        style={{ borderRadius: "7px" }}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Các chức năng khác
        </div>

        {userLogin?.role_name === "Student" && (
          <>
            <Button
              onClick={onAddCategory}
              className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
              variant={"ghost"}
            >
              Thêm hạng mục
            </Button>
            <Separator className="bg-gray-200/100" />
            <Button
              onClick={onAddCategory}
              className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
              variant={"ghost"}
            >
              Xóa phases
            </Button>
          </>
        )}

        {(userLogin?.role_name === "Lecturer" ||
          userLogin?.role_name === "Business") && (
          <>
            <Button
              onClick={handleAddFeedback}
              className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
              variant={"ghost"}
            >
              <Plus className="w-3 h-3 mr-1" /> Thêm feedback
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
