import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Button from "../../../../components/Button"
import InputField from "../../../../components/InputField/InputField"
import Subtitle from "../../../../components/text/Subtitle"
import Title from "../../../../components/text/Title"
import ScrollArea from "../../../../components/ScrollArea"
import { useForgotVerify } from "./useForgotVerify"
import { useSlider } from "../../../../share/context/SliderContext"
import ResendCodeButton from "../resend_code/ResendCodeButton"

export default function ForgotVerify() {
  const { t } = useTranslation()
  const { register, errors, isSubmitting, onSubmit } = useForgotVerify()
  const { goto, currentSlideId } = useSlider()

  return (
    <div className="w-full h-full min-h-0 bg-white rounded-2xl flex flex-col">
      <div className="flex flex-col shrink-0">
        <Title variant="4xl" bold="bold">
          {t("auth.forgot_verify_form.title")}
        </Title>

        <Subtitle color="secondary" variant="sm" className="mt-2">
          {t("auth.forgot_verify_form.description")}
        </Subtitle>

        <Subtitle color="secondary" variant="sm" italic bold="semibold">
          {t('auth.forgot_verify_form.notice')}
        </Subtitle>
      </div>

      <ScrollArea
        as="form"
        noValidate
        onSubmit={onSubmit}
        className="min-h-0 flex-1 pt-3 space-y-4 pr-2 pb-4 overflow-y-auto overscroll-contain"
      >
        <InputField
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          errorText={errors.verification_code?.message}
          {...register("verification_code")}
          label={t("auth.forgot_verify_form.code_label")}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "")
            register("verification_code").onChange(e)
          }}
          required
          containerClassName="mt-4"
          placeholder="000000"
        />

        <InputField
          label={t("auth.forgot_verify_form.password_label")}
          placeholder={t("auth.forgot_verify_form.password_placeholder")}
          type="password"
          required
          {...register("password")}
          errorText={errors.password?.message}
        />

        <InputField
          label={t("auth.forgot_verify_form.confirmed_password_label")}
          placeholder={t("auth.forgot_verify_form.confirmed_password_placeholder")}
          type="password"
          required
          {...register("confirmedPassword")}
          errorText={errors.confirmedPassword?.message}
        />

        <div className="mt-4 flex w-full flex-col items-end">
          <Link
            to="/auth"
            onClick={() => goto('login')}
            className="cursor-pointer text-sm text-blue-500 underline"
          >
            {t("auth.forgot_verify_form.back_link")}
          </Link>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full"
          >
            {isSubmitting
              ? t("auth.forgot_verify_form.submitting_button")
              : t("auth.forgot_verify_form.submit_button")}
          </Button>

          <ResendCodeButton
            running={currentSlideId === 'forgot_verify'}
            disabled={isSubmitting}
            purpose="FORGOT_PASSWORD"
          />
        </div>
      </ScrollArea>
    </div>
  )
}
