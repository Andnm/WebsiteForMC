"use client";

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
import { formatDate } from "@/src/utils/handleFunction";
import CustomModal from "@/src/components/shared/CustomModal";
import InfoText from "./InfoText";
import StatusCell from "./StatusCell";
import "@/src/styles/admin/manage-project.scss";
import { useAppDispatch } from "@/src/redux/store";
import {
  confirmProjectByAdmin,
  updateProjectByAdmin,
} from "@/src/redux/features/projectSlice";
import toast from "react-hot-toast";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading";

interface ProjectTableProps {
  dataTable: any[];
  setDataTable: React.Dispatch<React.SetStateAction<any[]>>;
  loadingProject: boolean;
}

const TABLE_HEAD = [
  "Doanh nghiệp",
  "Tên dự án",
  "Người phụ trách",
  "Trạng thái",
  "Ngày tạo",
  "",
];

const ProjectTable: React.FC<ProjectTableProps> = ({
  dataTable,
  setDataTable,
  loadingProject,
}) => {
  const dispatch = useAppDispatch();
  const [isOpenModalDetail, setIsOpenModalDetail] = React.useState(false);

  //quản lý thông tin hiện ra
  const [selectedProject, setSelectedProject] = React.useState<any | null>(
    null
  );
  const bodyContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Business Information */}
      <div className="flex items-center space-x-4 mb-8">
        <h3 className="text-lg font-semibold mb-2">Doanh nghiệp:</h3>
        <img
          src={selectedProject?.business?.avatar_url}
          alt={selectedProject?.business?.fullname}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {selectedProject?.business?.fullname}
          </h2>
          <p className="text-gray-500">{selectedProject?.business?.email}</p>
          <p className="text-gray-500">
            Lĩnh vực kinh doanh: {selectedProject?.business_sector}
          </p>
        </div>
      </div>

      {/* Responsible Person Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Người phụ trách</h3>
        <p className="text-gray-600">
          Họ và tên: {selectedProject?.responsible_person?.fullname}
        </p>
        <p className="text-gray-600">
          Chức vụ: {selectedProject?.responsible_person?.position}
        </p>
        <p className="text-gray-600">
          Email: {selectedProject?.responsible_person?.email}
        </p>
        <p className="text-gray-600">
          Số điện thoại: {selectedProject?.responsible_person?.phone_number}
        </p>
      </div>

      {/* Project Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Thông tin dự án</h3>
        <p className="text-gray-600">
          Tên dự án: {selectedProject?.name_project}
        </p>
        <p className="text-gray-600">
          Trạng thái: {selectedProject?.project_status}
        </p>
        <p className="text-gray-600">
          Lĩnh vực chuyên môn: {selectedProject?.specialized_field}
        </p>
        <p className="text-gray-600">Mục đích: {selectedProject?.purpose}</p>
        <p className="text-gray-600">
          Mô tả về dự án: {selectedProject?.description_project}
        </p>
        <p className="text-gray-600">Các lưu ý khác: {selectedProject?.note}</p>
      </div>

      {/* Time Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Thời gian</h3>
        <p className="text-gray-600">
          Thời gian bắt đầu làm:{" "}
          {formatDate(selectedProject?.project_start_date)}
        </p>
        <p className="text-gray-600">
          Thời gian kết thúc:{" "}
          {formatDate(selectedProject?.project_expected_end_date)}
        </p>
      </div>

      {/* Attachment Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Tài liệu đính kèm</h3>
        <p className="text-gray-600">
          {selectedProject?.document_related_link}
        </p>
      </div>

      {/* Created Date Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Ngày tạo</h3>
        <p className="text-gray-600">
          {formatDate(selectedProject?.createdAt)}
        </p>
      </div>
    </div>
  );

  //quản lý thông tin update
  const [isEditMode, setIsEditMode] = React.useState(false);

  const bodyUpdate = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex items-center space-x-4 mb-8">
        <h3 className="text-lg font-semibold mb-2">Doanh nghiệp:</h3>
        <img
          src={selectedProject?.business?.avatar_url}
          alt={selectedProject?.business?.fullname}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {selectedProject?.business?.fullname}
          </h2>
          <p className="text-gray-500">{selectedProject?.business?.email}</p>
        </div>
      </div>

      {/* Responsible Person Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Người phụ trách</h3>
        <label className="block mb-2">Họ và tên</label>
        <input
          type="text"
          value={selectedProject?.responsible_person?.fullname}
          onChange={(e) =>
            setSelectedProject((prevSelectedProject: any) => ({
              ...prevSelectedProject,
              responsible_person: {
                ...prevSelectedProject.responsible_person,
                fullname: e.target.value,
              },
            }))
          }
          className="admin-project-input-field"
        />

        <label className="block mb-2">Chức vụ</label>
        <input
          type="text"
          value={selectedProject?.responsible_person?.position}
          onChange={(e) =>
            setSelectedProject((prevSelectedProject: any) => ({
              ...prevSelectedProject,
              responsible_person: {
                ...prevSelectedProject.responsible_person,
                position: e.target.value,
              },
            }))
          }
          className="admin-project-input-field"
        />

        <label className="block mb-2">Email</label>
        <input
          type="text"
          value={selectedProject?.responsible_person?.email}
          onChange={(e) =>
            setSelectedProject((prevSelectedProject: any) => ({
              ...prevSelectedProject,
              responsible_person: {
                ...prevSelectedProject.responsible_person,
                email: e.target.value,
              },
            }))
          }
          className="admin-project-input-field"
        />

        <label className="block mb-2">Số điện thoại</label>
        <input
          type="text"
          value={selectedProject?.responsible_person?.phone_number}
          onChange={(e) =>
            setSelectedProject((prevSelectedProject: any) => ({
              ...prevSelectedProject,
              responsible_person: {
                ...prevSelectedProject.responsible_person,
                phone_number: e.target.value,
              },
            }))
          }
          className="admin-project-input-field"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Thông tin dự án</h3>
        <label>Tên dự án:</label>
        <input
          type="text"
          value={selectedProject?.name_project}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              name_project: e.target.value,
            })
          }
          className="admin-project-input-field"
        />
        ...các thông tin khác
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Thời gian</h3>
        <input
          type="text"
          value={formatDate(selectedProject?.project_start_date)}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              project_start_date: e.target.value,
            })
          }
          className="admin-project-input-field"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Tài liệu đính kèm</h3>
        <input
          type="text"
          value={selectedProject?.document_related_link}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              document_related_link: e.target.value,
            })
          }
          className="admin-project-input-field"
        />
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Thời gian</h3>
        <input
          type="text"
          value={formatDate(selectedProject?.createdAt)}
          onChange={(e) =>
            setSelectedProject({
              ...selectedProject,
              project_start_date: e.target.value,
            })
          }
          className="admin-project-input-field"
        />
      </div>
    </div>
  );

  const handleOpenModalDetails = (business: any) => {
    // console.log(business);
    setSelectedProject(business);
    setIsOpenModalDetail(true);
  };

  const handleCloseModalDetails = () => {
    setSelectedProject(null);
    setIsOpenModalDetail(false);
  };

  const handleCloseUpdateProject = () => {
    setIsEditMode(false);
  };

  const handleClickOpenInfo = (business: any) => {
    // console.log("Open info", business);
  };

  const handleClickRemoveProject = (business: any) => {
    // console.log("Remove project", business);
  };

  //handle function when open detail project
  //hàm vừa THAY ĐỔI vừa phê duyệt
  const handleUpdateAndConfirmProject = (id: number) => {
    // console.log("update nè");

    const newDataArray = {
      fullname: selectedProject?.responsible_person?.fullname,
      position: selectedProject?.responsible_person?.position,
      email_responsible_person: selectedProject?.responsible_person?.email,
      phone_number: selectedProject?.responsible_person?.phone_number,
      name_project: selectedProject?.name_project,
      business_sector: selectedProject?.business_sector,
      specialized_field: selectedProject?.specialized_field,
      purpose: selectedProject?.purpose,
      description_project: selectedProject?.description_project,
      request: selectedProject?.request,
      note: selectedProject?.note,
      document_related_link: selectedProject?.document_related_link,
      project_registration_expired_date:
        selectedProject?.project_registration_expired_date,
      project_start_date: selectedProject?.project_start_date,
      project_expected_end_date: selectedProject?.project_expected_end_date,
    };

    const dataResponse = {
      id: id,
      data: newDataArray,
    };

    dispatch(updateProjectByAdmin(dataResponse)).then((result: any) => {
      if (updateProjectByAdmin.fulfilled.match(result)) {

        setDataTable((prevDataTable) => {
          const updatedIndex = prevDataTable.findIndex(
            (item) => item.id === result.payload.id
          );

          if (updatedIndex !== -1) {
            const newDataTable = [...prevDataTable];
            newDataTable[updatedIndex] = result.payload;
            return newDataTable;
          }

          return prevDataTable;
        });

        toast.success("Cập nhập dự án thành công!");
      } else if (updateProjectByAdmin.rejected.match(result)) {
        toast.error(`${result.payload}`);
        // console.log(result.payload);
      }
    });

    setIsEditMode(false);
    setIsOpenModalDetail(false);
  };

  // hàm phê duyệt
  const handleConfirmProject = (id: number) => {
    // console.log("confirm nè");
    dispatch(confirmProjectByAdmin(id)).then((result) => {
      if (confirmProjectByAdmin.fulfilled.match(result)) {
        // console.log(result.payload);
        toast.success("Phê duyệt thành công!");
      } else if (confirmProjectByAdmin.rejected.match(result)) {
        toast.error(`${result.payload}`);
        // console.log(result.payload);
      }
    });

    setIsOpenModalDetail(false);
  };

  const handleChangeConfirmIntoUpdate = () => {
    setIsEditMode(!isEditMode);
  };

  const body = isEditMode ? bodyUpdate : bodyContent;

  const actionClose = isEditMode
    ? handleCloseUpdateProject
    : handleCloseModalDetails;

  const actionConfirm = isEditMode
    ? () => handleUpdateAndConfirmProject(selectedProject.id)
    : () => handleConfirmProject(selectedProject.id);

  const buttonConfirm = isEditMode ? "Xác nhận thay đổi" : "Phê duyệt";

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
          {dataTable.map((business: any, index) => {
            const isLast = index === dataTable.length - 1;

            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            const solutions = [
              {
                name: "Chi tiết",
                icon: <BiDetail />,
                onClick: () => handleOpenModalDetails(business),
              },
              {
                name: "Sửa thông tin",
                icon: <CiEdit />,
                onClick: () => handleClickOpenInfo(business),
              },
              {
                name: "Xóa dự án",
                icon: <MdOutlinePlaylistRemove />,
                onClick: () => handleClickRemoveProject(business),
              },
            ];

            return (
              <>
                <tbody key={index}>
                  <tr>
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
                                        onClick={() => item.onClick()}
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
                </tbody>

                {isOpenModalDetail && selectedProject && (
                  <CustomModal
                    open={isOpenModalDetail}
                    title={
                      <div className="flex items-center gap-2">
                        {isEditMode ? 'Sửa dự án' : 'Thông tin dự án'}
                        <CiEdit
                          className="cursor-pointer"
                          onClick={handleChangeConfirmIntoUpdate}
                        />
                      </div>
                    }
                    body={body}
                    actionClose={actionClose}
                    buttonClose={"Hủy"}
                    actionConfirm={actionConfirm}
                    buttonConfirm={buttonConfirm}
                  />
                )}
              </>
            );
          })}
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

      {loadingProject && <SpinnerLoading />}
    </>
  );
};

export default ProjectTable;
