import { z } from "zod";
import { ProductSchema } from "./schema";

export interface IIcons {
  className?: string;
  children?: any;
}

export interface ITooltipProps {
  children: any;
  content: any;
}

export type IProduct = z.infer<typeof ProductSchema>;
