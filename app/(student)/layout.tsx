"use client";

import GeneralHeader from "@/src/components/shared/GeneralHeader";
import React from "react";

const StudentLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="">
      <GeneralHeader />

      <div>{props.children}</div>
    </div>
  );
};

export default StudentLayout;
