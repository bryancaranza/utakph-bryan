import CustomTooltip from "@/components/custom/Tooltip";
import EditOutlined from "@/components/icons/EditOutlined";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/interface";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import DeleteProduct from "./DeleteProduct";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p className="select-none">Name</p>
          <CaretSortIcon
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <div className="flex items-center">
          <p className="select-none">Category</p>
          <CaretSortIcon
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "option",
    header: () => <div className="select-none">Options</div>,
    cell: ({ row }) => {
      const mappedOptions = row.original.option
        ?.split(",")
        .map((data: string) => {
          return (
            <div className="border rounded-md text-sm font-semibold px-1">
              {data}
            </div>
          );
        });

      return (
        <div className="capitalize flex flex-wrap gap-2 w-fit">
          {mappedOptions}
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
          <CaretSortIcon
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
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
    cell: ({ row }) => <div className="capitalize">{row.getValue("cost")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-end">
          <p className="select-none">Price</p>
          <CaretSortIcon
            className="ml-2 h-4 w-4 cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));

      // Format the price as a dollar price
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center select-none">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <CustomTooltip content="Edit">
            <Button
              variant="outline"
              onClick={() => {
                console.log({ row });
              }}
            >
              <EditOutlined />
            </Button>
          </CustomTooltip>
          <CustomTooltip content="Delete">
            <DeleteProduct row={row.original} />
          </CustomTooltip>
        </div>
      );
    },
  },
];
