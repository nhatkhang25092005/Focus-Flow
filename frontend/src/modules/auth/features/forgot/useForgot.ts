import { forgotSchema, type ForgotInput } from "./forgot.schema"
import { useTranslation } from "react-i18next"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { uiService } from "../../../../ui/service"
import { useSlider } from "../../../../share/context/SliderContext"
import { forgotPasswordRequestService } from "../../authServices"
import { handleResponse } from "../../../../utils/handleResponse"
import { getMessageFromCode } from "../../../../utils/getMessageFromCode"
import { APP_CODE } from "../../../../share/code"

export function useForgot() {
  const { t } = useTranslation()
  const { goto, setShare } = useSlider()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotInput>({
    resolver: zodResolver(forgotSchema(t)),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  })

  const onValidSubmit = useCallback(async (data: ForgotInput) => {
    const response = await uiService.loading.asyncLoading(
      () => forgotPasswordRequestService({ email: data.email }),
      t("ui.loading.forgot_loading_text"),
    )

    handleResponse({
      response,
      onSuccess: () => {
        uiService.toast.showToast({
          message: t("auth.forgot_form.success_message") || "Verification code sent!", 
          style: "success",
          duration: 3000,
          position: "down-right",
          direction: "up",
        })
        setShare({ 'email': data.email })
        goto('forgot_verify')
      },
      onFailure: (failure) => {
        if (!failure) return

        if (failure.code === APP_CODE.USER_REQUEST_FORGOT_NOT_VERIFIED || failure.code === APP_CODE.USER_REQUEST_FORGOT_NOT_VERIFIED) {
          uiService.popup.showPopup({
            title: t("auth.error.register.user_not_verified_title"),
            message: t('auth.error.register.user_not_verified_message'),
            style: 'error'
          })
          setShare({'email': data.email})
          goto('verify_account')
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
  }, [t, goto, setShare])

  return {
    errors,
    register,
    isSubmitting,
    onSubmit: handleSubmit(onValidSubmit),
  }
}
