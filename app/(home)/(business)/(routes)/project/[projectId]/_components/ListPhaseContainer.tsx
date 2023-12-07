"use client";

interface ListPhaseContainerProps {
  projectId: number;
  phaseData: PhaseType;
}

import { PhaseType } from "@/src/types/phase.type";
import React from "react";

const ListPhaseContainer = ({
  projectId,
  phaseData,
}: ListPhaseContainerProps) => {
  return (
    <div>
      {Array.isArray(phaseData) && phaseData.length > 0 ? (
        <div>{/* do something */}</div>
      ) : (
        <div>Chưa có giai đoạn nào được khởi tạo.</div>
      )}
    </div>
  );
};

export default ListPhaseContainer;
