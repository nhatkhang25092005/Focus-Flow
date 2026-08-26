import { loginService } from "../../authServices"
import { handleResponse } from "../../../../utils/handleResponse"
import { uiService } from "../../../../ui/service"
import { loginSchema, type LoginInput } from "./login.schema"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getMessageFromCode } from "../../../../utils/getMessageFromCode"
import { userService } from "../../../../user/userService"
import { useCallback } from "react"
import { APP_CODE } from "../../../../share/code"
import { useSlider } from "../../../../share/context/SliderContext"
export function useLogin() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { goto, setShare } = useSlider()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  })

  const onValidSubmit = useCallback(async (data: LoginInput) => {
    // Call api
    const response = await uiService.loading.asyncLoading(
      () => loginService(data),
      t("ui.loading.login_loading_text"),
    )

    // Handle case responses
    handleResponse({
      response,
      onSuccess: (userData) => {
        if (!userData) return // If the response data is null -> error occurs in api, stop!
        userService.setUser(userData)
        navigate("/home")
      },
      onFailure: (failure) => {
        if (!failure) return
        const message = getMessageFromCode[failure.code]
          ? t(getMessageFromCode[failure.code])
          : failure.message

        if (failure.code === APP_CODE.NOT_VERIFIED) {
          uiService.popup.showPopup({
            title: t('ui.popup.auth_user_not_verified'),
            message: message,
            style: 'error',
            buttonText: t('ui.popup.ok_button')
          })
          goto('verify_account')
          setShare({ 'email': data.email })
        }

        uiService.toast.showToast({
          message: message,
          style: "error",
          duration: 5000,
          position: "down-right",
          direction: "up",
        })
      },
    })
  }, [t, navigate])

  return {
    errors,
    register,
    onSubmit: handleSubmit(onValidSubmit),
  }
}
