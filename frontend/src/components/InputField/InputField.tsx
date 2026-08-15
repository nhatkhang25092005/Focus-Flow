import { forwardRef, useId } from "react"
import BaseInput from "./BaseInput"
import { getMaxDate } from "./date"
import PasswordInput from "./PasswordInput"
import type { InputFieldProps } from "./types"

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      className,
      errorText,
      containerClassName,
      value,
      id,
      ...props
    },
    ref,
  ) => {
    const defaultId = useId()
    const inputId = id || defaultId
    const baseProps = {
      label,
      className,
      errorText,
      containerClassName,
      value,
      ...props,
      inputId,
    }

    if (props.type === "password") {
      return <PasswordInput ref={ref} {...baseProps} />
    }

    if (props.type === "email") {
      return <BaseInput ref={ref} {...baseProps} type="email" />
    }

    if (props.type === "date") {
      return (
        <BaseInput
          ref={ref}
          {...baseProps}
          type="date"
          alwaysShowLabel
          max={getMaxDate()}
          onClick={(event) => {
            if ("showPicker" in event.currentTarget) {
              event.currentTarget.showPicker()
            }
          }}
        />
      )
    }

    return <BaseInput ref={ref} {...baseProps} type="text" />
  },
)

InputField.displayName = "InputField"

export default InputField
