import { Children, isValidElement, type ReactElement, type ReactNode } from "react"
import { Slide } from "./Slider"
import {
  type Item2DMatrix,
  type SlideId,
  type SlideProps,
  type SlideMapMetadata,
} from "./type"

export const createSlideElements = (children: ReactNode): ReactElement<SlideProps>[] => {
  const slideElements = Children.toArray(children).filter(
    (child): child is ReactElement<SlideProps> =>
      isValidElement(child) && child.type === Slide,
  )
  if (slideElements.length !== Children.toArray(children).length)
    console.warn("The children of Slider must be a Slide component")
  return slideElements
}

export const createSlideMapMetadata = <const TMatrix extends Item2DMatrix>(
  item2DMatrix: TMatrix,
  slideElements: ReactElement<SlideProps>[],
): SlideMapMetadata[] => {
  const slideRegistry = new Map<string, ReactElement<SlideProps>>()
  for (const slide of slideElements) {
    if(slideRegistry.has(slide.props.id)) {
      console.warn(`Duplicate Slide id ${slide.props.id} found. Only the first one will be used.`)
      continue
    }
    slideRegistry.set(slide.props.id, slide)
  }
  const slideMapMetadata: SlideMapMetadata[] = []
  for (let y = 0; y < item2DMatrix.length; y++) {
    for (let x = 0; x < item2DMatrix[0].length; x++) {
      const slideId = item2DMatrix[y][x]
      if (slideId == null) continue
      const slide = slideRegistry.get(slideId)
      if (!slide) {
        console.warn(`Slide with id ${slideId} exists but isn't referenced by the matrix.`)
        continue
      }
      slideMapMetadata.push({
        id: slideId as SlideId,
        component: slide.props.children,
        position: { x, y },
      })
    }
  }

  return slideMapMetadata
}
