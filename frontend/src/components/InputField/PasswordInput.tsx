import { forwardRef, useState } from "react"
import BaseInput from "./BaseInput"
import type { BaseInputProps } from "./types"
import { cn } from "../../utils/cn"

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      {open ? (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
          <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c6.5 0 10 8 10 8a17.6 17.6 0 0 1-2.1 3.2" />
          <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 8 10 8a9.8 9.8 0 0 0 4.1-.9" />
        </>
      )}
    </svg>
  )
}

const PasswordInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (props, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    return (
      <div className="relative">
        <BaseInput
          ref={ref}
          {...props}
          className={cn(
            "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
            props.className,
          )}
          type={isPasswordVisible ? "text" : "password"}
        />

        {/* Using div instead of button because I don't want this eye button can not
be tab and focus
*/}
        <div
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          aria-pressed={isPasswordVisible}
          onClick={() => setIsPasswordVisible((visible) => !visible)}
          className="absolute right-5 bottom-2.5 cursor-pointer
            transition-transform duration-200 ease-out
            hover:scale-110 active:scale-90"
        >
          <EyeIcon open={isPasswordVisible} />
        </div>
      </div>
    )
  },
)

PasswordInput.displayName = "PasswordInput"

export default PasswordInput
