import { z } from "zod";

const ROLES = ["SU", "ADMIN", "STAFF", "USER"] as const;

export const AddProductSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
    })
    .min(1, "Product name is required"),
  description: z
    .string({
      invalid_type_error:
        "Product description should contain alphanumeric values only",
    })
    .optional(),
  shortDescription: z
    .string({
      invalid_type_error:
        "Product shortDescription should contain alphanumeric values only",
    })
    .optional(),
  stock: z.coerce
    .number({
      required_error: "Product stock qty is required",
      invalid_type_error: "Only numeric values allowed",
    })
    .min(1, "Stock is required")
    .int(),
  price: z.coerce
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Only numeric values allowed",
    })
    .min(1, "Price is required"),
  slug: z.string({
    invalid_type_error:
      "Product slug is required & should contain alphanumeric values only",
  }),
  affiliateUrl: z.string({
    invalid_type_error:
      "Product Affiliate URL is required & should contain alphanumeric values only",
  }),
});

export type AddProductInput = z.infer<typeof AddProductSchema>;
