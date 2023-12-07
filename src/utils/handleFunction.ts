export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getColorByProjectStatus = (status: string): string => {
  switch (status) {
    case "Pending":
      return "bg-blue-200 text-blue-900";
    case "Public":
      return "bg-violet-200 text-violet-900";
    case "Processing":
      return "bg-yellow-200 text-yellow-900";
    case "Done":
      return "bg-green-200 text-green-900";
    case "Expired":
      return "bg-red-200 text-red-900";
    case "End":
      return "bg-gray-200 text-gray-900";
    default:
      return "";
  }
};
