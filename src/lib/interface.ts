import { z } from "zod";
import { ProductSchema } from "./schema";

export interface IIcons {
  className?: string;
  children?: any;
}

export interface Product {
  category: string;
  name: string;
  price: number;
  option: string;
  cost: number;
  stock: number;
}

export interface ITooltipProps {
  children: any;
  content: any;
}

export type TProduct = z.infer<typeof ProductSchema>;
