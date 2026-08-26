import { createContext, useContext, type Dispatch, type SetStateAction } from "react"
import type { SlideId } from "../../components/Slider/type"
export const SliderContext = createContext<SliderContextType | null>(null)
type SliderContextType = {
  goto: (slideId: SlideId) => void,
  share: Record<string, unknown>
  clearShare: () => void
  setShare : Dispatch<SetStateAction< Record<string, unknown>>>
  currentSlideId : SlideId
}
export function useSlider() {
  const context = useContext(SliderContext)
  if (!context) throw new Error("useSlider must be used within Slider")
  return context
}
