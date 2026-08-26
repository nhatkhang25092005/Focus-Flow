import {type ReactNode } from "react"
import {Slide} from "./Slider"
export type Item2DMatrix =
  readonly (readonly (string | null)[])[]

export type SlideId=
  Exclude<Item2DMatrix[number][number],null>

export type SliderProps  = {
  item2DMatrix: Item2DMatrix
  animationType?: string
  firstDisplayItemId: SlideId
  children: ReactNode
}
export type SlideProps = {
  id: string
  children: ReactNode
}


export type SlideMapMetadata = {
  id: SlideId
  component: ReactNode
  position: { x: number; y: number }
}

export type SliderComponent = {
  (
    props: SliderProps
  ): ReactNode

  Slide: typeof Slide
}
