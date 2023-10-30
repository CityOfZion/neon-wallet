import type { MutableRefObject } from 'react'
import { useRef } from 'react'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@renderer/@types/store'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function useAppSelectorRef<T = unknown>(selectHandler: (state: RootState) => T): MutableRefObject<T> {
  const ref = useRef<T>()

  useSelector(selectHandler, (_, next) => {
    ref.current = next
    return true
  })

  return ref as MutableRefObject<T>
}
