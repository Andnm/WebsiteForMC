"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Typography,
  List,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

import { SiSimpleanalytics } from "react-icons/si";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { GoProjectRoadmap } from "react-icons/go";
import { GoReport } from "react-icons/go";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  suffix?: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label, suffix }) => (
  <Link href={href} className="flex items-center">
    {icon}
    <p>{label}</p>
    {suffix && <ListItemSuffix>{suffix}</ListItemSuffix>}
  </Link>
);

const SidebarAdmin = () => {
  return (
    <div className="sidebar-admin h-screen w-full max-w-[15rem] shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="orange" className="text-center">
          MC
        </Typography>
      </div>

      <>
        <div color="blue-gray" className="flex items-center font-bold">
          <div className="bg-blue-gray-300 h-0.5 w-5 mr-2"></div>
          <p className="uppercase text-sm">Công cụ</p>
        </div>

        <List className="px-4 py-4">
          <NavLink
            href={"/dashboard"}
            icon={<SiSimpleanalytics />}
            label="Thống kê"
          />
          <NavLink
            href={"/notification"}
            icon={<IoNotificationsOutline />}
            label="Thông báo"
            suffix={
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            }
          />
        </List>
      </>

      <>
        <div color="blue-gray" className="flex items-center font-bold">
          <div className="bg-blue-gray-300 h-0.5 w-5 mr-2"></div>
          <p className="uppercase text-sm">Quản lý</p>
        </div>

        <List className="px-4 py-4">
          <NavLink
            href={"/manage-account"}
            icon={<MdOutlineAccountCircle />}
            label="Tài khoản"
          />
          <NavLink href={"/manage-group"} icon={<GrGroup />} label="Nhóm" />
          <NavLink
            href={"/manage-project"}
            icon={<GoProjectRoadmap />}
            label="Dự án"
          />
          <NavLink
            href={"/manage-report"}
            icon={<GoReport />}
            label="Báo cáo"
          />
        </List>
      </>
    </div>
  );
};

export default SidebarAdmin;
