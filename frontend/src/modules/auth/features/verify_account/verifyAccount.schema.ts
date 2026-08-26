import { z } from "zod"

export const verifyAccountSchema = (t: (key: string) => string) =>
  z.object({
    verification_code: z.string().regex(/^\d{6}$/, {
      message: t("auth.error.verify.invalid_code"),
    }),
  })

export type VerifyAccountFormValues = z.infer<
  ReturnType<typeof verifyAccountSchema>
>
