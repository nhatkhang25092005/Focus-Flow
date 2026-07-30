import {
  useId,
  type ForwardedRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react"
import { cn } from "../../../utils/cn"
import { forwardRef } from "react"
type InputFieldParams = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errorText?: string | undefined
  children?: ReactNode
  containerClassName?: string
}

function HighlightState({ errorText }: { errorText?: string }) {
  return (
    <span
      className={cn(
        `absolute bottom-0 w-0 h-0.5
        transition-all duration-500 ease-in-out`,
        {
          "w-full bg-red-500": errorText,
          "peer-focus:w-full bg-orange-500": !errorText,
        },
      )}
    />
  )
}
const InputField = forwardRef(
  (
    {
      label,
      children,
      className,
      errorText,
      containerClassName,
      value,
      id,
      ...props
    }: InputFieldParams,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const defaultId = useId()
    const inputId = id || defaultId
    return (
      <div
        className={cn("flex bg-white flex-col relative", containerClassName)}
      >
        <input
          ref={ref}
          id={inputId}
          {...props}
          required={false}
          className={cn(
            `block peer focus:text-gray-800
          [box-shadow:0_0_0px_100px_white_inset]
          border-b border-orange-200  focus:outline-none
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
            ` peer-focus:-top-3
            peer-focus:opacity-100
            peer-focus:text-xs
            transition-all duration-200 ease-linear
            absolute
            w-full `,
            {
              "opacity-100 -top-3  text-xs": value || (!value && errorText),
              "opacity-0 top-0 pr-1 text-sm": !value && !errorText,
              "peer-focus: text-red-600": errorText,
              "peer-focus: text-orange-500": !errorText,
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
    )
  },
)

InputField.displayName = "InputField"
export default InputField
