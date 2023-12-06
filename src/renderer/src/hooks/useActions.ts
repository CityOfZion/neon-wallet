import { FormEvent, MouseEvent, useCallback, useRef, useState } from 'react'
import { cloneDeep, set } from 'lodash'

type TActionData = Record<string, any>

type TActionErrors<T> = Record<keyof T, string | undefined>

type TChangedControl<T> = Record<keyof T, boolean>

type TActionState<T> = {
  isValid: boolean
  isActing: boolean
  errors: TActionErrors<T>
}

const initialState = {
  isValid: false,
  isActing: false,
  errors: {} as any,
  changed: {} as any,
}

export const useActions = <T extends TActionData>(initialData: T) => {
  const [actionData, setPrivateActionData] = useState<T>(initialData)
  const [actionState, setPrivateActionState] = useState<TActionState<T>>(initialState)

  const changedControlRef = useRef<TChangedControl<T>>({} as TChangedControl<T>)

  const actionDataRef = useRef<T>(initialData)
  const actionStateRef = useRef<TActionState<T>>(initialState)

  const setState = useCallback(
    (values: Partial<TActionState<T>> | ((prev: TActionState<T>) => Partial<TActionState<T>>)) => {
      let newValues: Partial<TActionState<T>>

      if (typeof values === 'function') {
        newValues = values(actionStateRef.current)
      } else {
        newValues = values
      }

      setPrivateActionState(prev => ({ ...prev, ...newValues }))
      actionStateRef.current = { ...actionStateRef.current, ...newValues }
    },
    []
  )

  const verifyIsValid = useCallback(() => {
    const dataKeys = Object.keys(actionDataRef.current) as (keyof T)[]
    const everyKeyIsChanged = dataKeys.every(key => changedControlRef.current[key] === true)
    if (!everyKeyIsChanged) {
      setState({ isValid: false })
      return
    }

    const hasSomeError = Object.keys(actionStateRef.current.errors).length > 0
    if (hasSomeError) {
      setState({ isValid: false })
      return
    }

    setState({ isValid: true })
  }, [setState])

  const setData = useCallback(
    (values: Partial<T> | ((prev: T) => Partial<T>)) => {
      let newValues: Partial<T>

      if (typeof values === 'function') {
        newValues = values(actionDataRef.current)
      } else {
        newValues = values
      }

      setPrivateActionData({ ...actionDataRef.current, ...newValues })
      actionDataRef.current = { ...actionDataRef.current, ...newValues }

      Object.keys(newValues).forEach(key => {
        set(changedControlRef.current, key, true)
      })

      verifyIsValid()
    },
    [verifyIsValid]
  )

  const setError = useCallback(
    (key: keyof T, error: string) => {
      setState(prev => ({ errors: { ...prev.errors, [key]: error } }))
      verifyIsValid()
    },
    [setState, verifyIsValid]
  )

  const clearErrors = useCallback(
    (key?: keyof T) => {
      if (Object.keys(actionStateRef.current.errors).length === 0) return

      let newErrors = {} as TActionErrors<T>

      if (key) {
        newErrors = cloneDeep(actionStateRef.current.errors)
        delete newErrors[key]
      }

      setState({ errors: newErrors })
      verifyIsValid()
    },
    [setState, verifyIsValid]
  )

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

  const reset = useCallback(() => {
    setPrivateActionData(initialData)
    setPrivateActionState(initialState)
    actionDataRef.current = initialData
    actionStateRef.current = initialState
  }, [initialData])

  return { actionData, setData, setError, clearErrors, actionState, handleAct, reset }
}
