import type { MutableRefObject } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@renderer/@types/store'

export default function useSelectorRef<T = unknown>(selectHandler: (state: RootState) => T): MutableRefObject<T> {
  const ref = useRef<T>()

  useSelector(selectHandler, (_, next) => {
    ref.current = next
    return true
  })

  return ref as MutableRefObject<T>
}
