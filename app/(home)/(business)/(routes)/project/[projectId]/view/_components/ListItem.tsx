"use client";

import { PhaseType } from "@/src/types/phase.type";
import React from "react";
import { ListHeader } from "./ListHeader";
import CategoryForm from "./CategoryForm";
import { useAppDispatch } from "@/src/redux/store";
import { getAllCategoryOfPhase } from "@/src/redux/features/categorySlice";
import ListCategory from "./ListCategory";

interface ListItemProps {
  data: PhaseType;
  index: number;
}

const ListItem = ({ data, index }: ListItemProps) => {
  const [dataCategory, setDataCategory] = React.useState<any>([])
  const textareaRef = React.useRef<React.ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const dispatch = useAppDispatch();

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  console.log("phase", data);

  React.useEffect(() => {
    dispatch(getAllCategoryOfPhase(data.id)).then((result) => {
      setDataCategory(result.payload)
      console.log("category", result.payload);
    });
  }, []);

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div
        className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
        style={{ borderRadius: "7px" }}
      >
        <ListHeader onAddCategory={enableEditing} data={data} />

        {data && <ListCategory dataCategory={dataCategory} setDataCategory={setDataCategory}/>}

        <CategoryForm
          phaseId={data.id}
          groupId={2}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};

export default ListItem;
