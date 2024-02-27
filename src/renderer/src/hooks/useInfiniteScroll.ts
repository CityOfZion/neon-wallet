import { useRef } from 'react'

export const useInfiniteScroll = <T extends HTMLElement>(fetchCallback: () => Promise<void> | void) => {
  const ref = useRef<T>(null)

  const handleScroll = async () => {
    const element = ref.current
    if (!element) return

    const { scrollTop, clientHeight, scrollHeight } = element
    if (scrollHeight - scrollTop - clientHeight < 250) {
      fetchCallback()
    }
  }

  return { handleScroll, ref }
}
