import LoginHero from "../modules/auth/components/LoginHero"
import LoginForm from "../modules/auth/login/LoginForm"
import { useTranslation } from "react-i18next"
export default function AuthPage() {
  // const { t, i18n } = useTranslation()
  // const changeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng)
  // }
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
          z-10 p-10
          flex flex-col gap-5
          shadow-2xl
        "
      >
        <header>
          <h2 className="italic text-4xl font-bold font-virgil">FOCUS FLOW</h2>
          <p className="md:hidden font-virgil text-xl">
            {t("auth.page.hero_slogan")}
          </p>
        </header>
        {/* Adjust the login form layout */}
        <LoginForm />
      </section>
      {/* <div>
        <button onClick={() => changeLanguage('vi')}>Tiếng Việt</button>
        <button onClick={() => changeLanguage('en')}>English</button>
      </div> */}
    </div>
  )
}
