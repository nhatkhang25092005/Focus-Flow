import { useEffect, useState, type RefObject } from "react"

export function useGetWidth<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
): number {
  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    const updateTargetWidth = () => {
      if (!targetRef.current) return
      setWidth(targetRef.current.offsetWidth)
    }

    updateTargetWidth()
    window.addEventListener("resize", updateTargetWidth)
    return () => removeEventListener("resize", updateTargetWidth)
  }, [targetRef])

  return width
}
