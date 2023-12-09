"use client";

import React from "react";

import {
  chooseGroupByBusiness,
  getAllRegisterPitchingByBusiness,
} from "@/src/redux/features/pitchingSlice";
import { useAppDispatch } from "@/src/redux/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TableMemberInGroup from "./table";

interface BusinessGroupPageProps {
  projectId: number;
}

const BusinessGroupPage: React.FC<BusinessGroupPageProps> = ({ projectId }) => {
  const dispatch = useAppDispatch();
  const [dataGroupPitching, setDataGroupPitching] = React.useState<any>([]);

  React.useEffect(() => {
    dispatch(getAllRegisterPitchingByBusiness(projectId)).then((result) => {
      if (getAllRegisterPitchingByBusiness.fulfilled.match(result)) {
        console.log(result.payload);
        setDataGroupPitching(result.payload);
      } else {
        console.log("error", result.payload);
      }
    });
  }, []);

  return (
    <div className="p-2 overflow-y-scroll overflow-x-hidden h-full">
      {dataGroupPitching.length !== 0 ? (
        dataGroupPitching.map((group: any, indexGroup: number) => (
          <div
            key={indexGroup}
            className="bg-gray-300 p-2 mb-4 relative"
            style={{ borderRadius: "7px" }}
          >
            <div className="flex w-full justify-between">
              <p className="uppercase font-bold">{group.group.group_name} </p>
            </div>

            <TableMemberInGroup register_pitching_status={group.register_pitching_status} group={group} projectId={projectId} />
          </div>
        ))
      ) : (
        <p className="text-white font-bold text-lg">Chưa có nhóm nào đăng kí</p>
      )}
    </div>
  );
};

export default BusinessGroupPage;
