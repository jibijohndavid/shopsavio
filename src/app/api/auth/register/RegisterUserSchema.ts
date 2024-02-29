import { z } from "zod";

const ROLES = ["SU", "ADMIN", "STAFF", "USER"] as const;

export const RegisterUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email is required")
    .email("Email is invalid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  role: z
    .enum(ROLES, {
      errorMap: (issue, ctx) => ({
        message: `Invalid user role ${ctx.data}`,
      }),
    })
    .optional(),
});

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
