import React from "react";
import { Drawer, IconButton } from "@material-tailwind/react";

interface DrawerFilterProps {
  openDrawer: any;
  closeDrawerAction: any;
}

const DrawerFilter = ({ openDrawer, closeDrawerAction }: DrawerFilterProps) => {
  return (
    <Drawer
      overlay={false}
      placement="right"
      open={openDrawer}
      onClose={closeDrawerAction}
      className="p-4 shadow-md"
      size={700}
    >
      <div className="mb-6 flex items-center justify-between ">
        <h5 className="text-black font-bold text-lg">Bộ lọc</h5>
        <IconButton variant="text" onClick={closeDrawerAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
    </Drawer>
  );
};

export default DrawerFilter;
