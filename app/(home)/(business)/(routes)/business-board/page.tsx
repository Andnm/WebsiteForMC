"use client";

import React from "react";
import ProjectList from "./_components/ProjectList";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  getAllProjectByBusiness,
  getProjectById,
} from "@/src/redux/features/projectSlice";
import { socketInstance } from "@/src/utils/socket/socket-provider";

const BusinessBoard = () => {
  const [dataProjects, setDataProjects] = React.useState<any[]>([]);
  const dispatch: any = useAppDispatch();

  const { data, loadingProject, loadingProjectList, error } = useAppSelector(
    (state) => state.project
  );

  React.useEffect(() => {
    dispatch(getAllProjectByBusiness()).then((result: any) => {
      if (getAllProjectByBusiness.fulfilled.match(result)) {
        // socketInstance.on("getProjectsOfBusiness", (data: any) => {
        //   console.log(data)
        // })
        setDataProjects(result.payload);
        // console.log("project", result.payload)
      }else {
        // console.log(result.payload)
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
