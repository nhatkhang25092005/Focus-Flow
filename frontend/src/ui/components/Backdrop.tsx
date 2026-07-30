import React from "react"
type BackdropProps = {
  isOpen?: boolean
  children?: React.ReactNode
  duration?: number
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}
export default function Backdrop({
  children,
  isOpen = false,
  duration = 0,
  onClick,
}: BackdropProps) {
  return (
    <div
      style={{
        transitionDuration: `${duration}ms`,
      }}
      className={`z-50 transition-opacity bg-black/30 fixed inset-0 flex items-center justify-center ${isOpen ? " block opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
