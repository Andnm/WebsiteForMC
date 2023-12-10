"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/src/components/form/FormInput";
import { FormTextArea } from "@/src/components/form/FormTextArea";
import { CategoryType } from "@/src/types/category.type";
import { Plus, X } from "lucide-react";
import React, { forwardRef } from "react";

interface CategoryFormProps {
  phaseId: number;
  groupId: number;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

const CategoryForm = forwardRef<HTMLTextAreaElement, CategoryFormProps>(
  ({ phaseId, groupId, isEditing, enableEditing, disableEditing }, ref) => {
    const [formData, setFormData] = React.useState<CategoryType>({
      category_name: "",
      detail: "",
      category_start_date: "",
      category_expected_end_date: "",
      result_expected: "",
      phaseId: phaseId,
      groupId: groupId,
    });

    const handleChange = (field: keyof CategoryType, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

    if (isEditing) {
      return (
        <form className="m-1 py-0.5 px-1 space-y-4">
          <FormInput
            type="text"
            id="category_name"
            className="w-full px-2 py-1 h-7 border-transparent border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào tên hạng mục"
            value={formData.category_name}
            onChange={(e) => handleChange("category_name", e.target.value)}
          />

          <FormTextArea
            id="title"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Nhập chi tiết..."
            value={formData.detail}
            onChange={(e) => handleChange("detail", e.target.value)}         
          />

          <FormInput
            type="date"
            id="category_start_date"
            className="w-full px-2 py-1 h-7 border-transparent border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào category_start_date"
            value={formData.category_start_date}
            onChange={(e) => handleChange("category_start_date", e.target.value)}         
           />

          <FormInput
            type="date"
            id="category_expected_end_date"
            className="w-full px-2 py-1 h-7 border-transparent border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào category_expected_end_date"
            value={formData.category_expected_end_date}
            onChange={(e) => handleChange("category_expected_end_date", e.target.value)}         
           />

          <FormTextArea
            id="result_expected"
            onKeyDown={() => {}}
            ref={ref}
            placeholder="Nhập kết quả mong muốn ..."
            value={formData.result_expected}
            onChange={(e) => handleChange("result_expected", e.target.value)}         
           />

          <input hidden id="phaseId" name="phaseId" value={phaseId} />

          <input hidden id="groupId" name="groupId" value={groupId} />

          <div className="flex items-center gap-x-1">
            <button
              type="submit"
              className="bg-blue-500 text-sm text-white hover:bg-blue-300 transition px-3 py-2"
              style={{ borderRadius: "7px" }}
            >
              Tạo category
            </button>
            <Button onClick={disableEditing} size="sm" variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="h-auto px-2 py-1.5 w-full 
          justify-start text-muted-foreground text-sm
          hover:opacity-60"
          size="sm"
          variant={"ghost"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm category
        </Button>
      </div>
    );
  }
);

CategoryForm.displayName = "CategoryForm";
export default CategoryForm;
