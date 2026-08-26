import { useTranslation } from "react-i18next"
import InputField from "../../../../components/InputField/InputField"
import { useForgot } from "./useForgot"
import Title from "../../../../components/text/Title"
import { useSlider } from '../../../../share/context/SliderContext'
import Subtitle from "../../../../components/text/Subtitle"
import Button from "../../../../components/Button"

export default function ForgotRequest() {
  const { t } = useTranslation()
  const { errors, register, onSubmit, isSubmitting } = useForgot()
  const { goto } = useSlider()
  
  return (
    <>
      <div className="flex flex-col">
        <Title variant="4xl" bold="bold">
          {t("auth.forgot_form.title")}
        </Title>

        <Subtitle color="secondary" variant="sm" className="mt-2">
          {t("auth.forgot_form.description")}
        </Subtitle>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col w-full">
        <InputField
          type="email"
          errorText={errors.email?.message}
          {...register("email")}
          label={t("auth.forgot_form.email_label")}
          required
          containerClassName="mt-6"
          placeholder={t("auth.forgot_form.email_placeholder")}
        />

        <div className="w-full mt-4 flex flex-col items-end">
          <a
            onClick={() => goto('login')}
            className="text-blue-500 absolute cursor-pointer text-sm underline"
          >
            {t("auth.forgot_form.back_link")}
          </a>
          <Button variant="primary" type="submit" disabled={isSubmitting} className="mt-7 w-full">
            {isSubmitting ? t("auth.forgot_form.submitting_button") : t("auth.forgot_form.submit_button")}
          </Button>
        </div>
      </form>
    </>
  )
}
