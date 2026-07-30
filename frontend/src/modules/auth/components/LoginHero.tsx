import { useTranslation } from "react-i18next"

import Carousel from "../../../components/Carousel"

import pomodoro from "../../../assets/images/pomodoro.jpg"
import sessionHistory from "../../../assets/images/sessionHistory.png"
import todo from "../../../assets/images/todo.png"

const images = [pomodoro, todo, sessionHistory]

export default function LoginHero() {
  const { t } = useTranslation()

  return (
    <>
      <div className="mx-20 shrink-0">
        <h1 className="font-bold text-4xl font-virgil italic">
          {t("auth.page.hero_title")}
        </h1>

        <p className="text-2xl font-virgil">{t("auth.page.hero_slogan")}</p>
      </div>

      <Carousel delayTime={5000} duration={1000}>
        {images.map((image, index) => (
          <img
            src={image}
            key={index}
            alt="image"
            className="object-contain w-full h-full"
          />
        ))}
      </Carousel>
    </>
  )
}
