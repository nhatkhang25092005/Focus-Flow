import { useAppSelector } from "../../app/hooks"
import clsx from "clsx"
import { uiService } from "../service"
import Backdrop from "./Backdrop"

// TODO: Import the asset path from /public into icon values
const icon = {
  success: '/successIcon.png',
  error: '/errorIcon.png',
  info: '/infoIcon.png',
  warning: '/warningIcon.png',
}

const buttonClasses = {
  success: 'bg-green-500 hover:bg-green-400 focus:ring-green-400',
  error: 'bg-red-500 hover:bg-red-400 focus:ring-red-400',
  info: 'bg-blue-500 hover:bg-blue-400 focus:ring-blue-400',
  warning: 'bg-amber-500 hover:bg-amber-400 focus:ring-amber-400',
}

export default function Popup() {
  const { title, visible, style, message, navigateTo, buttonText } = useAppSelector(
    (state) => state.ui.popup,
  )

  const handleAction = () => {
    uiService.popup.hidePopup()
    if (navigateTo) { } // This feature will be develop soon =)
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
        <img src={icon[style]} alt="Popup Icon" className="mx-auto w-16 h-16 mb-4" />
        <h2 id="popup-title" className="text-xl text-center font-bold text-gray-900">
          {title}
        </h2>
        <p id="popup-message" className="mt-3 text-sm text-gray-600">
          {message}
        </p>
        <button
          type="button"
          onClick={handleAction}
          className={clsx(
            "w-full mt-6 px-4 py-2",
            "rounded-lg font-semibold text-white",
            "transition-colors focus:outline-none focus:ring-2",
            "cursor-pointer",
            buttonClasses[style]
          )}
        >
          {buttonText}
        </button>
      </section>
    </Backdrop>
  )
}
