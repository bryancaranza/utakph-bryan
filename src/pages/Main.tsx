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
import GitHubFilled from "@/components/icons/GitHubFilled";
import { clickLink } from "@/lib/utils";
import Loading from "@/components/icons/Loading";
import Categories from "@/components/pages/Main/Categories";
import { CONSTANTS } from "@/lib/constants";
import { useDebounce } from "@/hooks/useDebounce";

const Main = () => {
  const [data, setData] = useState<IProduct[]>([]); // data for Table
  const [views, setViews] = useState<any[]>([]); // data for Table
  const [search, setSearch] = useState(""); // search string
  const lsViewer = localStorage.getItem("viewer_id");
  const lsViewDate = localStorage.getItem("view_date");
  const date = moment().format("YYYY-MM-DD");

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

  // Get searched products
  useEffect(() => {
    if (!search) return getProducts((response) => setData(response));
    return useDebounce(() => {
      searchProduct(search, (products: IProduct[]) => {
        setData(products);
      });
    });
  }, [search]);

  useEffect(() => {
    if (lsViewDate !== date) {
      return useDebounce(() => {
        addViews();
      }, 1000);
    }
  }, [lsViewDate, date]);

  // Get initial products
  useEffect(() => {
    getProducts((response) => setData(response));
    getViews((response) => setViews(response));
    table.setPageSize(5);
    table.getColumn("date_created")?.toggleSorting(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center px-4 max-h-screen overflow-auto scrollbar">
      <div className="max-w-[1400px] w-full flex flex-col gap-4">
        <div className="text-4xl w-full pt-4 justify-between font-bold flex gap-2 item-center">
          <div className="flex items-center gap-2">
            <div>
              <Loading className="w-[150px]" />
            </div>
            <div className="max-md:hidden">
              <p>Inventory</p>
            </div>
          </div>
          {lsViewer === CONSTANTS.ADMIN ? (
            <div className="flex items-center gap-2">
              <EyeFilled className="text-sm w-6" />
              <p className="text-3xl pb-1">{views.length}</p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-4">
          <Dashboard data={data} />
          <div className="flex items-center justify-between gap-4">
            <Input
              placeholder="Search product, category, options..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={() =>
                  setModalConfig({ open: true, content: <Categories /> })
                }
              >
                Category List
              </Button>
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
        </div>
        <div className="scrollbar border rounded-md border-slate-200 shadow-sm transition-colors">
          <div className="min-h-[300px]">
            <DataTable columns={columnConfig()} table={table} />
          </div>
          <div className="flex flex-wrap items-center justify-evenly space-x-2 p-4  text-sm">
            <div className="flex-1 text-sm">
              Total of{" "}
              <span className="font-semibold">
                {table.getFilteredRowModel().rows.length}
              </span>{" "}
              row(s).
            </div>
            <div className="flex-1 flex items-center gap-2 text-gray-400">
              <p>© bryancaranza2024</p>
              <Button
                className="rounded-full p-2"
                size="icon"
                variant="ghost"
                onClick={() =>
                  clickLink("https://github.com/bryancaranza", "_blank")
                }
              >
                <GitHubFilled className="w-5 fill-slate-900" />
              </Button>
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
