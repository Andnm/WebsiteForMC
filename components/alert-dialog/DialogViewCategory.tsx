import { Dialog, Transition } from "@headlessui/react";

import { Fragment } from "react";
import { Header } from "./_components/header";
import { Layout } from "lucide-react";
import { formatDate } from "@/src/utils/handleFunction";

interface DialogViewCategoryProps {
  open: boolean;
  dataCategory: any;
  actionClose: () => void;
}

const doNothing = () => {
  console.log("");
};

const DialogViewCategory = ({
  open,
  dataCategory,
  actionClose,
}: DialogViewCategoryProps) => {
  return (
    <>
      {" "}
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={actionClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 opacity-80 blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex items-start gap-x-3 mb-6 w-full">
                      <Layout className="h-5 w-5 mt-1 text-neutral-700" />
                      <div
                        className="font-semibold text-xl px-1 text-neutral-700
          bg-transparent border-transparent relative -left-1.5 w-[95%] 
          focus-visible:bg-while focus-visible:border-input mb-0.5 truncate"
                      >
                        {dataCategory.category_name}
                      </div>
                    </div>
                  </Dialog.Title>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">
                        Trạng thái:
                      </span>
                      <span className="font-semibold">
                        {dataCategory.category_status}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Chi tiết:</span>
                      <span className="font-semibold">
                        {dataCategory.detail}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">Ngày bắt đầu:</span>
                      <span className="font-semibold">
                        {formatDate(dataCategory.category_start_date)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">
                        Ngày kết thúc:
                      </span>
                      <span className="font-semibold">
                        {formatDate(dataCategory.category_expected_end_date)}
                      </span>
                    </div>
                  </div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogViewCategory;
