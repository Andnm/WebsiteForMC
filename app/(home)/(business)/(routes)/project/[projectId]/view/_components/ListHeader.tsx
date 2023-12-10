"use client";

import { PhaseType } from "@/src/types/phase.type";
import ListOptions from "./ListOptions";

interface ListHeaderProps {
  data: PhaseType;
  onAddCategory: () => void;
}

export const ListHeader = ({ data, onAddCategory }: ListHeaderProps) => {
  return (
    <div
      className="pt-2 px-2 text-sm font-semibold flex 
  justify-between items-start gap-x-2"
    >
      <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
        Giai đoạn {data.phase_number}
      </div>

      <ListOptions onAddCategory={onAddCategory} data={data} />
    </div>
  );
};
