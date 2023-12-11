import { DependencyList, useEffect, useRef, useState } from 'react'

export const useMount = (
  effect: () => void | Promise<void>,
  changingStateVars?: DependencyList,
  delay: number = 500
) => {
  const [isMounting, setIsMounting] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsMounting(true)
    timeoutRef.current = setTimeout(async () => {
      try {
        await effect()
      } finally {
        setIsMounting(false)
      }
    }, delay)

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, changingStateVars)

  return { isMounting }
}
