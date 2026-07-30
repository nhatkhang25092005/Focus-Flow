import type { ReactNode } from "react"
import {
  useState,
  useEffect,
  useRef,
  Children,
  useCallback,
  useMemo,
} from "react"
import { useGetWidth } from "../hooks/useGetWidth"
type CarouselProperties = {
  children: ReactNode
  duration?: number
  delayTime?: number
  includeDuration?: boolean
  startIndex?: number
  width?: number | null
  className?: string | null
  height?: number | null
}
export default function Carousel({
  startIndex = 0,
  children,
  duration = 700,
  delayTime = 5000,
  includeDuration = false,
  className = "",
  width = null,
  height = null,
}: CarouselProperties) {
  const containerDivWidth = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(startIndex)
  const [enableTransition, setEnableTransition] = useState<boolean>(true)
  const slides = useMemo(() => Children.toArray(children), [children])
  const cloneSlides = useMemo(() => [...slides, slides[0]], [slides])
  const [isTabVisibility, setIsTabVisibility] = useState<boolean>(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const sliderWidth: number = useGetWidth(containerDivWidth)
  const scheduleTime = includeDuration ? delayTime - duration : delayTime

  const containerWidth: number | string = width ? width : "w-full"
  const containerHeight: number | string = height ? height : "h-full"
  useEffect(() => {
    const handleVisibilityChange = (): void => {
      const visible = !document.hidden
      setIsTabVisibility(visible)
      if (!visible && timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [])

  const scheduleNext = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    const isVisible = containerDivWidth.current?.offsetParent !== null
    if (!isVisible) return
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
    }, scheduleTime)
  }, [scheduleTime])

  const handleTranslationEnd = (): void => {
    if (currentIndex === cloneSlides.length - 1) {
      setEnableTransition(false)
      setCurrentIndex(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true)
          scheduleNext()
        })
      })
      return
    }
    scheduleNext()
  }

  useEffect(() => {
    if (!isTabVisibility) return
    scheduleNext()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isTabVisibility, scheduleNext])
  return (
    <div
      ref={containerDivWidth}
      className={
        className
          ? className
          : `flex-1 flex overflow-hidden ${containerWidth} ${containerHeight}`
      }
    >
      <div
        onTransitionEnd={handleTranslationEnd}
        className={`flex-1 h-full flex flex-row transition-transform`}
        style={{
          transitionDuration: enableTransition ? `${duration}ms` : "0ms",
          transform: `translate3d(-${sliderWidth * currentIndex}px,0,0)`,
        }}
      >
        {cloneSlides.map((child, index) => (
          <div key={index} className="w-full h-full shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
