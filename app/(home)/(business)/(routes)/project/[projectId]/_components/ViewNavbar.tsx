"use client";

import { ProjectType } from "@/src/types/project.type";
import { ViewTitleForm } from "./ViewTitleForm";
import ProgressLoading from "@/src/components/loading/ProgressLoading";
import { Button } from "@/components/ui/button";
import { useUserLogin } from "@/src/hook/useUserLogin";
import { Drawer, IconButton } from "@material-tailwind/react";
import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Check, MoreHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BiDetail } from "react-icons/bi";
import { useAppDispatch } from "@/src/redux/store";
import {
  changeStatusProjectByLecturer,
  checkProjectCanDone,
} from "@/src/redux/features/projectSlice";
import toast from "react-hot-toast";
import {
  changeStatusFromEnToVn,
  getColorByProjectStatus,
} from "@/src/utils/handleFunction";

interface ViewNavbarProps {
  dataProject: any;
  setDataProject: any;
}

const TABLE_HEAD = [
  "Doanh nghiệp xác nhận",
  "Giảng viên xác nhận",
  "File tổng kết",
];

const TABLE_ROWS = [
  {
    business_confirm: "Chưa xác nhận",
    lecture_confirm: "Chưa xác nhận",
    summary_report: "Nộp file",
  },
];

export const ViewNavbar = ({
  dataProject,
  setDataProject,
}: ViewNavbarProps) => {
  console.log("dataProject", dataProject);
  const [userLogin, setUserLogin] = useUserLogin();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleDoneProject = () => {
    dispatch(checkProjectCanDone(dataProject?.id)).then((result) => {
      if (checkProjectCanDone.fulfilled.match(result)) {
        const projectId = dataProject.id;
        const projectStatus = "Done";
        dispatch(
          changeStatusProjectByLecturer({ projectId, projectStatus })
        ).then((res) => {
          if (changeStatusProjectByLecturer.fulfilled.match(res)) {
            toast.success(`Thay đổi trạng thái dự án thành công!`);
            setDataProject(res.payload);
          } else {
            toast.error(`${res.payload}`);
          }
        });
      } else {
        toast.error(`${result.payload}`);
        return;
      }
    });
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-gray-800/50 z-10"
          onClick={closeDrawer}
        ></div>
      )}

      <div
        className="w-full h-14 z-20 bg-black/50 fixed top-17 flex
  items-center px-6 gap-x-4 text-white justify-between"
      >
        <div className="flex gap-2 items-center">
          <p>Trạng thái dự án: </p>
          <div
            className={`${getColorByProjectStatus(
              dataProject?.project_status
            )} px-3 py-1 rounded-xl`}
          >
            {changeStatusFromEnToVn(dataProject?.project_status)}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {!open && dataProject?.project_status === "Done" && (
            <Button
              onClick={openDrawer}
              className="bg-teal-300 text-teal-900 hover:bg-teal-300 rounded"
            >
              Tổng kết
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-auto w-auto p-2" variant={"ghost"}>
                <MoreHorizontal className="h-6 w-6 ml-[420px]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="px-0 pt-3 pb-3 bg-white ml-[420px]"
              side="bottom"
              align="start"
              style={{ borderRadius: "7px" }}
            >
              <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                Các chức năng khác
              </div>

              <Button
                className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
                variant={"ghost"}
              >
                <BiDetail className="w-3 h-3 mr-1" /> Chi tiết dự án
              </Button>

              {userLogin?.role_name === "Lecturer" && (
                <Button
                  className="rounded-none w-full h-auto p-2 px-5 justify-start hover:bg-gray-200/100"
                  variant={"ghost"}
                  onClick={handleDoneProject}
                >
                  <Check className="w-3 h-3 mr-1" /> Hoàn thành dự án
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <Drawer
          overlay={false}
          placement="right"
          open={open}
          onClose={closeDrawer}
          className="p-4"
          size={700}
        >
          <div className="mb-6 flex items-center justify-between">
            <h5 className="text-black font-bold text-lg">TỔNG KẾT</h5>
            <IconButton variant="text" onClick={closeDrawer}>
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

          <div className="flex gap-2 text-black border-black">
            <Card className="h-full w-full overflow-hidden mt-32">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(
                    (
                      { business_confirm, lecture_confirm, summary_report },
                      index
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={index}>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {business_confirm}
                            </Typography>
                          </td>
                          <td className={`${classes} bg-blue-gray-50/50`}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {lecture_confirm}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Button className="font-normal">
                              {summary_report}
                            </Button>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </Card>
          </div>
        </Drawer>

        <ViewTitleForm />
      </div>
    </>
  );
};
