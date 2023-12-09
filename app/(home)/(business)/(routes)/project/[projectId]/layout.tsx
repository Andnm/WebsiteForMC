"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { redirect } from "next/navigation";
import "./style.scss";
import { ViewNavbar } from "./_components/ViewNavbar";
import { getProjectById } from "@/src/redux/features/projectSlice";
import { ProjectType } from "@/src/types/project.type";
import ViewSidebar from "./_components/ViewSidebar";

const ViewIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: number };
}) => {
  //   đoạn này để bắt chưa login mà mò vào đây thì cho nó ra ngoài
  //     const { isLogin, loading } = useAppSelector((state) => state.auth);

  //     if (!isLogin) {
  //       redirect("/");
  //     }

  const [dataProject, setDataProject] = React.useState<ProjectType | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getProjectById(params.projectId)).then((result) => {
      if (getProjectById.fulfilled.match(result)) {
        setDataProject(result.payload);
      }
    });
  }, []);

  return (
    <div className="flex">
      <ViewSidebar dataProject={dataProject} />
      <div
        className="layout-view relative bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url('https://inkythuatso.com/uploads/thumbnails/800/2022/07/1-tranh-phong-canh-hoang-hon-inkythuatso-21-11-19-46.jpg')`,
        }}
      >
        <ViewNavbar  />
        
        <div className="absolute inset-0 bg-black/10" />

        <main className="relative pt-14 h-full w-full">{children}</main>
      </div>
    </div>
  );
};

export default ViewIdLayout;