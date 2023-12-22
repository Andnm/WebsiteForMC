"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

import "./style.scss";
import { ProjectType } from "@/src/types/project.type";
import { createNewProject } from "@/src/redux/features/projectSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { addDays, addMonths, format } from "date-fns";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import Message from "@/src/components/shared/Message";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import vn from "date-fns/locale/vi";
import { Hint } from "../hint";
import { IoHelpCircleOutline } from "react-icons/io5";

registerLocale("vi", vn);
setDefaultLocale("vi");

interface DialogProps {
  children: React.ReactNode;
  dataProjects: any[];
  setDataProjects: React.Dispatch<React.SetStateAction<any[]>>;
}

const fieldString: { name: keyof ProjectType; label: string }[] = [
  { name: "fullname", label: "Họ và tên người phụ trách" },
  { name: "position", label: "Vị trí" },
  { name: "email_responsible_person", label: "Email người phụ trách" },
  { name: "phone_number", label: "Số điện thoại người phụ trách" },
  { name: "name_project", label: "Tên dự án" },
  { name: "business_sector", label: "Lĩnh vực kinh doanh" },
  { name: "specialized_field", label: "Lĩnh vực chuyên môn" },
  { name: "purpose", label: "Mục đích" },
  { name: "description_project", label: "Mô tả dự án" },
  { name: "request", label: "Yêu cầu" },
  { name: "note", label: "Ghi chú" },
  { name: "document_related_link", label: "Liên kết tài liệu" },
];

const fieldDate: { name: any; label: string }[] = [
  {
    name: "project_registration_expired_date",
    label: "Ngày hết hạn đăng ký dự án",
  },
  { name: "project_start_date", label: "Ngày bắt đầu dự án" },
  { name: "project_expected_end_date", label: "Ngày dự kiến kết thúc dự án" },
];

export const AlertDialogCreateProject = ({
  children,
  setDataProjects,
}: DialogProps) => {
  const [formData, setFormData] = React.useState<ProjectType>({
    fullname: "",
    position: "",
    email_responsible_person: "",
    phone_number: "",
    name_project: "",
    business_sector: "",
    specialized_field: "",
    purpose: "",
    description_project: "",
    request: "",
    note: "",
    document_related_link: "",
    project_registration_expired_date: "",
    project_start_date: "",
    project_expected_end_date: "",
  });

  const [formDate, setFormDate] = React.useState<any>({
    project_registration_expired_date: null,
    project_start_date: null,
    project_expected_end_date: null,
  });

  const { loadingProject, loadingProjectList, error }: any = useAppSelector(
    (state) => state.project
  );

  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const handleInputChange = (name: keyof ProjectType, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name: any, value: any) => {
    setFormDate((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMinDate = (name: keyof ProjectType): Date => {
    const currentDate = new Date();

    switch (name) {
      case "project_registration_expired_date":
        return addDays(currentDate, 1);
      case "project_start_date":
        const projectRegistrationExpiredDate =
          formDate.project_registration_expired_date;
        return projectRegistrationExpiredDate
          ? addDays(projectRegistrationExpiredDate, 7)
          : addDays(currentDate, 7);
      case "project_expected_end_date":
        const projectStartDate = formDate.project_start_date;
        return addMonths(projectStartDate, 2);
      default:
        return currentDate;
    }
  };

  const handleMaxDate = (name: keyof ProjectType): Date | undefined => {
    switch (name) {
      case "project_expected_end_date":
        const projectStartDate = formDate.project_start_date;
        return projectStartDate ? addMonths(projectStartDate, 3) : undefined;
      default:
        return undefined;
    }
  };

  const getHintDescription = (fieldName: string) => {
    switch (fieldName) {
      case "project_registration_expired_date":
        return "Ngày hết hạn đăng ký dự án phải lớn hơn ngày hiện tại 1 ngày.";
      case "project_start_date":
        return "Ngày bắt đầu dự án phải lớn hơn ngày hết hạn đăng ký 7 ngày.";
      case "project_expected_end_date":
        return "Ngày dự kiến kết thúc dự án phải nằm trong khoảng từ 2 đến 3 tháng tiếp theo của ngày bắt đầu dự án.";
      default:
        return "";
    }
  };

  const renderFormFields = () => {
    return (
      <>
        {fieldString.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>

            <input
              type={""}
              id={field.name}
              name={field.name}
              value={formData[field.name] as string}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
        ))}

        {fieldDate.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
              <Hint
                sideOffset={10}
                description={getHintDescription(field.name)}
                side={"top"}
              >
                <IoHelpCircleOutline className="h-[14px] w-[14px] ml-1" />
              </Hint>
            </label>

            <DatePicker
              className="cursor-pointer border w-full"
              showIcon
              selected={formDate[field.name]}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => handleDateChange(field.name, date)}
              placeholderText=" "
              minDate={handleMinDate(field.name)}
              maxDate={handleMaxDate(field.name)}
            />
          </div>
        ))}
      </>
    );
  };

  const handleCreate = () => {
    const dataBody = {
      ...formData,
      ...formDate,
    };
    dispatch(createNewProject(dataBody as ProjectType)).then((result) => {
      if (createNewProject.rejected.match(result)) {
        //do something
        console.log(result)
        toast.error(`${result.payload}`);
      } else if (createNewProject.fulfilled.match(result)) {
        toast.success("Tạo dự án thành công!");
        setDataProjects((prevData) => [...prevData, result.payload]);
        handleCancel();
      }
    });
  };

  const handleCancel = () => {
    setFormData({
      fullname: "",
      position: "",
      email_responsible_person: "",
      phone_number: "",
      name_project: "",
      business_sector: "",
      specialized_field: "",
      purpose: "",
      description_project: "",
      request: "",
      note: "",
      document_related_link: "",
      project_registration_expired_date: "",
      project_start_date: "",
      project_expected_end_date: "",
    });
    setFormDate({
      project_registration_expired_date: null,
      project_start_date: null,
      project_expected_end_date: null,
    });

    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="opacity-100 max-w-6xl bg-white create-project ">
        <AlertDialogHeader>
          <AlertDialogTitle>Tạo dự án</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="grid grid-cols-4 gap-4"> {renderFormFields()}</div>

        {error && <Message text_color={"text-red-500"} text={error} />}

        <div className="flex gap-4 justify-end">
          <Button
            onClick={handleCancel}
            className="rounded-sm bg-orange-200 border-orange-200 border-2"
          >
            Hủy
          </Button>
          <Button
            onClick={handleCreate}
            className="rounded-sm bg-blue-200 border-blue-200 border-2"
          >
            Tạo Project
          </Button>
        </div>
      </AlertDialogContent>
      {loadingProject && <SpinnerLoading />}
    </AlertDialog>
  );
};
