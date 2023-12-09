import { DialogViewProject } from "@/components/alert-dialog/DialogViewProject";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

interface PitchingProjectListProps {
  dataPitching: any[];
  setDataPitching: React.Dispatch<React.SetStateAction<any[]>>;
  loadingPitching?: boolean;
}

const ProjectListStudent: React.FC<PitchingProjectListProps> = ({
  dataPitching,
  setDataPitching,
  loadingPitching,
}) => {
  const getProjectNameByStatus = (status: string) => {
    switch (status) {
      case "Pending":
        return "Dự án đang chờ phê duyệt";
      case "Selected":
        return "Dự án đã được chọn";
      case "Rejected":
        return "Dự án đã bị từ chối";
      default:
        return "Tên dự án không xác định";
    }
  };

  const groupProjectsByStatus = () => {
    const groupedProjects: Record<string, any[]> = {};

    dataPitching.forEach((pitching) => {
      const status = getProjectNameByStatus(pitching.register_pitching_status);
      if (!groupedProjects[status]) {
        groupedProjects[status] = [];
      }
      groupedProjects[status].push(pitching);
    });

    return groupedProjects;
  };

  const renderProjectsByStatus = () => {
    const groupedProjects = groupProjectsByStatus();

    return Object.entries(groupedProjects).map(([status, pitchings]) => (
      <div key={status}>
        <div className="flex items-center font-semibold text-lg text-neutral-700 mb-4">
          <p className="">{status}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {pitchings.map((pitching) =>
            pitching.register_pitching_status === "Selected" ? (
              <Link
                key={pitching.id}
                href={`/project/${pitching.project.id}/view`}
                className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                style={{
                  backgroundImage: `url('https://inkythuatso.com/uploads/thumbnails/800/2022/07/1-tranh-phong-canh-hoang-hon-inkythuatso-21-11-19-46.jpg')`,
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
                <p className="inline-flex w-full overflow-hidden relative font-semibold text-white">
                  {pitching.project.name_project}
                </p>
              </Link>
            ) : (
              <DialogViewProject project={pitching.project} key={pitching.id}>
                <div
                  role="button"
                  className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-start p-2
                  hover:opacity-50 transition"
                  style={{
                    backgroundColor: "rgb(229 231 235)",
                  }}
                >
                  <p className="inline-flex items-start text-base font-bold w-full overflow-hidden text-black">
                    {pitching.project.name_project}
                  </p>
                </div>
              </DialogViewProject>
            )
          )}
        </div>
      </div>
    ));
  };

  if (loadingPitching) {
    return (
      <>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="h-28 w-full" />
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-40" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="space-y-4">
        <div className="flex items-center font-semibold text-lg text-neutral-700">
          <p className="uppercase">Danh sách dự án</p>
        </div>
        {renderProjectsByStatus()}
      </div>
    </div>
  );
};

export default ProjectListStudent;
