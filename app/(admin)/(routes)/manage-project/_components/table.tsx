import React, { Fragment } from "react";
import "@/src/styles/admin/manage-project.scss";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BiDetail } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlinePlaylistRemove } from "react-icons/md";
import { Popover, Transition } from "@headlessui/react";
import {
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import {
  formatDate,
  getColorByProjectStatus,
} from "@/src/utils/handleFunction";

interface ProjectTableProps {
  dataTable: any[];
}

const TABLE_HEAD = [
  "Doanh nghiệp",
  "Tên dự án",
  "Người phụ trách",
  "Trạng thái",
  "Ngày tạo",
  "",
];

const solutions = [
  {
    name: "Chi tiết",
    icon: <BiDetail />,
  },
  {
    name: "Sửa thông tin",
    icon: <CiEdit />,
  },
  {
    name: "Xóa dự án",
    icon: <MdOutlinePlaylistRemove />,
  },
];

const InfoText: React.FC<{ className?: string; children: any }> = ({
  className,
  children,
}) => {
  return (
    <Typography
      variant="small"
      color="blue-gray"
      className={`font-normal ${className}`}
    >
      {children}
    </Typography>
  );
};

const StatusCell: React.FC<{ status: string; classes: string }> = ({
  status,
  classes,
}) => {
  return (
    <td className={classes}>
      <div className="w-max">
        <p
          className={`py-1 px-2 font-bold uppercase text-xs ${getColorByProjectStatus(
            status
          )}`}
          style={{ borderRadius: "7px" }}
        >
          {status}
        </p>
      </div>
    </td>
  );
};

const ProjectTable: React.FC<ProjectTableProps> = ({ dataTable }) => {
  if (dataTable.length === 0) {
    return (
      <CardBody className="text-center">
        <InfoText>Chưa có dự án nào được tạo.</InfoText>
      </CardBody>
    );
  }

  return (
    <>
      <CardBody className="px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <InfoText className="flex items-center gap-2 leading-none opacity-70">
                    {head}
                    {index !== TABLE_HEAD.length - 1 && (
                      <RiExpandUpDownLine className="h-4 w-4" />
                    )}
                  </InfoText>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTable.map((business: any, index) => {
              const isLast = index === dataTable.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={business?.business?.avatar_url}
                        alt={business?.business?.fullname}
                        size="sm"
                      />
                      <div className="flex flex-col">
                        <InfoText>{business?.business?.fullname}</InfoText>

                        <InfoText className="opacity-70">
                          {business?.business?.email}
                        </InfoText>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <InfoText>{business?.name_project}</InfoText>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <InfoText>
                        {business?.responsible_person?.fullname}
                      </InfoText>

                      <InfoText className="opacity-70">
                        {business?.responsible_person?.position}
                      </InfoText>
                    </div>
                  </td>

                  <StatusCell
                    status={business.project_status}
                    classes={classes}
                  />

                  <td className={classes}>
                    <InfoText>{formatDate(business?.createdAt)}</InfoText>
                  </td>

                  <td className={classes}>
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={`
                ${open ? "text-red" : "text-black"}
                group inline-flex items-cente
                px-3 py-2 text-base font-medium hover:text-red focus:outline-none 
                focus-visible:ring-2 focus-visible:ring-white/75`}
                          >
                            <BiDotsHorizontalRounded />
                          </Popover.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 -translate-y-3"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-10"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="popover absolute left-1/2 z-10 mt-3 w-screen max-w-max -translate-x-full transform px-4 sm:px-0">
                              <div className="rounded-lg shadow-lg ring-1 ring-black/5">
                                <div className="relative grid bg-white">
                                  {solutions.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex flex-row gap-2 items-center px-5 py-3 cursor-pointer hover:bg-gray-200"
                                    >
                                      {item.icon}
                                      {item.name}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default ProjectTable;
