import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { handleResponse } from "../../../../utils/handleResponse"
import { getMessageFromCode } from "../../../../utils/getMessageFromCode"
import { uiService } from "../../../../ui/service"
import { useSlider } from "../../../../share/context/SliderContext"
import { verifyAccountService } from "../../authServices"
import {
  verifyAccountSchema,
  type VerifyAccountFormValues,
} from "./verifyAccount.schema"
import { APP_CODE } from "../../../../share/code"

export function useVerifyAccount() {
  const { t } = useTranslation()
  const { goto, share } = useSlider()
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    register,
  } = useForm<VerifyAccountFormValues>({
    resolver: zodResolver(verifyAccountSchema(t)),
    defaultValues: { verification_code: "" },
  })

  const onValidSubmit = useCallback(
    async (values: VerifyAccountFormValues) => {
      if (!share.email) {
        uiService.popup.showPopup({
          title: t("auth.error.verify.missing_email_title"),
          message: t("auth.error.verify.missing_email_message"),
          style: "error",
        })
        goto("register")
      }
      const response = await uiService.loading.asyncLoading(
        () =>
          verifyAccountService({
            email: share.email as string,
            verification_code: values.verification_code,
          }),
        t("ui.loading.verify_account_loading_text"),
      )
      handleResponse({
        response,
        onSuccess: async () => {
          reset()
          goto("login")
          uiService.popup.showPopup({
            title: t("auth.verify.success_title"),
            message: t("auth.verify.success_message"),
            style: "info",
          })
        },
        onFailure: (failure) => {
          if (!failure) return
          if (failure.code === APP_CODE.TOO_MANY_VERIFY_ATTEMPTS) {
            uiService.popup.showPopup({
              title: t("ui.popup.verify_fail_too_much"),
              message: t("auth.error.verify.too_many_attempts"),
              style: "error",
            })
            goto('register')
            return
          }
          uiService.toast.showToast({
            message: getMessageFromCode[failure.code]
              ? t(getMessageFromCode[failure.code])
              : failure.message,
            style: "error",
            duration: 5000,
            position: "down-right",
            direction: "up",
          })
        },
      })
    },
    [goto, t, reset, share.email],
  )

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onValidSubmit),
  }
}
