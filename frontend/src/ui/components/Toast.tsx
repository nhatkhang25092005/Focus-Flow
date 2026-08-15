import { memo } from "react"
import { cn } from "../../utils/cn"
import "../keyframe.css"
import type {
  ToastDirection,
  ToastPosition,
  ToastStyle,
  VisibleState,
} from "../type"
import { type ToastProps } from "../type"
import { useTranslation } from "react-i18next"

type ToastDesign = {
  title:
    | "ui.toast.errorTitle"
    | "ui.toast.successTitle"
    | "ui.toast.warningTitle"
    | "ui.toast.infoTitle"
  icon:
    | "../../../public/errorIcon.png"
    | "../../../public/successIcon.png"
    | "../../../public/warningIcon.png"
    | "../../../public/infoIcon.png"
  titleColor:
    "text-red-600" | "text-green-600" | "text-yellow-500" | "text-blue-600"
  borderColor:
    | "border-red-500"
    | "border-green-400"
    | "border-blue-400"
    | "border-yellow-400"
  spanColor: "bg-red-500" | "bg-green-400" | "bg-blue-400" | "bg-yellow-400"
}

const getAnimation = (
  direction: ToastDirection,
  visible: VisibleState,
): string | null => {
  if (direction === "left") {
    if (visible === "start") return "anim-horizontal-right-in"
    if (visible === "end") return "anim-horizontal-right-out"
  }

  if (direction === "up") {
    if (visible === "start") return "anim-vertical-below-in"
    if (visible === "end") return "anim-vertical-below-out"
  }

  return null
}

// Mapping the Toast Design
const getToastDesign = (style: ToastStyle): ToastDesign => {
  if (style === "error")
    return {
      title: "ui.toast.errorTitle",
      icon: "../../../public/errorIcon.png",
      titleColor: "text-red-600",
      borderColor: "border-red-500",
      spanColor: "bg-red-500",
    }
  if (style === "success")
    return {
      title: "ui.toast.successTitle",
      icon: "../../../public/successIcon.png",
      titleColor: "text-green-600",
      borderColor: "border-green-400",
      spanColor: "bg-green-400",
    }
  if (style === "warning")
    return {
      title: "ui.toast.warningTitle",
      icon: "../../../public/warningIcon.png",
      titleColor: "text-yellow-500",
      borderColor: "border-yellow-400",
      spanColor: "bg-yellow-400",
    }
  else
    return {
      title: "ui.toast.infoTitle",
      icon: "../../../public/infoIcon.png",
      titleColor: "text-blue-600",
      borderColor: "border-blue-400",
      spanColor: "bg-blue-400",
    }
}

// Mapping position for the Toast
const positionProps: Record<ToastPosition, React.CSSProperties> = {
  "down-right": {
    bottom: "16px",
    right: "44px",
  },
  "down-left": {},
  "up-left": {},
  "up-right": {},
}

const Toast = memo(
  ({
    message,
    visible,
    style,
    direction,
    position,
    onAnimationEnd,
  }: ToastProps) => {
    const { t } = useTranslation()
    if (visible === "hidden") return null
    const { title, icon, titleColor, borderColor, spanColor } =
      getToastDesign(style)

    return (
      <div className={cn(`inset-0 pointer-events-none z-50 fixed`)}>
        <div
          className={cn(
            `rounded-lg m-2 bg-white flex flex-row
          absolute w-75 h-15 border drop-shadow-2xl pr-1
          transition-transform ease-out`,
            borderColor,
            getAnimation(direction, visible),
          )}
          style={{
            ...positionProps[position],
            transitionDuration: `${300}ms`,
          }}
          onAnimationEnd={onAnimationEnd}
        >
          <span
            className={cn(`h-full w-1 rounded-bl-sm rounded-tl-sm`, spanColor)}
          />
          <img className="p-4" src={icon} />
          <div className="flex flex-col justify-center">
            <h2 className={cn(`font-semibold`, titleColor)}>{t(title)}</h2>
            <p className="text-xs text-neutral-500">{message}</p>
          </div>
        </div>
      </div>
    )
  },
)

export default Toast
