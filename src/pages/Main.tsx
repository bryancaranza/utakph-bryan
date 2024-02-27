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
import { columnConfig } from "@/components/pages/Main/Columns";

import { Product } from "@/lib/interface";
import CreateProduct from "@/components/pages/Main/CreateProduct";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import AddOutlined from "@/components/icons/AddOutlined";
import { Button } from "@/components/ui/button";
import { useMainStore } from "@/lib/zustand/mainStore";
import Modal from "@/components/custom/Modal";
import { formatCurrency } from "@/lib/helpers/stringHelpers";

const Main = () => {
  const [data, setData] = useState<Product[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { getProducts } = useFirbaseService();
  const { closeModal, modalConfig, setModalConfig } = useMainStore();

  const computedSales = () => {
    const rowTotal = data.map((item) => {
      return (item.price - item.cost) * item.stock;
    });
    const totalExpectedSales = rowTotal.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return totalExpectedSales || 0;
  };

  const table = useReactTable({
    data,
    columns: columnConfig(),
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

            <Button
              className="flex gap-2"
              onClick={() =>
                setModalConfig({ open: true, content: <CreateProduct /> })
              }
            >
              <AddOutlined /> <p className="max-md:hidden">Add Product</p>
            </Button>
          </div>
        </div>
        <div className="min-h-[300px] max-h-[400px]">
          <DataTable columns={columnConfig()} table={table} />
        </div>
        <div className="flex w-full flex-end">
          <div>Expected Sales: {formatCurrency(computedSales())}</div>
        </div>
        <Modal
          open={modalConfig.open}
          children={modalConfig.content}
          closeModal={() => closeModal(modalConfig)}
        />
      </div>
    </div>
  );
};

export default Main;
