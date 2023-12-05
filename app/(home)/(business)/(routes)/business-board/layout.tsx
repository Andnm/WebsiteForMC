import React from "react";
import BusinessSidebar from "../_components/BusinessSidebar";

const BusinessBoardLayout = (props: { children: React.ReactNode }) => {
  return (
    <main className="pt-2 md:pt-2 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
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
