import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSlider } from "../../../../share/context/SliderContext"
import { uiService } from "../../../../ui/service"
import { handleResponse } from "../../../../utils/handleResponse"
import { getMessageFromCode } from "../../../../utils/getMessageFromCode"
import { resendVerificationCodeService } from "../../authServices"
import { APP_CODE } from "../../../../share/code"

export function useResendCode(purpose: "REGISTER" | "FORGOT_PASSWORD" = "REGISTER") {
  const { t } = useTranslation()
  const { share } = useSlider()
  const [isResending, setIsResending] = useState(false)

  const onResend = useCallback(async () => {
    if (!share.email || isResending) return

    setIsResending(true)
    try {
      const response = await uiService.loading.asyncLoading(
        () =>
          resendVerificationCodeService({
            email: share.email as string,
            purpose: purpose,
          }),
        t("ui.loading.resend_verification_code_loading_text"),
      )

      handleResponse({
        response,
        onSuccess: () => {
          uiService.toast.showToast({
            message: t("auth.verify.resend_success"),
            style: "success",
            duration: 5000,
            position: "down-right",
            direction: "up",
          })
        },
        onFailure: (failure) => {
          if (!failure) return
          if (failure.code === APP_CODE.RESEND_CODE_EXPIRED) {
            uiService.toast.showToast({
              message: t("auth.verify.resend_code_expired"),
              style: "error",
              duration: 5000,
              position: "down-right",
              direction: "up",
            })
            return
          }
          if (failure.code === APP_CODE.RESEND_CODE_TOO_MANY_REQUESTS) {
            uiService.popup.showPopup({
              title: t('ui.popup.too_many_requests_title'),
              message: t("auth.verify.resend_code_too_many_requests"),
              style: "error",
            })
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
    } finally {
      setIsResending(false)
    }
  }, [isResending, share.email, purpose, t])

  return { isResending, onResend }
}
