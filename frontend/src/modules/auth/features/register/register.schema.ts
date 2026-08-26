import z from "zod"

export const registerSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z
        .string()
        .min(1, { message: t("auth.error.register.empty_email") })
        .pipe(z.email({ message: t("auth.error.register.invalid_email") })),
      username: z
        .string()
        .min(3, { message: t("auth.error.register.invalid_username_min") })
        .max(50, { message: t("auth.error.register.invalid_username_max") }),
      birthday: z
        .date({ message: t("auth.error.register.invalid_birthday") })
        .max(
          new Date(
            new Date().getFullYear() - 1,
            new Date().getMonth(),
            new Date().getDate(),
          ),
          t("auth.error.register.invalid_birthday"),
        )
        .min(
          new Date(
            new Date().getFullYear() - 100,
            new Date().getMonth(),
            new Date().getDate(),
          ),
          t("auth.error.register.invalid_birthday"),
        )
        .optional(),
      password: z
        .string()
        .min(8, t("auth.error.register.invalid_password_min"))
        .max(64, {
          message: t("auth.error.register.invalid_password_max"),
        }),
      confirmedPassword: z
        .string()
        .min(1, t("auth.error.register.empty_confirmed_password")),
    })
    .refine((data) => data.password === data.confirmedPassword, {
      message: t("auth.error.register.password_mismatch"),
      path: ["confirmedPassword"],
    })

export type RegisterInput = z.infer<ReturnType<typeof registerSchema>>
