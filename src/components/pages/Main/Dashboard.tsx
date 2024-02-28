import CostsOutlined from "@/components/icons/CostsOutlined";
import FallOutlined from "@/components/icons/FallOutlined";
import MoneyOutlined from "@/components/icons/MoneyOutlined";
import RiseOutlined from "@/components/icons/RiseOutlined";
import Warehouse from "@/components/icons/Warehouse";
import { formatCurrency } from "@/lib/helpers/stringHelpers";
import { IDashboard } from "@/lib/interface";
import { computedSales, totalCosts, totalStocks } from "@/lib/utils";

const Dashboard = ({ data }: IDashboard) => {
  const checkStockPrice = () => {
    return data.filter((item) => item.price < item.cost) || [];
  };

  return (
    <div className="flex gap-4 max-md:flex-wrap justify-evenly">
      <div className="border w-full max-w-[403px] rounded-md flex border-slate-200 shadow-sm transition-colors">
        <div className="w-full p-2 flex-1">
          <div className="flex gap-2 items-center">
            <Warehouse className="w-6 fill-slate-950" />
            <p className="text-1xl font-semibold">Stocks</p>
          </div>
          <p className="text-2xl font-bold">
            {totalStocks(data).toLocaleString("en-US")}
          </p>
        </div>
        <div
          className={`flex h-full justify-center items-center p-2 ${
            checkStockPrice()?.length > 0 ? "bg-red-700" : "bg-green-700"
          } rounded-r-md`}
        >
          {checkStockPrice()?.length > 0 ? (
            <FallOutlined className="text-[35px] fill-white" />
          ) : (
            <RiseOutlined className="text-[35px] fill-white" />
          )}
        </div>
      </div>
      <div className="border w-full max-w-[403px] rounded-md flex border-slate-200 shadow-sm transition-colors">
        <div className="w-full p-2 flex-1">
          <div className="flex gap-2 items-center">
            <CostsOutlined className="w-7 fill-slate-950" />
            <p className="text-1xl font-semibold">Costs</p>
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(totalCosts(data))}
          </p>
        </div>
        <div
          className={`flex h-full justify-center items-center p-2 ${
            checkStockPrice()?.length > 0 ? "bg-red-700" : "bg-green-700"
          } rounded-r-md`}
        >
          {checkStockPrice()?.length > 0 ? (
            <FallOutlined className="text-[35px] fill-white" />
          ) : (
            <RiseOutlined className="text-[35px] fill-white" />
          )}
        </div>
      </div>
      <div className="border w-full max-w-[403px] rounded-md flex border-slate-200 shadow-sm transition-colors">
        <div className="w-full p-2 flex-1">
          <div className="flex gap-2 items-center">
            <MoneyOutlined className="w-6 fill-slate-950" />
            <p className="text-1xl font-semibold">Expected Revenue</p>
          </div>
          <p className="text-2xl font-bold">
            {formatCurrency(computedSales(data))}
          </p>
        </div>
        <div
          className={`flex h-full justify-center items-center p-2 ${
            computedSales(data) > 0 ? "bg-green-700" : "bg-red-700"
          } rounded-r-md`}
        >
          {computedSales(data) > 0 ? (
            <RiseOutlined className="text-[35px] fill-white" />
          ) : (
            <FallOutlined className="text-[35px] fill-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
