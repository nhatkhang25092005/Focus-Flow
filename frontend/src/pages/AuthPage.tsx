import LoginHero from "../modules/auth/components/LoginHero"
import LoginForm from "../modules/auth/login/LoginForm"
import { useTranslation } from "react-i18next"
import Slider from "../components/Slider/Slider"
import RegisterForm from "../modules/auth/register/RegisterForm"
export default function AuthPage() {
  // const { t, i18n } = useTranslation()
  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng)
  // }

  const item2dMatrix = [
    ['login', 'register'],
  ]
  const { t } = useTranslation()
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
          <Slider firstDisplayItemId='login' item2DMatrix={item2dMatrix}>
            <Slider.Slide id="login" navigation={{ right: 'register' }}>
              <LoginForm />
            </Slider.Slide>
            <Slider.Slide id="register" navigation={{ left: 'login' }}>
              <RegisterForm />
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
