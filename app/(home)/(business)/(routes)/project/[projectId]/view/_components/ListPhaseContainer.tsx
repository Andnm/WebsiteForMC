"use client";

import { PhaseType } from "@/src/types/phase.type";
import React from "react";
import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { useUserLogin } from "@/src/hook/useUserLogin";

interface ListPhaseContainerProps {
  project: any;
  projectId: number;
  groupId: number;
  phaseData: PhaseType[];
  setPhaseData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListPhaseContainer = ({
  project,
  projectId,
  groupId,
  phaseData,
  setPhaseData,
}: ListPhaseContainerProps) => {
  // console.log("phasedata", phaseData);
  const [userLogin, setUserLogin] = useUserLogin();

  return (
    <ol className="flex gap-x-3 h-full flex-wrap">
      {Array.isArray(phaseData) &&
      phaseData.length === 0 &&
      userLogin?.role_name !== "Student" ? (
        <p className="text-white">Sinh viên chưa tạo giai đoạn</p>
      ) : (
        phaseData?.map((phase, index) => {
          return (
            <ListItem
              key={index}
              index={index}
              project={project}
              data={phase}
              groupId={groupId}
              setPhaseData={setPhaseData}
            ></ListItem>
          );
        })
      )}

      <ListForm
        project={project}
        groupId={groupId}
        projectId={projectId}
        phaseData={phaseData}
        setPhaseData={setPhaseData}
      />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );

  // mới sửa khúc này
};

export default ListPhaseContainer;
