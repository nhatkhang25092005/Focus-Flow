import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

import Button from "../../../../components/Button"
import InputField from "../../../../components/InputField/InputField"
import Subtitle from "../../../../components/text/Subtitle"
import Title from "../../../../components/text/Title"
import { useVerifyAccount } from "./useVerifiAccount"
import { useSlider } from "../../../../share/context/SliderContext"
import ResendCodeButton from "../resend_code/ResendCodeButton"

export default function VerifyAccountForm() {
  const { t } = useTranslation()
  const {
    register,
    errors, isSubmitting,
    onSubmit,
  } = useVerifyAccount()
  const { goto, currentSlideId } = useSlider()

  return (
    <>
      <div className="flex flex-col">
        <Title variant="4xl" bold="bold">
          {t("auth.verify_account_form.title")}
        </Title>

        <Subtitle color="secondary" variant="sm" className="mt-2">
          {t("auth.verify_account_form.description")}
        </Subtitle>
        <Subtitle color="secondary" variant="sm" italic bold="semibold">
          {t('auth.verify_account_form.notice')}
        </Subtitle>
      </div>

      <form noValidate onSubmit={onSubmit} className="flex w-full flex-col">
        <InputField
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          errorText={errors.verification_code?.message}
          {...register("verification_code")}
          label={t("auth.verify_account_form.code_label")}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/\D/g, "")
            register("verification_code").onChange(e)
          }}
          required
          containerClassName="mt-8"
          placeholder="000000"
        />

        <div className="mt-4 flex w-full flex-col items-end">
          <Link
            to="/auth"
            onClick={() => goto('login')}
            className="absolute cursor-pointer text-sm text-blue-500 underline"
          >
            {t("auth.verify_account_form.back_link")}
          </Link>

          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="mt-7 w-full"
          >
            {isSubmitting
              ? t("auth.verify_account_form.submitting_button")
              : t("auth.verify_account_form.submit_button")}
          </Button>

          <ResendCodeButton
            running={currentSlideId === 'verify_account'}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </>
  )
}
