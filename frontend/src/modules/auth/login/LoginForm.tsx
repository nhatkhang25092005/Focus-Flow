import { useTranslation } from "react-i18next"
import InputField from "../components/InputField"
import { useLogin } from "./useLogin"
export default function LoginForm() {
  const { t } = useTranslation()
  const { errors, register, onSubmit } = useLogin()
  return (
    <>
      <div className="flex flex-col">
        <h2 className="mt-2 text-4xl font-semibold">
          {t("auth.login_form.welcome")}
        </h2>

        <p className="text-sm mt-2">
          {t("auth.login_form.registration_suggest")}

          <a
            href="/signup"
            className="text-blue-500 underline ml-1 cursor-pointer"
          >
            {t("auth.login_form.register_link")}
          </a>
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col w-full">
        {/* Email Input */}
        <InputField
          errorText={errors.email?.message}
          {...register("email")}
          label="Email"
          required
          containerClassName="mt-6"
          placeholder={t("auth.login_form.email_placeholder")}
        />

        {/* Password Input */}
        <InputField
          type="password"
          errorText={errors.password?.message}
          {...register("password")}
          label={t("auth.login_form.password_label")}
          required
          containerClassName="mt-6"
          placeholder={t("auth.login_form.password_placeholder")}
        />

        {/* Submit Button */}
        <div className="w-full mt-4 flex flex-col items-end">
          <a
            href="/forgot"
            className="text-blue-500 absolute cursor-pointer text-sm underline"
          >
            {t("auth.login_form.forgot_link")}
          </a>
          <button
            type="submit"
            className="
              mt-7
              w-full
              font-semibold border h-10 rounded-lg
              bg-amber-500 border-amber-300
              cursor-pointer
              transition-colors
              hover:bg-amber-600
              hover:border-amber-200
              duration-300
            "
          >
            {t("auth.login_form.submit_button")}
          </button>
        </div>
      </form>
    </>
  )
}
