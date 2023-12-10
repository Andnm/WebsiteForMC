"use client";

import { PhaseType } from "@/src/types/phase.type";
import React from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";

interface ListPhaseContainerProps {
  projectId: number;
  phaseData: PhaseType[];
  setPhaseData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListPhaseContainer = ({
  projectId,
  phaseData,
  setPhaseData,
}: ListPhaseContainerProps) => {
  console.log(phaseData);

  return (
    <ol className="flex gap-x-3 h-full">
      {Array.isArray(phaseData) && phaseData?.map((phase, index) => {
        return <ListItem key={index} index={index} data={phase}></ListItem>;
      })}

      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};

export default ListPhaseContainer;
