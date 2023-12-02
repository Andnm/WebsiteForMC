"use client";
import React from "react";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

import "../../styles/general-header-style.scss";
import { usePathname } from "next/navigation";

const GeneralHeader = () => {
  const navItemsGeneral = [
    {
      nameItem: "Danh sách dự án",
      path: "/project-list",
    },
    {
      nameItem: "Về chúng tôi",
      path: "/about-us",
    },
    {
      nameItem: "Liên lạc",
      path: "/contact",
    },
  ];

  const pathName = usePathname();

  const navItemsStudent = ["Pages", "Account", "Blocks", "Docs"];
  const navItemsBusiness = ["Pages", "Account", "Blocks", "Docs"];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItemsGeneral.map((item, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="white"
          className="p-1 font-normal nav-items"
        >
          <Link
            href={item.path}
            className={`flex items-center ${
              pathName === item.path && "active"
            }`}
          >
            {item.nameItem}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="general-header-container top-0 z-10 h-max max-w-full border-0 rounded-none px-4 py-2 lg:px-8 lg:py-3">
      <div className="flex items-center justify-between text-white">
        <Link
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium brand-name"
        >
          MC
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>

          <div className="search-container">
            <input
              type="text"
              name="text"
              className="input"
              required
              placeholder="Gõ để tìm kiếm ..."
            />

            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <title>Search</title>
                <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M338.29 338.29L448 448"
                ></path>
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <button className="hidden lg:inline-block btn-login">
              <Link href="/login">
                <span className="text-black">Đăng nhập</span>
              </Link>
            </button>

            <button className="hidden lg:inline-block btn-signup">
              <Link href="/register">
                <span className="text-white hover:text-black">Đăng kí</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralHeader;
