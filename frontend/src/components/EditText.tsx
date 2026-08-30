import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import Typography, { type TypographyProps } from "./text/Typography"
import { cn } from "../utils/cn"

export type EditTextProps = Omit<TypographyProps<"div">, "onChange"> & {
  onChange?: (value: string) => void
  value?: string
  inputClassName?: string
  maxLength?: number
}

export default function EditText({ 
  variant, 
  onChange, 
  value = "", 
  className, 
  inputClassName, 
  maxLength = 255,
  ...props 
}: EditTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    setIsEditing(false)
    if (localValue !== value) {
      onChange?.(localValue)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setLocalValue(value)
    }
  }

  return (
    <Typography 
      as="div"
      variant={variant}
      className={cn(
        "cursor-pointer border border-transparent rounded w-full min-w-0 overflow-hidden",
        !isEditing && "hover:border-dashed hover:border-gray-300",
        className
      )} 
      onClick={() => !isEditing && setIsEditing(true)}
      {...props}
    >
      {!isEditing ? (
        <span className="block w-full truncate">{value || " "}</span>
      ) : (
        <input
          ref={inputRef}
          type="text"
          maxLength={maxLength}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={cn(
            "w-full bg-transparent outline-none border-none p-0 m-0 min-w-0",
            "text-inherit", 
            inputClassName
          )}
          style={{ font: "inherit", letterSpacing: "inherit" }}
        />
      )}
    </Typography>
  )
}