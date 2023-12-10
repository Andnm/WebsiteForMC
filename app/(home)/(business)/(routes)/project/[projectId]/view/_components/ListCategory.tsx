import DialogViewCategory from "@/components/alert-dialog/DialogViewCategory";
import React from "react";

interface ListCategoryProps {
  dataCategory: any;
  setDataCategory: React.Dispatch<React.SetStateAction<any[]>>;
}

const ListCategory = ({ dataCategory, setDataCategory }: ListCategoryProps) => {
  const [isOpenModalDetail, setIsOpenModalDetail] = React.useState(false);

  const [selectedCategory, setSelectedCategory] = React.useState<any | null>(
    null
  );

  const handleOpenModalDetail = (category: any) => {
    setSelectedCategory(category);
    setIsOpenModalDetail(true);
  }

  return (
    <div className="pt-2 px-2 flex gap-2">
      {dataCategory?.map((category: any, index: number) => (
        <div
          key={index}
          className="w-full px-3 py-3 border-neutral-200/100 bg-white transition hover:ring-2 cursor-pointer shadow-sm"
          style={{ borderRadius: "7px" }}
          onClick={() => handleOpenModalDetail(category)}
        >
          <p className="text-sm">{category.category_name}</p>
        </div>
      ))}

      {isOpenModalDetail && selectedCategory && (
        <DialogViewCategory
          open={isOpenModalDetail}
          dataCategory={selectedCategory}
          actionClose={() => setIsOpenModalDetail(false)}
        />
      )}
    </div>
  );
};

export default ListCategory;
