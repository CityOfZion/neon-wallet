import type { MutableRefObject } from 'react'
import { useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@renderer/@types/store'

export const useAppDispatch: () => AppDispatch = useDispatch

export function useAppSelector<T = unknown>(
  selectHandler: (state: RootState) => T
): { value: T; ref: MutableRefObject<T> } {
  const ref = useRef<T>()

  const value = useSelector(selectHandler, (old, next) => {
    ref.current = next
    return shallowEqual(old, next)
  })

  return { value, ref: ref as MutableRefObject<T> }
}
