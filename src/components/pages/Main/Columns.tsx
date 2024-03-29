import CustomTooltip from "@/components/custom/Tooltip";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import { Button } from "@/components/ui/button";
import EditOutlined from "@/components/icons/EditOutlined";
import { useMainStore } from "@/lib/zustand/mainStore";
import DeleteOutlined from "@/components/icons/DeleteOutlined";
import { formatCurrency } from "@/lib/helpers/stringHelpers";
import { IProduct } from "@/lib/interface";
import moment from "moment";

export const columnConfig = () => {
  const { setModalConfig } = useMainStore(); // for updating modal state

  // define table column
  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <p className="select-none pl-2">Product</p>
            <Button
              variant="ghost"
              className="px-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize pl-2 font-semibold max-h-[200px] max-w-[140px] truncate">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <p className="select-none">Category</p>
            <Button
              variant="ghost"
              className="px-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize font-semibold max-h-[200px] max-w-[140px] truncate">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "option",
      header: () => <div className="select-none">Options</div>,
      cell: ({ row }) => {
        const options = row.original.option?.filter((option) => option !== "");

        const mappedOptions = options?.map((data: string) => {
          return (
            <CustomTooltip key={data} content={data}>
              <div className="border rounded-md text-sm font-semibold px-1 truncate max-w-[200px]">
                {data}
              </div>
            </CustomTooltip>
          );
        });

        return (
          <div className="capitalize flex max-w-[200px] flex-wrap gap-1 w-fit">
            {options?.length ? mappedOptions : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <p className="select-none">Stocks</p>
            <Button
              variant="ghost"
              className="px-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {row.original.stock.toLocaleString("en-US")}
        </div>
      ),
    },
    {
      accessorKey: "cost",
      header: () => <div className="select-none">Cost</div>,
      cell: ({ row }) => {
        const cost = parseFloat(row.getValue("cost"));
        const formattedCost = formatCurrency(cost);
        return <div className="capitalize font-medium">{formattedCost}</div>;
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <p className="select-none">Price</p>
            <Button
              variant="ghost"
              className="px-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formattedPrice = formatCurrency(price);

        return <div className="font-medium">{formattedPrice}</div>;
      },
    },
    {
      accessorKey: "date_created",
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <p className="select-none">Date Created</p>
            <Button
              variant="ghost"
              className="px-1"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <CaretSortIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="text-center font-medium">
            {row.original.date_created
              ? moment(row.original.date_created).format("YYYY-MM-DD")
              : ""}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-end">
          <div className="pr-2 text-center select-none w-[100px]">Actions</div>
        </div>
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-end pr-2 gap-2">
            <CustomTooltip content="Edit">
              <Button
                variant="outline"
                onClick={() => {
                  setModalConfig({
                    open: true,
                    content: <UpdateProduct row={row.original} />,
                  });
                }}
              >
                <EditOutlined />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Delete">
              <Button
                variant="destructive"
                onClick={() => {
                  setModalConfig({
                    open: true,
                    content: <DeleteProduct row={row.original} />,
                  });
                }}
              >
                <DeleteOutlined />
              </Button>
            </CustomTooltip>
          </div>
        );
      },
    },
  ];

  return columns;
};
