import React from "react";
import { ProjectType } from "@/src/types/project.type";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BoardTitleFormProps {
  dataProject?: ProjectType;
}

const ViewSidebar = ({ dataProject }: BoardTitleFormProps) => {
  const router = useRouter();
  const pathName = usePathname();

  //xử lý để cắt đường dẫn navigate cho đúng
  const thirdSlashIndex = pathName.indexOf("/", pathName.indexOf("/") + 1);
  const fourthSlashIndex =
    thirdSlashIndex !== -1 ? pathName.indexOf("/", thirdSlashIndex + 1) : -1;
  const currentPath =
    fourthSlashIndex !== -1
      ? pathName.substring(0, fourthSlashIndex + 1)
      : pathName;

  const routesInProject = [
    {
      label: "View",
      icon: <MdOutlineGridView className="w-5 h-5" />,
      href: `${currentPath}view`,
    },
    {
      label: "Group",
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
      href: `${currentPath}group`,
    },
    {
      label: "Chat",
      icon: <IoChatboxEllipsesOutline className="w-5 h-5" />,
      href: `${currentPath}chat`,
    },
    {
      label: "Setting",
      icon: <IoSettingsOutline className="w-5 h-5" />,
      href: `${currentPath}setting`,
    },
  ];

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div className="flex flex-col ">
      <p className="w-64 h-14 bg-black/50 top-17 flex items-center justify-start font-bold text-lg text-white overflow-hidden">
        <span className="inline-block px-10 max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
          {dataProject?.name_project}
        </span>
      </p>

      <div className="flex flex-col">
        {routesInProject.map((route, index) => (
          <Button
            size="sm"
            onClick={() => handleNavigate(route.href)}
            className={cn(
              "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 gap-2 rounded-md",
              pathName.includes(route.href) && "bg-sky-100 text-sky-700"
            )}
            variant="ghost"
            key={index}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ViewSidebar;