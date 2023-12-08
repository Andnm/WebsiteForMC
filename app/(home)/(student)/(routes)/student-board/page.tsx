"use client";

import React from "react";
import ProjectListStudent from "./_components/ProjectListStudent";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getAllRegisterPitching } from "@/src/redux/features/pitchingSlice";

const StudentBoard = () => {
  const [dataPitching, setDataPitching] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();

  const { data, loadingPitching, error } = useAppSelector(
    (state) => state.pitching
  );

  React.useEffect(() => {
    dispatch(getAllRegisterPitching()).then((result) => {
      if (getAllRegisterPitching.fulfilled.match(result)) {
        console.log(result.payload)
        setDataPitching(result.payload);
      }
    });
  }, []);

  return (
    <div className="w-full">
      <ProjectListStudent
        dataPitching={dataPitching}
        setDataPitching={setDataPitching}
        loadingPitching={loadingPitching}
      />
    </div>
  );
};

export default StudentBoard;
