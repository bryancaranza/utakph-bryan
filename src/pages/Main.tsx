import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/pages/Main/DataTable";
import { columns } from "@/components/pages/Main/Columns";

import { Product } from "@/lib/interface";
import CreateProduct from "@/components/pages/Main/CreateProduct";
import { useFirbaseService } from "@/hooks/useFirbaseService";

const Main = () => {
  const [data, setData] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { getProducts } = useFirbaseService();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    getProducts((response) => setData(response));
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 max-h-screen overflow-auto scrollbar">
      <div className="text-center text-4xl font-bold">UtakPH CRUD Exam</div>
      <div className="max-w-[1000px] w-full">
        <div className="flex flex-col gap-2">
          <p className="text-4xl">Products</p>

          <div className="flex items-center justify-between gap-2 py-4">
            <Input
              placeholder="Search product..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <CreateProduct />
          </div>
        </div>
        <div className="min-h-[300px]">
          <DataTable columns={columns} table={table} />
        </div>
      </div>
    </div>
  );
};

export default Main;
