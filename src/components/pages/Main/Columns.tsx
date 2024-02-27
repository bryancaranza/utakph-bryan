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

export const columnConfig = () => {
  const { setModalConfig } = useMainStore(); // for updating modal state

  // define table column
  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex items-center">
            <p className="select-none pl-2">Name</p>
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
        const options = row.original.option
          ?.split(",")
          .filter((option) => option !== "");

        const mappedOptions = options.map((data: string) => {
          return (
            <div
              key={data}
              className="border rounded-md text-sm font-semibold px-1"
            >
              {data}
            </div>
          );
        });

        return (
          <div className="capitalize flex flex-wrap gap-2 w-fit">
            {options.length ? mappedOptions : "N/A"}
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
        <div className="capitalize">{row.getValue("stock")}</div>
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
          <div className="flex items-center justify-end">
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

        return <div className="text-right font-medium">{formattedPrice}</div>;
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
