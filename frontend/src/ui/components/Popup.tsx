import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { uiService } from "../service"
import Backdrop from "./Backdrop"

export default function Popup() {
  const {title, visible, style, message, navigateTo } = useAppSelector(
    (state) => state.ui.popup,
  )
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleAction = () => {
    uiService.hidePopup()

    if (style === "navigate" && navigateTo) {
      navigate(navigateTo)
    }
  }

  return (
    <Backdrop isOpen={visible} duration={200}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-message"
        className="w-full max-w-sm mx-4 p-6 bg-white rounded-2xl shadow-xl"
      >
        <h2 id="popup-title" className="text-xl font-bold text-gray-900">
          {title}
        </h2>
        <p id="popup-message" className="mt-3 text-sm text-gray-600">
          {message}
        </p>
        <button
          type="button"
          onClick={handleAction}
          className="w-full mt-6 px-4 py-2 rounded-lg font-semibold text-white bg-amber-500 transition-colors hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          {style === "navigate"
            ? t("ui.popup.navigate_button")
            : t("ui.popup.close_button")}
        </button>
      </section>
    </Backdrop>
  )
}
