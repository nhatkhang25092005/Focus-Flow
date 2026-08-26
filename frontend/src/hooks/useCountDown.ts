import { useEffect, useState } from "react"

export function useCountDown(initialTime: number) {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    if(!isRunning) return

    if (time <= 0) {
      setIsRunning(false)
      return
    }

    const timeout = setTimeout(() => {
      setTime(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [time, isRunning])


  const stopCountdown = () => {
    setIsRunning(false)
  }

  const startCountdown = () => {
    setIsRunning(true)
  }

  const restartCountdown = () => {
    setTime(initialTime)
    startCountdown()
  }

  return { time, isRunning, stopCountdown, startCountdown, restartCountdown }
}