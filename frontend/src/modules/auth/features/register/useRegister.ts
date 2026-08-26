import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerService } from "../../authServices"
import { type RegisterInput } from "./register.schema"
import { registerSchema } from "./register.schema"
import { handleResponse } from "../../../../utils/handleResponse"
import { uiService } from "../../../../ui/service"
import { getMessageFromCode } from "../../../../utils/getMessageFromCode"
import { useTranslation } from "react-i18next"
import { useCallback } from "react"
import { useSlider } from "../../../../share/context/SliderContext"
import { APP_CODE } from "../../../../share/code"

const defaultValues: RegisterInput = {
  email: "",
  username: "",
  password: "",
  confirmedPassword: "",
  birthday: undefined,
}

export function useRegister() {
  const { t } = useTranslation()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    shouldUseNativeValidation: false,
    resolver: zodResolver(registerSchema(t)),
    defaultValues,
  })
  const { goto, setShare } = useSlider()

  const onValidSubmit = useCallback(
    async (data: RegisterInput) => {
      const response = await uiService.loading.asyncLoading(
        () => registerService(data),
        t("ui.loading.register_loading_text"),
      )

      handleResponse({
        response,
        onSuccess: () => {
          reset(defaultValues)
          goto("verify_account")
          setShare({'email':data.email})
          uiService.popup.showPopup({
            title: t("auth.register.success_title"),
            message: t("auth.register.success_message"),
            style: "info",
            buttonText: t('ui.popup.ok_button')
          })
        },
        onFailure: (failure) => {
          if (!failure) return
          
          if(failure.code === APP_CODE.USER_NOT_VERIFY) {
            uiService.popup.showPopup({
              title: t("auth.error.register.user_not_verified_title"),
              message: t('auth.error.register.user_not_verified_message'),
              style: 'error'
            })
            setShare({'email':data.email})
            goto('verify_account')
            return
          }

          const toastMessage = getMessageFromCode[failure.code]
            ? t(getMessageFromCode[failure.code])
            : failure.message || t("auth.error.register.default_error") 

          uiService.toast.showToast({message: toastMessage, style: "error", duration: 5000, position: "down-right", direction: "up"})
        },
      })
    },
    [goto, reset, t, setShare],
  )

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onValidSubmit),
  }
}
