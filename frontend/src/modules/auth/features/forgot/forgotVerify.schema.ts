import { z } from "zod"

export const forgotVerifySchema = (t: (key: string) => string) =>
  z
    .object({
      verification_code: z
        .string()
        .length(6, { message: t("auth.error.verify.invalid_code") }),
      password: z
        .string()
        .min(1, { message: t("auth.error.register.empty_password") })
        .min(8, { message: t("auth.error.register.invalid_password_min") })
        .max(64, { message: t("auth.error.register.invalid_password_max") }),
      confirmedPassword: z
        .string()
        .min(1, { message: t("auth.error.register.empty_confirmed_password") }),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      message: t("auth.error.register.password_mismatch"),
      path: ["confirmedPassword"],
    })

export type ForgotVerifyInput = z.infer<ReturnType<typeof forgotVerifySchema>>
