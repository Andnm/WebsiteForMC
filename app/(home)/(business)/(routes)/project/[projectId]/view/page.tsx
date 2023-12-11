"use client";

import React from "react";
import { useParams } from "next/navigation";
import ListPhaseContainer from "./_components/ListPhaseContainer";
import { getPhaseByProjectId } from "@/src/redux/features/phaseSlice";
import { PhaseType } from "@/src/types/phase.type";
import { useAppDispatch } from "@/src/redux/store";
import { getAllRegisterPitchingByBusiness } from "@/src/redux/features/pitchingSlice";
import ProgressLoading from "@/src/components/loading/ProgressLoading";

const ProjectIdPage = () => {
  const params = useParams<{ projectId: string }>();
  const dispatch = useAppDispatch();
  const [phaseData, setPhaseData] = React.useState<any | null>();
  const [groupId, setGroupId] = React.useState<number>(0);

  React.useEffect(() => {
    const projectId = parseInt(params.projectId, 10);
    dispatch(getPhaseByProjectId(projectId)).then((result) => {
      console.log('phase', result)
      setPhaseData(result.payload);
    });

    dispatch(getAllRegisterPitchingByBusiness(projectId)).then((result) => {
      if (getAllRegisterPitchingByBusiness.fulfilled.match(result)) {
        // console.log('group', result.payload);
        const selectedGroup = result.payload.find(
          (item: any) => item.register_pitching_status === "Selected"
        );

        if (selectedGroup) {
          // console.log(selectedGroup)
          setGroupId(selectedGroup.group.id);
        }
      } else {
      }
    });
  }, [params.projectId]);

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ProgressLoading phaseData={phaseData}/>
      
      {phaseData !== null && (
        <ListPhaseContainer
          projectId={parseInt(params.projectId, 10)}
          groupId={groupId}
          phaseData={phaseData}
          setPhaseData={setPhaseData}
        />
      )}
    </div>
  );
};

export default ProjectIdPage;
