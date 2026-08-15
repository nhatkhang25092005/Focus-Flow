import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ForwardedRef,
} from "react"
import { cn } from "../utils/cn"

type ButtonVariant = "primary" | "secondary"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-amber-500 border-amber-300 text-gray-900
    hover:bg-amber-600 hover:border-amber-200
  `,
  secondary: `
    bg-white border-amber-500 text-amber-600
    hover:bg-amber-50 hover:border-amber-600
  `,
}

const Button = forwardRef(
  (
    { variant = "primary", className, type = "button", ...props }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        `
          h-10 px-4 border rounded-lg font-semibold
          cursor-pointer transition-colors duration-300
          focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
        `,
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  ),
)

Button.displayName = "Button"

export default Button
export type { ButtonProps, ButtonVariant }
