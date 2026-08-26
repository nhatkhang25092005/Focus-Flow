import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotVerifySchema, type ForgotVerifyInput } from "./forgotVerify.schema"
import { useTranslation } from "react-i18next"
import { useCallback } from "react"
import { uiService } from "../../../../ui/service"
import { useSlider } from "../../../../share/context/SliderContext"
import { resetPasswordService } from "../../authServices"
import { handleResponse } from "../../../../utils/handleResponse"
import { getMessageFromCode } from "../../../../utils/getMessageFromCode"
import { APP_CODE } from "../../../../share/code"

export function useForgotVerify() {
  const { t } = useTranslation()
  const { goto, share } = useSlider()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotVerifyInput>({
    resolver: zodResolver(forgotVerifySchema(t)),
    defaultValues: {
      verification_code: "",
      password: "",
      confirmedPassword: "",
    },
    mode: "onSubmit",
  })

  const onValidSubmit = useCallback(async (data: ForgotVerifyInput) => {
    const email= share?.email as string
    if (!email) return

    const response = await uiService.loading.asyncLoading(
      () => resetPasswordService({
        email:email,
        new_password: data.password,
        confirmed_password: data.confirmedPassword,
        verification_code: data.verification_code
      }),
      t("ui.loading.verify_account_loading_text"),
    )

    handleResponse({
      response,
      onSuccess: () => {
        uiService.popup.showPopup({
          title: t("auth.forgot_verify_form.success_title"),
          message: t("auth.forgot_verify_form.success_message"),
          style: "success",
          buttonText: t("ui.popup.ok_button"),
        })
        goto("login")
      },
      onFailure: (failure) => {
        if (!failure) return

        if (failure.code === APP_CODE.FORGOT_PASSWORD_VERIFY_CODE_EXPIRED) {
          uiService.popup.showPopup({
            title: t("ui.toast.errorTitle"),
            message: t("auth.error.verify.code_expired"),
            style: "error",
          })
          goto("forgot")
          return
        }

        const toastMessage = getMessageFromCode[failure.code]
          ? t(getMessageFromCode[failure.code])
          : failure.message || t("auth.error.register.default_error")

        uiService.toast.showToast({
          message: toastMessage,
          style: "error",
          duration: 5000,
          position: "down-right",
          direction: "up"
        })
      }
    })
  }, [t, goto, share])

  return {
    errors,
    register,
    isSubmitting,
    onSubmit: handleSubmit(onValidSubmit),
  }
}
