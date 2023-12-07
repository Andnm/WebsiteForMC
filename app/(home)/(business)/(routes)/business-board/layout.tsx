"use client"

import React from "react";
import BusinessSidebar from "./_components/BusinessSidebar";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "@/src/redux/store";

const BusinessBoardLayout = (props: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  return (
      <main className="py-4 md:py-4 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <BusinessSidebar />
          </div>
          {props.children}
        </div>
      </main>
    
  );
};

export default BusinessBoardLayout;
