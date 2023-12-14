import { ProjectType } from "@/src/types/project.type";
import { ViewTitleForm } from "./ViewTitleForm";
import ProgressLoading from "@/src/components/loading/ProgressLoading";
import { Button } from "@/components/ui/button";
import { useUserLogin } from "@/src/hook/useUserLogin";

interface ViewNavbarProps {}

export const ViewNavbar = () => {
  const [userLogin, setUserLogin] = useUserLogin();

  return (
    <div
      className="w-full h-14 z-[10] bg-black/50 fixed top-17 flex
  items-center px-6 gap-x-4 text-white"
    >
      {userLogin?.role_name === "Student" ? (
        <Button className="bg-teal-300 text-teal-900 hover:bg-teal-300 rounded">
          Nộp file tổng kết
        </Button>
      ) : (
        <Button className="bg-teal-300 text-teal-900 hover:bg-teal-300 rounded">
          Xem file tổng kết
        </Button>
      )}
      <ViewTitleForm />
    </div>
  );
};
