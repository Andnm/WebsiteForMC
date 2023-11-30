"use client";

import SidebarAdmin from "@/src/components/admin/SidebarAdmin";
import React from "react";

const AdminLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="flex layout-admin">
      <SidebarAdmin />

      <div className="main flex-1" style={{ backgroundColor: "#f8fafc" }}>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
