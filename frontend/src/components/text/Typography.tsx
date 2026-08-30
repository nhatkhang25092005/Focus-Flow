import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "../../utils/cn"

/**
 * Visual typographic variants for the `Typography` component.
 */
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "body-sm"
  | "caption"
  | "lead"
  | "large"
  | "small"
  | "muted"

/**
 * Font weight options for the `Typography` component.
 */
export type TypographyWeight =
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"

/**
 * Theme text color choices for the `Typography` component.
 */
export type TypographyColor =
  | "primary"
  | "secondary"
  | "muted"
  | "white"
  | "black"
  | "amber"
  | "danger"
  | "success"
  | "inherit"

/**
 * Text alignment options for the `Typography` component.
 */
export type TypographyAlign = "left" | "center" | "right" | "justify"

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-4xl font-bold tracking-tight lg:text-5xl",
  h2: "text-3xl font-semibold tracking-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  h5: "text-lg font-semibold",
  h6: "text-base font-semibold",
  body: "text-base font-normal",
  "body-sm": "text-sm font-normal",
  caption: "text-xs font-normal text-gray-500",
  lead: "text-xl text-gray-600 font-normal",
  large: "text-lg font-semibold",
  small: "text-xs font-medium leading-none",
  muted: "text-sm text-gray-500",
}

const weightClasses: Record<TypographyWeight, string> = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
}

const colorClasses: Record<TypographyColor, string> = {
  primary: "text-gray-900",
  secondary: "text-gray-600",
  muted: "text-gray-500",
  white: "text-white",
  black: "text-black",
  amber: "text-amber-500",
  danger: "text-red-500",
  success: "text-green-500",
  inherit: "text-inherit",
}

const alignClasses: Record<TypographyAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
}

const defaultElementMap: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
  "body-sm": "p",
  caption: "span",
  lead: "p",
  large: "p",
  small: "small",
  muted: "p",
}

type TypographyOwnProps<E extends ElementType = "p"> = {
  /**
   * The underlying HTML tag or React element to render.
   * Defaults to the tag corresponding to `variant` (e.g. `'h1'` for variant `'h1'`, `'span'` for `'caption'`, `'p'` for `'body'`).
   */
  as?: E
  /**
   * Content to be rendered inside the component.
   */
  children?: ReactNode
  /**
   * Typographic variant determining font size, line height, and default tracking.
   * @default "body"
   */
  variant?: TypographyVariant
  /**
   * Font weight style.
   */
  weight?: TypographyWeight
  /**
   * Text color theme.
   */
  color?: TypographyColor
  /**
   * Text alignment utility.
   */
  align?: TypographyAlign
  /**
   * Shortcut for font weight. Accepts a boolean for `font-bold` or a `TypographyWeight` value.
   */
  bold?: boolean | TypographyWeight
  /**
   * Applies italic font style.
   */
  italic?: boolean
  /**
   * Applies underline decoration.
   */
  underline?: boolean
  /**
   * Truncates text with an ellipsis if overflow occurs (`truncate`).
   */
  truncate?: boolean
  /**
   * Custom CSS class names to extend or override default Tailwind classes.
   */
  className?: string
}

/**
 * Polymorphic props for `Typography` combining custom props with standard HTML attributes of component `E`.
 *
 * @template E - The HTML element or React component type.
 */
export type TypographyProps<E extends ElementType = "p"> = TypographyOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof TypographyOwnProps<E>>

/**
 * A flexible, polymorphic Typography component for standardizing headings, paragraphs, labels, and text elements across FocusFlow.
 *
 * @template E - The HTML tag or React component element type (defaults to `"p"` or the corresponding variant element tag).
 * @param props - Component configuration props including variant, color, weight, tag (`as`), and standard HTML attributes.
 * @returns React element rendered with merged Tailwind classes.
 *
 * @example
 * ```tsx
 * // Default body paragraph
 * <Typography>Welcome back to FocusFlow!</Typography>
 *
 * // H1 Heading
 * <Typography variant="h1">Dashboard Overview</Typography>
 *
 * // Custom tag override with custom weight and color
 * <Typography variant="h2" as="h1" color="amber" weight="bold">
 *   Featured Section
 * </Typography>
 *
 * // Truncated caption text
 * <Typography variant="caption" truncate className="max-w-xs">
 *   Long subtext that needs ellipsis...
 * </Typography>
 * ```
 */
export default function Typography<E extends ElementType = "p">({
  as,
  children,
  variant = "body",
  weight,
  color,
  align,
  bold,
  italic,
  underline,
  truncate,
  className = "",
  ...props
}: TypographyProps<E>) {
  const Component = as || defaultElementMap[variant] || "p"

  const fontBoldClass =
    typeof bold === "string"
      ? weightClasses[bold]
      : bold
        ? "font-bold"
        : weight
          ? weightClasses[weight]
          : ""

  return (
    <Component
      className={cn(
        variantClasses[variant],
        color && colorClasses[color],
        fontBoldClass,
        align && alignClasses[align],
        italic && "italic",
        underline && "underline",
        truncate && "truncate",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

