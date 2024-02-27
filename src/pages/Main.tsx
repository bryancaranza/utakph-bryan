import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/pages/Main/DataTable";
import { columnConfig } from "@/components/pages/Main/Columns";

import { IProduct } from "@/lib/interface";
import CreateProduct from "@/components/pages/Main/CreateProduct";
import { useFirbaseService } from "@/hooks/useFirbaseService";
import AddOutlined from "@/components/icons/AddOutlined";
import { Button } from "@/components/ui/button";
import { useMainStore } from "@/lib/zustand/mainStore";
import Modal from "@/components/custom/Modal";
import { formatCurrency } from "@/lib/helpers/stringHelpers";
import { computedSales } from "@/lib/utils";

const Main = () => {
  const [data, setData] = useState<IProduct[]>([]); // data for Table
  const [search, setSearch] = useState(""); // search string

  // hooks
  const { getProducts, searchProduct } = useFirbaseService();

  // zustand state store
  const { closeModal, modalConfig, setModalConfig } = useMainStore();

  // setting up table data
  const table = useReactTable({
    data,
    columns: columnConfig(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // Get initial products
  useEffect(() => {
    getProducts((response) => setData(response));
  }, []);

  // Get searched products
  useEffect(() => {
    if (!search) return getProducts((response) => setData(response));
    const debounce = setTimeout(() => {
      searchProduct(search, (products: IProduct[]) => {
        setData(products);
      });
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4 max-h-screen overflow-auto scrollbar">
      <div className="text-center text-4xl font-bold">UtakPH CRUD Exam</div>
      <div className="max-w-[1000px] w-full">
        <div className="flex flex-col gap-2">
          <p className="text-4xl">Products</p>
          <div className="flex items-center justify-between gap-2 py-4">
            <Input
              placeholder="Search product, category, options..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        <div className="overflow-auto scrollbar max-h-[300px]">
          <DataTable columns={columnConfig()} table={table} />
        </div>
        <div className="flex mt-6 gap-1">
          <p>Expected Sales:</p>{" "}
          <p className="font-bold">{formatCurrency(computedSales(data))}</p>
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
