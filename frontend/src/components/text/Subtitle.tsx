import { type ReactNode } from "react"
import { cn } from "../../utils/cn"
const subtitleColor = {
  primary: "text-black",
  secondary: "text-gray-500",
}
type SubtitleProps = {
  children: ReactNode
  variant?: "sm" | "md" | "lg" | "xl" | "2xl"
  color?: keyof typeof subtitleColor
  bold?: "bold" | "semibold" | "extrabold"
  italic?: boolean
  className?: string
}

export default function Subtitle({
  children,
  variant,
  color = 'primary',
  bold,
  italic,
  className = "",
}: SubtitleProps) {
  return (
    <p
      className={cn(
        `text-${variant}`,
        subtitleColor[color],
        bold && `font-${bold}`,
        italic && "italic",
        className,
      )}
    >
      {children}
    </p>
  )
}
