import { AlertDialogCreateProject } from "@/components/alert-dialog/AlertDialogCreateProject";
import { Hint } from "@/components/hint";
import React from "react";
import { IoHelpCircleOutline } from "react-icons/io5";

const ProjectList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <p className="uppercase">dự án của bạn</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <AlertDialogCreateProject>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center
                hover:opacity-50 transition"
            style={{ backgroundColor: "rgb(229 231 235)" }}
          >
            <p className="text-sm">Tạo dự án mới</p>

            <Hint
              sideOffset={40}
              description={`Bấm vào đây để khởi tạo dự án mới`}
            >
              <IoHelpCircleOutline className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </AlertDialogCreateProject>
      </div>
    </div>
  );
};

export default ProjectList;
