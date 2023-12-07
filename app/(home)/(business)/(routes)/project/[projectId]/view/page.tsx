"use client";

import React from "react";
import { useParams } from "next/navigation";
import ListPhaseContainer from "../_components/ListPhaseContainer";
import { getPhaseByProjectId } from "@/src/redux/features/phaseSlice";
import { PhaseType } from "@/src/types/phase.type";
import { useAppDispatch } from "@/src/redux/store";

const ProjectIdPage = () => {
  const params = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const [phaseData, setPhaseData] = React.useState<PhaseType | null>(null);

  //điền là view id nhưng thực chất nó là project id
  React.useEffect(() => {
    const projectId = parseInt(params.projectId, 10);
    dispatch(getPhaseByProjectId(projectId)).then((result) => {
      setPhaseData(result.payload);
    });
  }, [params.projectId]);

  return (
    <div className="p-4 h-full overflow-x-auto">
      {phaseData !== null && (
        <ListPhaseContainer
          projectId={parseInt(params.projectId, 10)}
          phaseData={phaseData}
        />
      )}
    </div>
  );
};

export default ProjectIdPage;
