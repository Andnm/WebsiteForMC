"use client";

import { PhaseType } from "@/src/types/phase.type";
import React from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";

interface ListPhaseContainerProps {
  projectId: number;
  groupId: number;
  phaseData: PhaseType[];
  setPhaseData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListPhaseContainer = ({
  projectId,
  groupId,
  phaseData,
  setPhaseData,
}: ListPhaseContainerProps) => {
  console.log('phasedata', phaseData);

  return (

    // mới sửa khúc này
    <ol className="flex gap-x-3 h-full">
      {Array.isArray(phaseData) &&
        phaseData?.map((phase, index) => {
          return <ListItem key={index} index={index} data={phase} groupId={groupId} setPhaseData={setPhaseData}></ListItem>;
        })}

      <ListForm groupId={groupId} projectId={projectId} phaseData={phaseData} setPhaseData={setPhaseData}/>
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};

export default ListPhaseContainer;
