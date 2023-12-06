"use client";
import React from "react";
import "@/src/styles/admin/manage-project.scss";
import { Card } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getAllProjectByEveryOne } from "@/src/redux/features/projectSlice";
import AdminSpinnerLoading from "@/src/components/loading/AdminSpinnerLoading";
import ManageProjectHeader from "./_components/header";
import ProjectTable from "./_components/table";

const ManageProject = () => {
  const dispatch = useAppDispatch();
  const [dataTable, setDataTable] = React.useState<any[]>([]);
  const { data, loading, error } = useAppSelector((state) => state.project);

  React.useEffect(() => {
    dispatch(getAllProjectByEveryOne()).then((result) => {
      if (getAllProjectByEveryOne.rejected.match(result)) {
        //do something
        console.log(result.payload);
      } else if (getAllProjectByEveryOne.fulfilled.match(result)) {
        const reversedData = [...result.payload].reverse();
        setDataTable(reversedData);
      }
    });
  }, [dispatch]);

  return (
    <Card className="p-4 manager-project">
      <ManageProjectHeader />

      {loading ? (
        <AdminSpinnerLoading />
      ) : (
        <>
          <ProjectTable dataTable={dataTable} />
        </>
      )}
    </Card>
  );
};

export default ManageProject;
