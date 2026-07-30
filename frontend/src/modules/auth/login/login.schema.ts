import { z } from "zod"
export const loginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("auth.error.login.empty_email") })
      .pipe(z.email({ message: t("auth.error.login.invalid_email") })),
    password: z
      .string()
      .min(1, { message: t("auth.error.login.empty_password") })
      .min(8, { message: t("auth.error.login.invalid_password_min") })
      .max(64, { message: t("auth.error.login.invalid_password_max") }),
  })

export type LoginInput = z.infer<ReturnType<typeof loginSchema>>
