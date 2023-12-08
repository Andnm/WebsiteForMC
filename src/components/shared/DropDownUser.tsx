import { IoIosNotificationsOutline } from "react-icons/io";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserType } from "@/src/types/user.type";
import { logout } from "@/src/redux/features/authSlice";

interface UserProps {
  userData: UserType;
}

interface DropdownButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
interface DropdownMenuItemProps {
  path?: string;
  children: React.ReactNode;
}

const DefaultAvatarURL =
  "https://cdn.popsww.com/blog/sites/2/2021/03/doraemon-tap-97.jpg";

const roleSpecificMenuItems: Record<string, { path: string; name: string }[]> =
  {
    Student: [
      { path: "/student-profile", name: "Trang cá nhân" },
      { path: "/student-board", name: "Bảng làm việc" },
      { path: "/#", name: "Lịch sử hoạt động" },
      { path: "/group", name: "Quản lý group" },
      { path: "/support", name: "Trợ giúp" },
    ],
    Business: [
      { path: "/business-profile", name: "Trang cá nhân" },
      { path: "/business-board", name: "Quản lý dự án" },
      { path: "/#", name: "Hoạt động gần đây" },
      { path: "/support", name: "Trợ giúp" },
    ],
  };

const DropdownButton: React.FC<DropdownButtonProps> = ({ children }) => (
  <Menu.Button className="btn-dropdown flex justify-center items-center rounded-3xl">
    {children}
  </Menu.Button>
);

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  path,
}) => (
  <>
    {path ? (
      <Link href={path}>
        <button className="item group flex w-full items-center rounded-md px-2 py-2 text-sm">
          {children}
        </button>
      </Link>
    ) : (
      <button className="item group flex w-full items-center rounded-md px-2 py-2 text-sm text-black">
        {children}
      </button>
    )}
  </>
);

const DropDownUser: React.FC<UserProps> = ({ userData }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const renderRoleSpecificMenuItems = () => {
    const roleItems = roleSpecificMenuItems[userData?.role_name || ""] || [];
    return [...roleItems].map((item, index) => (
      <DropdownMenuItem key={index} path={item.path}>
        {item.name}
      </DropdownMenuItem>
    ));
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-row gap-4">
      {/* Notifications Dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        <DropdownButton>
          <IoIosNotificationsOutline className="w-7 h-7 object-cover rounded-3xl text-black" />
        </DropdownButton>
        <Transition as={Fragment} {...commonTransitionProps}>
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none text-black">
            <div className="px-5 py-5">
              <p>Bạn chưa có thông báo nào</p>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* User Dropdown */}
      <Menu as="div" className="relative inline-block text-left">
        <DropdownButton>
          <img
            src={userData?.avatar_url || DefaultAvatarURL}
            alt="User Avatar"
            className="avatar-user object-cover rounded-3xl"
          />
        </DropdownButton>

        <Transition as={Fragment} {...commonTransitionProps}>
          <Menu.Items className="menu-item absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">{renderRoleSpecificMenuItems()}</div>

            <div className="px-1 py-1 logout-section">
              <div
                className="flex w-full items-center rounded-md px-2 py-2 text-sm"
                onClick={handleLogout}
              >
                Đăng xuất
              </div>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const commonTransitionProps = {
  enter: "transition ease-out duration-100",
  enterFrom: "transform opacity-0 scale-95",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-75",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-95",
};

export default DropDownUser;
