import { getAllProjectByEveryOne } from "@/src/redux/features/projectSlice";
import { useAppDispatch } from "@/src/redux/store";
import { formatDate } from "@/src/utils/handleFunction";
import { socketInstance } from "@/src/utils/socket/socket-provider";
import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const EarliestProjectList = () => {

  const [dataProjectList, setDataProjectList] = React.useState<any[]>([]);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllProjectByEveryOne()).then((result) => {
      if (getAllProjectByEveryOne.fulfilled.match(result)) {
        // getProjects
        // const filteredProjects = result.payload[1].filter((project: any) => {
        //   const expirationDate = new Date(
        //     project.project_registration_expired_date
        //   );
        //   const currentDate = new Date();
        //   return expirationDate > currentDate;
        // });

        socketInstance.on("getProjects", (data: any) => {
          const newListProjects = data?.projects
            ?.filter((project: any) => {
              const expirationDate = new Date(
                project.project_registration_expired_date
              );
              const currentDate = new Date();
              return expirationDate > currentDate;
            })
            ?.sort((a: any, b: any) => {
              const dateA = new Date(a.project_start_date);
              const dateB = new Date(b.project_start_date);
              return dateA.getTime() - dateB.getTime();
            })
            ?.slice(0, 4);
          setDataProjectList(newListProjects);
        });
      } else {
        toast.error("Có lỗi xảy ra khi tải danh sách dự án!");
      }
    });
  }, []);

  return (
    <div  style={{ margin: "auto 0" }}>
      <div
        className="pt-4 ml-10 mb-10"
        style={{ fontSize: '30px', fontWeight: 'bold' }}
      >Một số dự án mới nhất</div>
      <div
        className="flex flex-wrap ml-10 border-2 items-center justify-center pt-4"
        style={{ width: "1000px" }}
      >
        {
          Array.isArray(dataProjectList) &&
          dataProjectList?.slice(0, 4)?.map((project, index) => (
            <Link
              href={`/project-list/detail/${project.id}`}
              className="flex flex-row py-4 px-4 mb-4 mr-4 border-2 gap-2"
              style={{ width: "30vw" }}
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
        }
      </div>
    </div>

  )
};

export default EarliestProjectList;
