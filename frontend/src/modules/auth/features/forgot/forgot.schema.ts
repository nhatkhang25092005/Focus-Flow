import { z } from "zod"
export const forgotSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("auth.error.login.empty_email") })
      .pipe(z.email({ message: t("auth.error.login.invalid_email") })),
  })

export type ForgotInput = z.infer<ReturnType<typeof forgotSchema>>
