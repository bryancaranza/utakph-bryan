import { z } from "zod";
import { ProductSchema } from "./schema";

export interface IIcons {
  id?: string;
  className?: string;
  children?: any;
  fill?: string;
  stroke?: string;
}

export interface ITooltipProps {
  children: any;
  content: any;
}
export interface IModalConfig {
  open: boolean;
  content: any;
}

export interface IMainStore {
  modalConfig: IModalConfig;
  setModalConfig: (modalConfig: IModalConfig) => void;
  closeModal: (modalConfig: IModalConfig) => void;
}
export interface IDashboard {
  data: IProduct[];
}

export interface IProductRow {
  row: IProduct;
}

export type IProduct = z.infer<typeof ProductSchema>;
