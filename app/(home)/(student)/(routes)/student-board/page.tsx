"use client";

import React from "react";
import ProjectListStudent from "./_components/ProjectListStudent";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getAllRegisterPitchingByStudent } from "@/src/redux/features/pitchingSlice";
import { socketInstance } from "@/src/utils/socket/socket-provider";
import { useUserLogin } from "@/src/hook/useUserLogin";

const StudentBoard = () => {
  const [dataPitching, setDataPitching] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();
  const [userLogin, setUserLogin] = useUserLogin();

  const { data, loadingPitching, error } = useAppSelector(
    (state) => state.pitching
  );

  React.useEffect(() => {
    dispatch(getAllRegisterPitchingByStudent()).then((result) => {
      if (getAllRegisterPitchingByStudent.fulfilled.match(result)) {
        socketInstance.on(`getAllRegisterPitching-${userLogin?.email}`, (data) => {
          console.log("data", data)
          setDataPitching(data.registerPitchings);
        });

        // console.log("hai", result.payload);
        // setDataPitching(result.payload);
      }
    });
  }, [userLogin]);

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
