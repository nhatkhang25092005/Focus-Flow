import type { ReactNode } from "react"

type CardProps = {
  className?: string
  children?: ReactNode
}
export default function Card({ className, children }: CardProps) {
  return (
    <section className = {className}>
      <div className='p-3 w-full border rounded-lg border-[#21383E]/15 shadow-xl'>
        {children}
      </div>
    </section>
  )
}