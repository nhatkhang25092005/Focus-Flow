import { type ReactNode, useContext } from "react"
import { cn } from "../../utils/cn"
import { DropdownMenuContext } from "./DropdownMenu"

type DropdownMenuItemProps = {
  children: ReactNode
  onSelect?: () => void
  className?: string
}

export default function DropdownMenuItem({
  children,
  onSelect,
  className,
}: DropdownMenuItemProps) {
  const menu = useContext(DropdownMenuContext)

  if (!menu) {
    throw new Error(
      "DropdownMenuItem must be used inside DropdownMenu",
    )
  }

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2",
        "text-left text-sm text-gray-700",
        "transition-colors hover:bg-gray-100",
        "cursor-pointer",
        className,
      )}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onSelect?.()
        menu.close()
      }}
    >
      {children}
    </button>
  )
}