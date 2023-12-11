import { ProjectType } from "@/src/types/project.type";
import { ViewTitleForm } from "./ViewTitleForm";
import ProgressLoading from "@/src/components/loading/ProgressLoading";

interface ViewNavbarProps {
}

export const ViewNavbar = () => {
  return (
    <div
      className="w-full h-14 z-[10] bg-black/50 fixed top-17 flex
  items-center px-6 gap-x-4 text-white"
    >
      <ViewTitleForm/>
    </div>
  );
};
