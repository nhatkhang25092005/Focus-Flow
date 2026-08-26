import { useTranslation } from "react-i18next"
import InputField from "../../../../components/InputField/InputField"
import { useLogin } from "./useLogin"
import Title from "../../../../components/text/Title"
import { useSlider } from '../../../../share/context/SliderContext'
import Subtitle from "../../../../components/text/Subtitle"
import Button from "../../../../components/Button"
export default function LoginForm() {
  const { t } = useTranslation()
  const { errors, register, onSubmit } = useLogin()
  const { goto } = useSlider()
  return (
    <>
      <div className="flex flex-col">
        <Title variant="4xl" bold="bold">
          {t("auth.login_form.welcome")}
        </Title>

        <Subtitle color="secondary" variant="sm" className="mt-2">
          {t("auth.login_form.registration_suggest")}
          <a
            onClick={() => goto('register')}
            className="text-blue-500 underline ml-1 cursor-pointer"
          >
            {t("auth.login_form.register_link")}
          </a>
        </Subtitle>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col w-full">
        {/* Email Input */}
        <InputField
          type="email"
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
            onClick={() => goto('forgot')}
            className="text-blue-500 absolute cursor-pointer text-sm underline"
          >
            {t("auth.login_form.forgot_link")}
          </a>
          <Button variant="primary" type="submit" className="mt-7 w-full">
            {t("auth.login_form.submit_button")}
          </Button>
        </div>
      </form>
    </>
  )
}
