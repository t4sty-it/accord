import { useEffect, useRef } from "react";

export function useInterval(cb: () => void, interval: number) {
  const timer = useRef<Timer>()

  const cancel = () => {
    if (timer.current != null)
        clearInterval(timer.current)
  }

  useEffect(() => {
    if (timer.current == null) {
      timer.current = setInterval(cb, interval)
    }

    return () => {
      if (timer.current != null)
        clearInterval(timer.current)
    }
  }, [])

  return cancel
}