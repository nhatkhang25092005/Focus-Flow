import { useTranslation } from "react-i18next"

export default function LoginForm() {
  const { t } = useTranslation()

  return (
    <>
      <div className="flex flex-col">
        <h2 className="mt-2 text-4xl font-semibold">
          {t("auth.login_form.welcome")}
        </h2>

        <p className="text-2xl">
          {t("auth.login_form.registration_suggest")}

          <a
            href="/signup"
            className="text-blue-500 underline ml-3 cursor-pointer"
          >
            {t("auth.login_form.register_link")}
          </a>
        </p>
      </div>

      <form className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <label htmlFor="emailInput" className="text-xl font-bold">
            {t("auth.login_form.email_label")}

            <span className="text-red-700 ml-2">*</span>
          </label>

          <input
            placeholder={t("auth.login_form.email_placeholder")}
            id="emailInput"
            type="email"
            className="border h-13 rounded-xl px-3 text-xl"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <label htmlFor="passwordInput" className="text-xl font-bold">
              {t("auth.login_form.password_label")}

              <span className="text-red-700 ml-2">*</span>
            </label>

            <a
              href="/signup"
              className="text-blue-500 ml-3 cursor-pointer text-xl"
            >
              {t("auth.login_form.forgot_link")}
            </a>
          </div>

          <input
            placeholder={t("auth.login_form.password_placeholder")}
            id="passwordInput"
            type="password"
            className="border h-13 rounded-xl px-3 text-xl"
          />
        </div>

        <button
          className="
            text-2xl font-bold border h-15 rounded-xl
            bg-amber-500 border-amber-300
          "
        >
          {t("auth.login_form.submit_button")}
        </button>
      </form>
    </>
  )
}
