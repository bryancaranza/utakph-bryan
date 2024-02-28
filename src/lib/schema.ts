import { z } from "zod";

// zod schema w/ validations
export const ProductSchema = z.object({
  id: z.string().optional(),
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
  option: z.array(z.string()),
  price: z
    .number({
      required_error: "required field",
    })
    .min(1)
    .max(999999999),
  cost: z
    .number({
      required_error: "required field",
    })
    .min(1)
    .max(999999999),
  stock: z
    .number({
      required_error: "required field",
    })
    .min(1)
    .max(999999999),
  date_created: z.date().optional(),
});
