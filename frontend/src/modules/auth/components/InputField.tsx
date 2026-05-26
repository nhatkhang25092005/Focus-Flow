import type { InputHTMLAttributes, ReactNode } from "react"

type InputFieldParams = InputHTMLAttributes<HTMLInputElement> & {
  label: string,
  children?: ReactNode
  containerClassName?: string
}

export default function InputField({
  label,
  children,
  className,
  containerClassName,
  ...props
}: InputFieldParams) {
  return (
    <div className={`flex flex-col ${containerClassName ?? ""}`}>
      <label id={props.id} htmlFor="emailInput" className="text-lg font-bold">
        {label}
        {props.required ? <span className="text-red-700 ml-2">*</span> : null}
      </label>

      <input
        {...props}
        className={`border h-10 rounded-xl px-3 text-xs w-full ${className ?? ""}`}
      />
      {children}
    </div>
  )
}
