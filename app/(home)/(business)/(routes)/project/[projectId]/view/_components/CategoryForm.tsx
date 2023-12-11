"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/src/components/form/FormInput";
import { FormTextArea } from "@/src/components/form/FormTextArea";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import { useUserLogin } from "@/src/hook/useUserLogin";
import { createCategory } from "@/src/redux/features/categorySlice";
import { getAllRegisterPitchingByBusiness } from "@/src/redux/features/pitchingSlice";
import { useAppDispatch } from "@/src/redux/store";
import { CategoryType } from "@/src/types/category.type";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { forwardRef } from "react";
import toast from "react-hot-toast";

interface CategoryFormProps {
  phaseId: number;
  dataCategory: CategoryType[];
  setDataCategory: React.Dispatch<React.SetStateAction<any[]>>;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

const CategoryForm = forwardRef<HTMLTextAreaElement, CategoryFormProps>(
  (
    {
      phaseId,
      isEditing,
      setDataCategory,
      dataCategory,
      enableEditing,
      disableEditing,
    },
    ref
  ) => {
    const dispatch = useAppDispatch();
    const [loading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState<CategoryType>({
      category_name: "",
      detail: "",
      category_start_date: "",
      category_expected_end_date: "",
      result_expected: "",
      phaseId: phaseId,
      groupId: 0,
    });
    const [userLogin, setUserLogin] = useUserLogin();

    const handleChange = (field: keyof CategoryType, value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

    const handleCreateCategory = (e: React.FormEvent) => {
      e.preventDefault();

      setIsLoading(true);

      dispatch(createCategory(formData)).then((result) => {
        if (createCategory.fulfilled.match(result)) {
          setDataCategory((prevDataTable) => [
            ...prevDataTable,
            result.payload,
          ]);
          console.log(result.payload);
          toast.success("Tạo hạng mục thành công!");
        } else {
          toast.error(`${result.payload}`);
        }
        disableEditing();
        setIsLoading(false);
      });
    };

    const params = useParams<{ projectId: string }>();

    React.useEffect(() => {
      const projectId = parseInt(params.projectId, 10);

      dispatch(getAllRegisterPitchingByBusiness(projectId)).then((result) => {
        if (getAllRegisterPitchingByBusiness.fulfilled.match(result)) {
          // console.log('group', result.payload);
          const selectedGroup = result.payload.find(
            (item: any) => item.register_pitching_status === "Selected"
          );

          if (selectedGroup) {
            // console.log(selectedGroup)
            setFormData((prevData) => ({
              ...prevData,
              groupId: selectedGroup.group.id,
            }));
          }
        } else {
        }
      });
    }, []);

    if (isEditing) {
      return (
        <form
          onSubmit={handleCreateCategory}
          className="m-1 py-0.5 px-1 space-y-4 mt-3"
        >
          <FormInput
            type="text"
            id="category_name"
            className="w-full px-2 py-1 h-7 border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào tên hạng mục ..."
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
            className="w-full px-2 py-1 h-7 border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào category_start_date"
            value={formData.category_start_date}
            onChange={(e) =>
              handleChange("category_start_date", e.target.value)
            }
          />

          <FormInput
            type="date"
            id="category_expected_end_date"
            className="w-full px-2 py-1 h-7 border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào category_expected_end_date"
            value={formData.category_expected_end_date}
            onChange={(e) =>
              handleChange("category_expected_end_date", e.target.value)
            }
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

          <div className="flex items-center gap-x-1">
            <button
              type="submit"
              className="bg-blue-500 text-sm text-white hover:bg-blue-300 transition px-3 py-2"
              style={{ borderRadius: "7px" }}
            >
              Tạo hạng mục
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
        {userLogin?.role_name === "Student" && (
          <Button
            onClick={enableEditing}
            className="h-auto px-2 py-1.5 w-full 
          justify-start text-muted-foreground text-sm
          hover:opacity-60"
            size="sm"
            variant={"ghost"}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm hạng mục
          </Button>
        )}

        {loading && <SpinnerLoading />}
      </div>
    );
  }
);

CategoryForm.displayName = "CategoryForm";
export default CategoryForm;
