"use client";

import React from "react";
import ScrollGuide from "@/src/components/landing/ScrollGuide";
import { IoIosSearch } from "react-icons/io";
import { MdFilterList } from "react-icons/md";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { getAllProjectByEveryOne } from "@/src/redux/features/projectSlice";
import { formatDate } from "@/src/utils/handleFunction";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

//có 2 trang là ProjectList lận
//trang này là show all project list ở ngoài landing page
//còn trang kia là show all project list của business
const ProjectList = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [dataProjectList, setDataProjectList] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();

  const { loadingProjectList } = useAppSelector((state) => state.project);

  React.useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        const delta = event.deltaY || event.detail || (event as any).wheelDelta;
        container.scrollLeft += delta;
      };

      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  React.useEffect(() => {
    dispatch(getAllProjectByEveryOne()).then((result) => {
      if (getAllProjectByEveryOne.fulfilled.match(result)) {
        setDataProjectList(result.payload[1]);
      }else {
        toast.error('Có lỗi xảy ra khi tải danh sách dự án!')
      } 
    });
  }, []);

  return (
    <>
      <div className="my-1 flex gap-2 justify-end mr-10">
        <div className="relative flex items-center border-b-2 border-gray-500 w-56 h-10 bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <IoIosSearch />
          </div>

          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Gõ thứ gì đó ..."
          />
        </div>

        <Button className="gap-2 ">
          <MdFilterList className="w-5 h-5" />
          Filter
        </Button>
      </div>

      <main
        className="flex-1 overflow-x-hidden overflow-y-hidden"
        ref={containerRef}
      >
        <div className="flex" style={{ height: "calc(100vh - 114px)" }}>
          <div className="text-center max-w-xs flex items-center px-5">
            <p className="text-2xl font-bold text-black-500">
              Tìm kiếm dự án phù hợp với bạn tại đây
            </p>
          </div>

          <div className="flex flex-wrap flex-col ml-10">
            {loadingProjectList ? (
              <>
                <div className="w-80 h-32 relative shrink-0 mb-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4 ml-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4 ml-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4 ml-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4 ml-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4 ml-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
                <div className="w-80 h-32 relative shrink-0 mb-4 ml-4">
                  <Skeleton className="h-full w-full absolute" />
                </div>
              </>
            ) : (
              Array.isArray(dataProjectList) &&
              dataProjectList?.map((project, index) => (
                <Link
                  href={`/project-list/detail/${project.id}`}
                  className="flex flex-row py-4 px-4 mb-4 mr-4 border-2 gap-2"
                  key={index}
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={project?.business?.avatar_url}
                      alt={project?.business?.fullname}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex flex-col overflow-hidden justify-between text-base font-medium text-gray-900">
                        <h3 className="overflow-hidden">
                          {project?.name_project}
                        </h3>
                        <p className="text-sm text-gray-400 italic">
                          {project?.specialized_field}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{""}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">
                        Ngày hết hạn đăng kí:{" "}
                        {formatDate(project?.project_registration_expired_date)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>

      <ScrollGuide containerRef={containerRef} />
    </>
  );
};

export default ProjectList;
