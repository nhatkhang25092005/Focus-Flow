import { createContext, useContext } from "react"
export const SliderContext = createContext<SliderContextType | null>(null)
type SliderContextType = { goto: (direction: 'top' | 'left' | 'bottom' | 'right') => void }
export function useSlider() {
  const context = useContext(SliderContext)
  if (!context) throw new Error("useSlider must be used within Slider")
  return context
}