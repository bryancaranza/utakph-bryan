import { useEffect, useState } from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
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
import Dashboard from "@/components/pages/Main/Dashboard";
import moment from "moment";
import EyeFilled from "@/components/icons/EyeFilled";

const Main = () => {
  const lsViewed = localStorage.getItem("viewed") === "true";
  const lsViewDate = localStorage.getItem("view_date");
  const date = moment().format("YYYY-MM-DD");
  const [data, setData] = useState<IProduct[]>([]); // data for Table
  const [views, setViews] = useState<any[]>([]); // data for Table
  const [search, setSearch] = useState(""); // search string

  // hooks
  const { getProducts, searchProduct, getViews, addViews } =
    useFirbaseService();

  // zustand state store
  const { closeModal, modalConfig, setModalConfig } = useMainStore();

  // setting up table data
  const table = useReactTable({
    data,
    columns: columnConfig(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Get initial products
  useEffect(() => {
    getProducts((response) => setData(response));
    getViews((response) => setViews(response));
    table.setPageSize(5);

    if (!lsViewed && lsViewDate !== date) addViews();
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

  console.log({ views });

  return (
    <div className="w-full h-full flex flex-col items-center px-4 max-h-screen overflow-auto scrollbar">
      <div className="text-center text-4xl font-bold py-4">
        UtakPH CRUD Exam
      </div>
      <div className="max-w-[1400px] w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Dashboard data={data} />
          <div className="text-4xl font-bold flex gap-2 item-center">
            <p>Inventory</p> <EyeFilled className="text-sm w-10" />{" "}
            <p>{views.length}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
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
        <div className="scrollbar border rounded-md border-slate-200 shadow-sm transition-colors">
          <DataTable columns={columnConfig()} table={table} />
          <div className="flex flex-wrap items-center justify-evenly space-x-2 p-4  text-sm">
            <div className="flex-1 text-sm">
              Total of{" "}
              <span className="font-semibold">
                {table.getFilteredRowModel().rows.length}
              </span>{" "}
              row(s).
            </div>
            <div className="flex-1 text-gray-400">
              <p>© bryancaranza2024</p>
            </div>
            <div className="flex  gap-2 items-center">
              <div>
                Page{" "}
                <span className="font-semibold">
                  {table.getState().pagination.pageIndex + 1}
                </span>{" "}
                of <span className="font-semibold">{table.getPageCount()}</span>
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
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
