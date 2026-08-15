import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerService } from "../authServices"
import { type RegisterInput } from "./register.schema"
import { registerSchema } from "./register.schema"
import { handleResponse } from "../../../utils/handleResponse"
import { uiService } from "../../../ui/service"
import { mapResCode } from "../../../utils/mapResCode"
import { useTranslation } from "react-i18next"
import { useCallback } from "react"
import { useSlider } from "../../../share/context/SliderContext"

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
  const { goto } = useSlider()

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
          goto("left")
          uiService.showPopup(
            t("auth.register.success_title"),
            t("auth.register.success_message"),
            "info",
          )
        },
        onFailure: (failure) => {
          if (!failure) return

          uiService.toast.showToast({
            message: mapResCode[failure.code]
              ? t(mapResCode[failure.code])
              : failure.message || t("auth.error.register.user_not_verified"),
            style: "error",
            duration: 5000,
            position: "down-right",
            direction: "up",
          })
        },
      })
    },
    [goto, reset, t],
  )

  return {
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onValidSubmit),
  }
}
