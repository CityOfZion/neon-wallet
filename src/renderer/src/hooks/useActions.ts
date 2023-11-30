import { FormEvent, MouseEvent, useCallback, useRef, useState } from 'react'

type TActionData = Record<string, any>

type TActionErrors<T> = Record<keyof T, string | undefined>

type TActionState<T> = {
  isValid: boolean
  isActing: boolean
  errors: TActionErrors<T>
}

const initialState = {
  isValid: false,
  isActing: false,
  errors: {} as any,
}

export const useActions = <T extends TActionData>(initialData: T) => {
  const [actionData, setPrivateActionData] = useState<T>(initialData)
  const [actionState, setPrivateActionState] = useState<TActionState<T>>(initialState)

  const actionDataRef = useRef<T>(initialData)
  const actionStateRef = useRef<TActionState<T>>(initialState)

  const setData = useCallback((values: Partial<T> | ((prev: T) => Partial<T>)) => {
    let newValues = values
    if (typeof values === 'function') {
      newValues = values(actionDataRef.current)
    }

    setPrivateActionData({ ...actionDataRef.current, ...newValues })
    actionDataRef.current = { ...actionDataRef.current, ...newValues }

    if (Object.keys(actionStateRef.current.errors).length === 0) {
      setPrivateActionState(prev => ({ ...prev, isValid: true }))
    }
  }, [])

  const setError = useCallback((key: keyof T, error?: string) => {
    setPrivateActionState(prev => ({ ...prev, isValid: false, errors: { ...prev.errors, [key]: error } }))
  }, [])

  const clearErrors = useCallback(() => {
    setPrivateActionState(prev => ({ ...prev, errors: {} as TActionErrors<T>, isValid: true }))
  }, [])

  const handleAct = useCallback((callback: (data: T) => void | Promise<void>) => {
    return async (event: FormEvent | MouseEvent) => {
      event.preventDefault()

      try {
        setPrivateActionState(prev => ({ ...prev, isActing: true }))
        await callback(actionDataRef.current)
      } finally {
        setPrivateActionState(prev => ({ ...prev, isActing: false }))
      }
    }
  }, [])

  return { actionData, setData, setError, clearErrors, actionState, handleAct }
}
