import {
  memo,
  useState,
  useMemo,
} from "react"
import {SliderContext} from "../../share/context/SliderContext"
import { is2DMatrix } from "./validate"
import { createSlideElements, createSlideMapMetadata } from "./creater"
import { type SliderProps, type SlideProps, type SlideMapMetadata,  type SliderComponent, type SlideId } from "./type"

// For Slider Wrap Component
export function Slide({ children }: SlideProps) {
  return <>{children}</>
}

function SliderContent({
  item2DMatrix,
  animationType = "ease-in-out",
  firstDisplayItemId,
  children,
}: SliderProps) {
  // Convert to ReactElement Array
  const slideElements = useMemo(()=>createSlideElements(children),[children])
  const slideMapMetadata: SlideMapMetadata[] = useMemo(()=>createSlideMapMetadata(item2DMatrix, slideElements),[item2DMatrix, slideElements])
  const rowCount = item2DMatrix.length
  const columnCount = item2DMatrix[0].length
  const [currentPosition, setCurrentPosition] = useState<{ x: number, y: number}>({
    x: slideMapMetadata.find((slide) => slide.id === firstDisplayItemId)?.position.x ?? 0,
    y: slideMapMetadata.find((slide) => slide.id === firstDisplayItemId)?.position.y ?? 0,
  })
  const [share, setShare] = useState<Partial<Record<string , unknown>>>({})
  const clearShare = () => {setShare({})}
  const [currentSlideId, setCurrentSlideId] = useState<SlideId>(firstDisplayItemId)

  // Return null if Slider do not contain the firstDisplayItem
  if (!item2DMatrix.some((row) => row.includes(firstDisplayItemId))) return null

  const goto = (targetId: SlideId): void => {
    const targetSlide = slideMapMetadata.find((slide) => slide.id === targetId)
    if (!targetSlide) {
      console.warn(`Slide with id ${targetId} does not exist.`)
      return
    }

    if(targetSlide.position.x !== currentPosition.x && targetSlide.position.y !== currentPosition.y){
      console.log('Slides do not place on the same row or column can not be move')
      return
    }

    // Set new position
    setCurrentPosition({ x: targetSlide.position.x, y: targetSlide.position.y})
    setCurrentSlideId(targetId)
  }

  return (
    <SliderContext.Provider value={{ goto, currentSlideId, share, setShare, clearShare }}>
      {/* Viewpoint */}
      <div className="w-full h-full overflow-hidden">
        {/* Grid */}
        <div
          className={`grid w-full h-full transition-transform duration-500 ${animationType}`}
          style={{
            gridTemplateColumns: `repeat(${columnCount}, 100%)`,
            gridTemplateRows: `repeat(${rowCount}, 100%)`,
            transform: `translate(${-currentPosition.x * 100}%, ${-currentPosition.y * 100}%)`,
          }}
        >
          {/* Screen */}
          {slideMapMetadata.map((slide) => (
            <div
              className="w-full h-full"
              key={`slide-${slide.id}`}
              style={{
                gridColumn: slide.position.x + 1,
                gridRow: slide.position.y + 1,
              }}
            >
              {slide.component}
            </div>
          ))}
        </div>
      </div>
    </SliderContext.Provider>
  )
}

function SliderBase(
  props: SliderProps,
) {
  if(!is2DMatrix(props.item2DMatrix)) return null
  return <SliderContent {...props} />
}
const Slider: SliderComponent = Object.assign(memo(SliderBase), { Slide })
export default Slider
