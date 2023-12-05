"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

import { FiPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineGridView } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";

interface SidebarProps {}

const BusinessSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const navItem = [
    {
      label: "Quản lý dự án",
      icon: <MdOutlineAnalytics className="w-5 h-5" />,
      href: "/business-board",
    },
    {
      label: "Lịch sử hoạt động",
      icon: <LuHistory className="w-5 h-5" />,
      href: "/business-board/#",
    },
    {
      label: "Dự án mẫu",
      icon: <GoProjectRoadmap className="w-5 h-5" />,
      href: "/business-board/#",
    },
  ];

  const routesInProject = [
    {
      label: "View",
      icon: <MdOutlineGridView className="w-5 h-5" />,
      href: "/business-board/view",
    },
    {
      label: "Group",
      icon: <HiOutlineUserGroup className="w-5 h-5" />,
      href: "/business-board/group",
    },
    {
      label: "Chat",
      icon: <IoChatboxEllipsesOutline className="w-5 h-5" />,
      href: "/business-board/chat",
    },
    {
      label: "Setting",
      icon: <IoSettingsOutline className="w-5 h-5" />,
      href: "/business-board/setting",
    },
  ];

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  const DefaultAvatarURL =
    "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg";

  if (!true) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-8 w-[50%]" />
          <Skeleton className="h-8 w-10" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 relative shrink-0">
              <Skeleton className="h-full w-full absolute" />
            </div>
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {navItem.map((route, index) => (
        <Button
          size="sm"
          onClick={() => handleNavigate(route.href)}
          className={cn(
            "w-full font-normal justify-start hover:bg-neutral-500/10 gap-2 rounded-md",
            pathName === route.href && "bg-sky-500/10 text-sky-700"
          )}
          variant="ghost"
          key={index}
        >
          {route.icon}
          {route.label}
        </Button>
      ))}

      <Separator className="bg-gray-400 my-4" />

      <div className="font-medium text-xs flex items-center mb-3">
        <span>Dự án gần đây</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto justify-end mr-1 cursor-pointer hover:bg-neutral-500/10"
        >
          <FiPlus className="h-4 w-4" />
        </Button>
      </div>

      <Accordion type="multiple">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger
            className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 
          transition text-start no-underline hover:no-underline"
            //   bg-sky-500/10 text-sky-700
            style={{ borderRadius: "6px" }}
          >
            <div className="flex items-center gap-x-2">
              <div className="w-7 h-7 relative flex">
                <img
                  src={DefaultAvatarURL}
                  alt="img"
                  className="rounded-sm object-cover"
                />
              </div>
              <span className="font-medium text-sm">Friendly Project</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-1 text-neutral-700">
            {routesInProject.map((route, index) => (
              <Button
                size="sm"
                onClick={() => handleNavigate(route.href)}
                className={cn(
                  "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 gap-2 rounded-md",
                  pathName === route.href && "bg-sky-500/10 text-sky-700"
                )}
                variant="ghost"
                key={index}
              >
                {route.icon}
                {route.label}
              </Button>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default BusinessSidebar;
