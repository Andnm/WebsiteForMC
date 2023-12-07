"use client";

import React from "react";
import ProjectList from "./_components/ProjectList";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  getAllProjectByBusiness,
  getProjectById,
} from "@/src/redux/features/projectSlice";

const BusinessBoard = () => {
  const [dataProjects, setDataProjects] = React.useState<any[]>([]);
  const dispatch: any = useAppDispatch();

  const { data, loadingProject, loadingProjectList, error } = useAppSelector(
    (state) => state.project
  );

  React.useEffect(() => {
    dispatch(getAllProjectByBusiness()).then((result: any) => {
      if (getAllProjectByBusiness.fulfilled.match(result)) {
        setDataProjects(result.payload);
      }else {
        console.log(result.payload)
      }
    });

  }, []);

  return (
    <div className="w-full">
      <ProjectList
        dataProjects={dataProjects}
        setDataProjects={setDataProjects}
        loadingProject={loadingProject}
        loadingProjectList={loadingProjectList}
      />
    </div>
  );
};

export default BusinessBoard;
