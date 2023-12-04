"use client";

import GeneralHeader from "@/src/components/shared/GeneralHeader";
import React from "react";

const BusinessLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="">
      <GeneralHeader />

      <div>{props.children}</div>
    </div>
  );
};

export default BusinessLayout;
