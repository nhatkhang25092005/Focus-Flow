import type { InputHTMLAttributes, ReactNode } from "react"

export type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  errorText?: string
  children?: ReactNode
  alwaysShowLabel?:boolean,
  containerClassName?: string
}

export type BaseInputProps = InputFieldProps & {
  inputId: string
}
