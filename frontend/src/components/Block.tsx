import type { ReactNode } from "react"

type BlockProps = {
  className?: string
  children?: ReactNode
}
export default function Block({ className, children }: BlockProps) {
  return (
    <section className = {className}>
      <div className='p-3 w-full border rounded-lg border-[#21383E]/15'>
        {children}
      </div>
    </section>
  )
}