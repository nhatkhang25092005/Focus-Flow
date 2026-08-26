import LoginHero from "../modules/auth/components/LoginHero"
import LoginForm from "../modules/auth/features/login/LoginForm"
import { useTranslation } from "react-i18next"
import Slider from "../components/Slider/Slider"
import RegisterForm from "../modules/auth/features/register/RegisterForm"
import VerifyAccountForm from "../modules/auth/features/verify_account/VerifyAccountForm"
import ForgotRequest from "../modules/auth/features/forgot/ForgotRequest"
import ForgotVerify from "../modules/auth/features/forgot/ForgotVerify"
import { useLocation } from "react-router-dom"
export default function AuthPage() {
  // const { t, i18n } = useTranslation()
  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng)
  // }

  const item2dMatrix = [
    ['forgot_verify', 'forgot', 'login', 'register', 'verify_account'],
  ] as const
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const firstDisplayItemId = pathname === "/verify-account"
    ? "verify_account"
    : "login"
  return (
    <div className="md:flex-row flex h-screen overflow-hidden justify-center">
      <section className="hidden md:flex w-9/13 pt-10 flex-col h-screen z-0">
        <LoginHero />
      </section>
      <section
        className="
          w-full md:w-4/13
          m-10 md:m-0
          border border-neutral-200 md:border-none
          rounded-2xl md:rounded-none
          z-10 p-10 min-h-0 overflow-hidden
          flex flex-col gap-5
          shadow-2xl
        "
      >
        <header className="shrink-0">
          <h2 className="italic text-4xl font-bold font-nunito-extra-bold">FOCUS FLOW</h2>
          <p className="md:hidden font-nunito text-xl">
            {t("auth.page.hero_slogan")}
          </p>
        </header>
        {/* Adjust the login form layout */}
        <div className="min-h-0 flex-1">
          <Slider firstDisplayItemId={firstDisplayItemId} item2DMatrix={item2dMatrix}>
            <Slider.Slide id="login">
              <LoginForm />
            </Slider.Slide>
            <Slider.Slide id="register">
              <RegisterForm />
            </Slider.Slide>
            <Slider.Slide id="verify_account">
              <VerifyAccountForm />
            </Slider.Slide>
            <Slider.Slide id="forgot">
              <ForgotRequest />
            </Slider.Slide>
            <Slider.Slide id="forgot_verify">
              <ForgotVerify />
            </Slider.Slide>
          </Slider> 
        </div>

      </section>
      {/* <div>
        <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
        <button onClick={() => changeLanguage('en')}>English</button>
      </div> */}
    </div>
  )
}
