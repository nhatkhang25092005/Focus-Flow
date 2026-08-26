import { useTranslation } from "react-i18next"
import Button from "../../../../components/Button"
import { useResendCode } from "./useResendCode"
import { useCountDown } from "../../../../hooks/useCountDown"
import Clock from "../../../../components/Clock"
import { useEffect } from "react"
type ResendCodeButtonProps = {
  disabled?: boolean
  running?: boolean,
  purpose?: "REGISTER" | "FORGOT_PASSWORD"
}
const RESENT_TIME = 60
export default function ResendCodeButton({
  disabled = false,
  running = false,
  purpose = "REGISTER"
}: ResendCodeButtonProps) {
  const { t } = useTranslation()
  const { isResending, onResend } = useResendCode(purpose)
  const { time, isRunning, startCountdown, stopCountdown, restartCountdown } = useCountDown(RESENT_TIME)

  useEffect(() => {
    if (running) startCountdown()
    else stopCountdown()
    return () => stopCountdown()
  }, [running])


  return (
    <Button
      variant="secondary"
      type="button"
      disabled={disabled || isResending || isRunning}
      onClick={async () => {
        await onResend()
        restartCountdown()
      }}
      className="mt-3 w-full"
    >
      {isResending
        ? t("auth.verify_account_form.resending_button")
        : isRunning
          ? <span className="flex flex-row gap-2 justify-center"><p>{t("auth.verify_account_form.resend_after")}</p> <Clock hideHours time={time} /></span>
          : t("auth.verify_account_form.resend_button")
      }

    </Button>
  )
}
