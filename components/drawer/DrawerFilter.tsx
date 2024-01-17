"use client";
import React from "react";
import { Drawer, IconButton } from "@material-tailwind/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DrawerFilterProps {
  openDrawer: any;
  closeDrawerAction: any;
}

const DrawerFilter = ({ openDrawer, closeDrawerAction }: DrawerFilterProps) => {
  return (
    <Drawer
      overlay={false}
      placement="right"
      open={openDrawer}
      onClose={closeDrawerAction}
      className="p-4 shadow-md w-[500px]"
      size={700}
    >
      <div className="mb-6 flex items-center justify-between ">
        <h1 className="text-black font-bold text-2xl">Bộ lọc</h1>
        <IconButton variant="text" onClick={closeDrawerAction}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div>
        {/*  Lĩnh vực chuyên môn, specialization_field, Nông nghiệp, Thủ công nghiệp*/}
        <Accordion type="multiple">
          <AccordionItem value={`item-1`} className="border-none">
            <AccordionTrigger
              className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 
          transition text-start no-underline hover:no-underline"
              style={{ borderRadius: "6px" }}
            >
              <div className="flex items-center gap-x-2">
                {/* specialization_field */}
                <span className="font-medium text-sm">Lĩnh vực chuyên môn</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
              <Button
                className={cn(
                  "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 gap-2 rounded-md"
                )}
                variant="ghost"
              >
                Nông Nghiệp
              </Button>

              <Button
                className={cn(
                  "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 gap-2 rounded-md"
                )}
                variant="ghost"
              >
                Nông Nghiệp
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

 {/*  Mô hình kinh doanh, business_model: b2b b2c*/}
        <Accordion type="multiple">
          <AccordionItem value={`item-2`} className="border-none">
            <AccordionTrigger
              className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 
          transition text-start no-underline hover:no-underline"
              style={{ borderRadius: "6px" }}
            >
              <div className="flex items-center gap-x-2">
                {/* business_model, b2c b2b*/}
                <span className="font-medium text-sm">Mô hình kinh doanh</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
              <Button
                className={cn(
                  "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 gap-2 rounded-md"
                )}
                variant="ghost"
              >
                Nông Nghiệp
              </Button>

              <Button
                className={cn(
                  "w-full font-normal justify-start pl-10 mb-1 hover:bg-neutral-500/10 gap-2 rounded-md"
                )}
                variant="ghost"
              >
                Nông Nghiệp
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        
        {/* Hướng đi của dự án, business_type Plan (Lên kế hoạch), Project (Triển khai dự án)*/}


      </div>
    </Drawer>
  );
};

export default DrawerFilter;
