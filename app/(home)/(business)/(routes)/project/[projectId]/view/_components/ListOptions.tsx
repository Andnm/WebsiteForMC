"use client";

import { PhaseType } from "@/src/types/phase.type";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ListOptionsProps {
  data: PhaseType;
  onAddCategory: () => void;
}

const ListOptions = ({ data, onAddCategory }: ListOptionsProps) => {
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
        style={{borderRadius: '7px'}}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Các chức năng
        </div>

        <Button
          onClick={onAddCategory}
          className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
          variant={"ghost"}
        >
          Thêm category
        </Button>
        <Separator className="bg-gray-200/100"/>
        <Button
          onClick={onAddCategory}
          className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
          variant={"ghost"}
        >
          Xóa phases
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
