import { cn } from "../../utils/cn"

type HighlightStateProps = {
  errorText?: string
}

export default function HighlightState({ errorText }: HighlightStateProps) {
  return (
    <span
      className={cn(
        `absolute bottom-0 w-0 h-0.5
        transition-all duration-500 ease-in-out`,
        {
          "w-full bg-red-500": errorText,
          "peer-focus:w-full bg-orange-500": !errorText,
        },
      )}
    />
  )
}
