import { useTranslation } from "react-i18next"
import InputField from "../components/InputField"
export default function LoginForm() {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col">
        <h2 className="mt-2 text-4xl font-semibold">
          {t("auth.login_form.welcome")}
        </h2>

        <p className="text-lg">
          {t("auth.login_form.registration_suggest")}

          <a
            href="/signup"
            className="text-blue-500 underline ml-1 cursor-pointer"
          >
            {t("auth.login_form.register_link")}
          </a>
        </p>
      </div>

      <form className="flex flex-col gap-4 w-full">
        <InputField
          label="Email"
          required
          placeholder={t("auth.login_form.email_placeholder")}
        />

        <InputField
          label={t("auth.login_form.password_label")}
          required
          containerClassName="relative"
          placeholder={t("auth.login_form.password_placeholder")}
        >
          <a
            href="/forgot"
            className="text-blue-500 right-0 cursor-pointer text-lg absolute"
          >
            {t("auth.login_form.forgot_link")}
          </a>
        </InputField>

        <button
          className="
            text-2xl font-bold border h-15 rounded-xl
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
      </form>
    </>
  )
}
