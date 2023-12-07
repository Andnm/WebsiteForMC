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
import { format } from "date-fns";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import Message from "@/src/components/shared/Message";

interface DialogProps {
  children: React.ReactNode;
  dataProjects: any[];
  setDataProjects: React.Dispatch<React.SetStateAction<any[]>>;
}

const fields: { name: keyof ProjectType; label: string }[] = [
  { name: "fullname", label: "Họ và tên" },
  { name: "position", label: "Vị trí" },
  { name: "email_responsible_person", label: "Email người phụ trách" },
  { name: "phone_number", label: "Số điện thoại" },
  { name: "name_project", label: "Tên dự án" },
  { name: "business_sector", label: "Lĩnh vực kinh doanh" },
  { name: "specialized_field", label: "Lĩnh vực chuyên môn" },
  { name: "purpose", label: "Mục đích" },
  { name: "description_project", label: "Mô tả dự án" },
  { name: "request", label: "Yêu cầu" },
  { name: "note", label: "Ghi chú" },
  { name: "document_related_link", label: "Liên kết tài liệu" },
  {
    name: "project_registration_expired_date",
    label: "Ngày hết hạn đăng ký dự án",
  },
  { name: "project_start_date", label: "Ngày bắt đầu dự án" },
  { name: "project_expected_end_date", label: "Ngày dự kiến kết thúc dự án" },
];

export const AlertDialogCreateProject = ({ children }: DialogProps) => {
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

  const { loadingProject, loadingProjectList, error } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const handleInputChange = (name: keyof ProjectType, value: string | Date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: name.includes("date") ? format(new Date(value), "yyyy-MM-dd") : value,
    }));
  };
  
  const renderFormFields = () => {
    return fields.map((field) => (
      <div key={field.name} className="mb-4">
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700"
        >
          {field.label}
        </label>
        <input
          type={field.name.includes("date") ? "date" : "text"}
          id={field.name}
          name={field.name}
          value={formData[field.name] as string}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
    ));
  };

  const handleCreate = () => {
    dispatch(createNewProject(formData as ProjectType)).then((result) => {
      if (createNewProject.rejected.match(result)) {
        //do something
        console.log(result.payload);
      } else if (createNewProject.fulfilled.match(result)) {
        toast.success("Tạo dự án thành công!");
        setOpen(false);
      }
    });
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
          <AlertDialogCancel className="rounded-sm bg-orange-200 border-orange-200 border-2">
            Hủy
          </AlertDialogCancel>
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
