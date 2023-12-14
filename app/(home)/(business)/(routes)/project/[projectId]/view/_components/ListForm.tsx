"use client";
import React from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListWrapper } from "./ListWrapper";
import { FiPlus } from "react-icons/fi";
import { FormInput } from "@/src/components/form/FormInput";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/src/redux/store";
import { createPhase } from "@/src/redux/features/phaseSlice";
import toast from "react-hot-toast";
import { PhaseType } from "@/src/types/phase.type";
import SpinnerLoading from "@/src/components/loading/SpinnerLoading";
import { useUserLogin } from "@/src/hook/useUserLogin";

interface ListFormProp {
  groupId: number;
  projectId: number;
  phaseData: PhaseType[];
  setPhaseData: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListForm = ({
  groupId,
  projectId,
  phaseData,
  setPhaseData,
}: ListFormProp) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const formRef = React.useRef<React.ElementRef<"form">>(null);
  const inputRef = React.useRef<React.ElementRef<"input">>(null);
  const [startInputValue, setStartInputValue] = React.useState<string>("");
  const [endInputValue, setEndInputValue] = React.useState<string>("");
  const [loading, setIsLoading] = React.useState(false);

  const [userLogin, setUserLogin] = useUserLogin();

  const params = useParams();
  const dispatch = useAppDispatch();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const handleSubmitCreatePhase = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const dataBody = {
      phase_start_date: startInputValue,
      phase_expected_end_date: endInputValue,
      projectId: projectId,
      groupId: groupId,
    };
    console.log(dataBody)

    dispatch(createPhase(dataBody)).then((result) => {
      if (createPhase.fulfilled.match(result)) {
        setPhaseData((prevDataTable) => [...prevDataTable, result.payload]);
        console.log(result.payload);
        toast.success("Tạo giai đoạn thành công!");
      } else {
        toast.error(`${result.payload}`);
      }
      disableEditing();
      setIsLoading(false);
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
          style={{ borderRadius: "7px" }}
          onSubmit={handleSubmitCreatePhase}
        >
          <FormInput
            ref={inputRef}
            type={"date"}
            id="start_date"
            className="w-full px-2 py-1 h-7 border-transparent border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào ..."
            value={startInputValue}
            onChange={(e) => setStartInputValue(e.target.value)}
          />

          <FormInput
            ref={inputRef}
            type={"date"}
            id="expected_end_date"
            className="w-full px-2 py-1 h-7 border-transparent border-neutral-200/100 bg-white transition"
            placeholder="Nhập vào ..."
            value={endInputValue}
            onChange={(e) => setEndInputValue(e.target.value)}
          />

          <input hidden value={params.projectId} name="proecjtId" />

          <div className="flex items-center gap-x-1">
            <button
              type="submit"
              className="bg-blue-500 text-sm text-white hover:bg-blue-300 transition px-3 py-2"
              style={{ borderRadius: "7px" }}
            >
              Tạo giai đoạn
            </button>
            <Button onClick={disableEditing} size="sm" variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      {userLogin?.role_name === "Student" && (
        <button
          onClick={enableEditing}
          className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center  font-medium text-sm"
          style={{ borderRadius: "7px" }}
        >
          <FiPlus className="h-4 w-4 mr-2" />
          Thêm giai đoạn
        </button>
      )}

      {loading && <SpinnerLoading />}
    </ListWrapper>
  );
};

export default ListForm;
