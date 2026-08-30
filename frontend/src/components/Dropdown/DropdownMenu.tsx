import { createContext, useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "../../utils/cn"
import '../../styles/animation.css'
type DropdownMenuProps = {
  trigger: ReactNode          // The element that opens the dropdown
  children: ReactNode         // The content of the dropdown
  align?: "start" | "end"     // Positions the dropdown on the left or right
  triggerClassName?: string
  menuClassName?: string
}

type DropdownContextValue = {
  close: () => void
}

export const DropdownMenuContext = createContext<DropdownContextValue | null>(null)

export default function DropdownMenu({
  trigger,
  children,
  align = "end",
  triggerClassName,
  menuClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event: PointerEvent) => {
      const clickedElement = event.target as Node
      if (containerRef.current && !containerRef.current.contains(clickedElement)) setOpen(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }

  }, [open])


  return (
    <div ref={containerRef} className="relative inline-flex">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className={triggerClassName}
        onClick={() => setOpen((current) => !current)}
      >
        {trigger}
      </button>

      {open && (
        <DropdownMenuContext.Provider value={{ close: () => setOpen(false) }}>
          <div
            role="menu"
            className={cn(
              "absolute top-full z-50 mt-2 min-w-40",
              "rounded-lg border border-gray-200 bg-white p-1 shadow-lg dropdown-appear",
              align === "start" ? "left-0" : "right-0",
              menuClassName,
            )}
          >
            {children}
          </div>
        </DropdownMenuContext.Provider>
      )}
    </div>
  )
}