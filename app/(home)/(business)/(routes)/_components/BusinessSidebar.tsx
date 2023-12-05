"use client";

import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
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

interface SidebarProps {}

const BusinessSidebar = () => {
    
  const routes = [
    {
        label: "View",
        icon: <MdOutlineGridView className="w-5 h-5"/>,
        href: '/business-board/view'
    },
    {
        label: "Group",
        icon: <HiOutlineUserGroup className="w-5 h-5"/>,
        href: '/business-board/group'
    },
    {
        label: "Setting",
        icon: <IoSettingsOutline  className="w-5 h-5"/>,
        href: '/business-board/setting'
    }
  ];

  const DefaultAvatarURL =
    "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg";

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-project">
            <FiPlus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion type="multiple">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger
            className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 
          transition text-start no-underline hover:no-underline
          bg-sky-500/10 text-sky-700"
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
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default BusinessSidebar;
