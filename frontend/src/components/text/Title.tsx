import { cn } from "../../utils/cn"

const titleColor = {
  primary: "text-black",
  secondary: "text-gray-500",
}


type TitleProps = {
  children: string
  variant?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
  color?: keyof typeof titleColor
  bold?: "bold" | "semibold" | "extrabold"
  italic?: boolean
  className?: string
}
export default function Title({
  children,
  variant,
  color,
  bold,
  italic,
  className = "",
}: TitleProps) {
  return (
    <p
      className={cn(
        `
      ${bold ? `font-${bold}` : ""}
      ${italic ? "italic" : ""}
      ${variant ? `text-${variant}` : "text-2xl"}
      ${color ? `${titleColor[color]}` : ""}`,
        className,
      )}
    >
      {children}
    </p>
  )
}
