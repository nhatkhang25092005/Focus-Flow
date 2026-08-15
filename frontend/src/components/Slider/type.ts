import {type ReactNode } from "react"
import {Slide} from "./Slider"

export type Direction = "top" | "left" | "bottom" | "right"
export type Navigation = Partial<Record<Direction, string>>
export type SliderProps = {
  item2DMatrix: (string | null)[][]
  animationType?: string
  firstDisplayItemId: string
  children: ReactNode
}
export type SlideProps = { id: string; children: ReactNode; navigation?: Navigation }
export type SliderComponent = {
  (props: SliderProps): ReactNode
  Slide: typeof Slide
}
export type SlideMapMetadata = {
  id: string
  component: ReactNode
  position: { x: number; y: number }
  navigation?: Navigation
}
