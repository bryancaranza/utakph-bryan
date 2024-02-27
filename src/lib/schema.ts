import { z } from "zod";

export const ProductSchema = z.object({
  name: z
    .string({
      required_error: "required field",
    })
    .min(1, { message: "Required" }),
  category: z
    .string({
      required_error: "required field",
    })
    .min(1, { message: "Required" }),
  option: z.string(),
  price: z
    .number({
      required_error: "required field",
    })
    .min(1),
  cost: z
    .number({
      required_error: "required field",
    })
    .min(1),
  stock: z
    .number({
      required_error: "required field",
    })
    .min(1),
});
