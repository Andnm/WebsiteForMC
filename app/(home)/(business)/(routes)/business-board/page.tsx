import React from "react";
import ProjectList from "./_components/ProjectList";
import { getAllProjectByBusiness } from "@/src/redux/features/projectSlice";
import { ProjectType } from "@/src/types/project.type";

const BusinessBoard = () => {

  return (
    <div className="w-full">
      <ProjectList />
    </div>
  );
};

export default BusinessBoard;
