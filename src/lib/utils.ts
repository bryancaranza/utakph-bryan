import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IProduct } from "./interface";

// shadcn init function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// computing total expected sales
export const computedSales = (data: IProduct[]) => {
  const rowTotal = data?.map((item) => {
    return (item.price - item.cost) * item.stock;
  });
  const totalExpectedSales = rowTotal?.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  return totalExpectedSales || 0;
};
