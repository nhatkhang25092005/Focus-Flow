import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import InputField from "../../../components/InputField/InputField"
import { useRegister } from "./useRegister"
import Title from "../../../components/text/Title"
import ScrollArea from "../../../components/ScrollArea"
import Subtitle from "../../../components/text/Subtitle"
import { useSlider } from "../../../share/context/SliderContext"
import Button from "../../../components/Button"

export default function RegisterForm() {
  const { register, errors, isSubmitting, onSubmit } = useRegister()
  const { t } = useTranslation()
  const { goto } = useSlider()

  return (
    <div className="w-full h-full min-h-0 max-w-md bg-white rounded-2xl border-orange-200 flex flex-col">
      <div className="mb-6 shrink-0">
        <Title variant="4xl" bold="bold" color="primary">
          {t("auth.register_form.title")}
        </Title>
        <Subtitle color="secondary" variant="sm" className="mt-2">
          {t("auth.register_form.account_suggest")}{" "}
          <Link
            onClick={() => goto("left")}
            to="/login"
            className="text-blue-500 font-medium hover:underline"
          >
            {t("auth.register_form.login_link")}
          </Link>
        </Subtitle>
      </div>

      <ScrollArea
        as='form'
        noValidate
        onSubmit={onSubmit}
        className="min-h-0 flex-1 pt-3 space-y-4 pr-2 pb-4 overflow-y-auto overscroll-contain"
      >
        <InputField
          label={t("auth.register_form.email_label")}
          placeholder={t("auth.register_form.email_placeholder")}
          type="email"
          required
          {...register("email")}
          errorText={errors.email?.message}
        />

        <InputField
          label={t("auth.register_form.username_label")}
          placeholder={t("auth.register_form.username_placeholder")}
          type="text"
          required
          {...register("username")}
          errorText={errors.username?.message}
        />

        <InputField
          label={t("auth.register_form.password_label")}
          placeholder={t("auth.register_form.password_placeholder")}
          type="password"
          required
          {...register("password")}
          errorText={errors.password?.message}
        />

        <InputField
          label={t("auth.register_form.confirmed_password_label")}
          placeholder={t("auth.register_form.confirmed_password_placeholder")}
          type="password"
          required
          {...register("confirmedPassword")}
          errorText={errors.confirmedPassword?.message}
        />

        <InputField
          label={t("auth.register_form.birthday_label")}
          placeholder={t("auth.register_form.birthday_placeholder")}
          {...register("birthday",{setValueAs : (value: string) => value === "" ? undefined : new Date(`${value}T00:00:00`)})}
          type="date"
          errorText={errors.birthday?.message}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full shadow-md"
        >
          {isSubmitting
            ? t("auth.register_form.submitting_button")
            : t("auth.register_form.submit_button")}
        </Button>
      </ScrollArea>
    </div>
  )
}
