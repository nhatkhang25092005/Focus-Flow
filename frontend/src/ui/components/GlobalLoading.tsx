import Backdrop from "./Backdrop"
import { useEffect, useState } from "react"
import AnimateText from "./AnimateText"
import type { LoadingState } from "../type"

export default function GlobalLoading({ isLoading, message }: LoadingState) {
  const [displayMessage, setDisplayMessage] = useState<string>(
    message || "Loading...",
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (isLoading) {
      setDisplayMessage(message || "")
    }
  }, [isLoading])

  return (
    <Backdrop isOpen={isLoading} duration={200}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 animate-spin border-t-amber-500" />
        <AnimateText text={displayMessage} textColor="white" />
      </div>
    </Backdrop>
  )
}
