import { forwardRef } from "react"
import { cn } from "../../utils/cn"
import HighlightState from "./HighlightState"
import type { BaseInputProps } from "./types"

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      value,
      label,
      inputId,
      errorText,
      className,
      containerClassName,
      children,
      alwaysShowLabel = false,
      ...props
    },
    ref,
  ) => {
    const showLabel = value || (!value && errorText) || alwaysShowLabel
    const hideLabel = !value && !errorText && !alwaysShowLabel
    

    return(
    <div className={cn("flex bg-white flex-col relative", containerClassName)}>
      <input
        ref={ref}
        {...props}
        id={inputId}
        className={cn(
          `block peer focus:text-gray-800
          [box-shadow:0_0_0px_100px_white_inset]
          border-b border-orange-200 focus:outline-none
          hover:border-orange-300
          transition-colors duration-300
          bg-transparent
          h-10 text-sm w-full`,
          className,
          {
            "text-red-600": errorText,
          },
        )}
      />

      <label
        htmlFor={inputId}
        className={cn(
          `peer-focus:-top-3 peer-focus:opacity-100
          peer-focus:text-xs transition-all duration-200
          ease-linear absolute w-full`,
          {
            "opacity-100 -top-3 text-xs": showLabel,
            "opacity-0 top-0 pr-1 text-sm": hideLabel,
            "peer-focus:text-red-600": errorText,
            "peer-focus:text-orange-500": !errorText,
          },
        )}
      >
        {errorText ? (
          <p className="absolute -bottom-4 text-xs text-red-600">
            {errorText}
          </p>
        ) : (
          label
        )}
      </label>

      {props.required ? (
        <span className="text-red-700 right-1 top-1.5 absolute">*</span>
      ) : null}

      {children}
      <HighlightState errorText={errorText} />
    </div>
  )},
)

BaseInput.displayName = "BaseInput"

export default BaseInput
