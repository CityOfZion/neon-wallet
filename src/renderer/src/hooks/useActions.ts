import { ChangeEvent, FormEvent, MouseEvent, useCallback, useMemo, useRef, useState } from 'react'
import {
  TUseActionsActionState,
  TUseActionsChanged,
  TUseActionsData,
  TUseActionsErrors,
  TUseActionsKeysMatching,
} from '@renderer/@types/hooks'
import { cloneDeep } from 'lodash'

export const useActions = <T extends TUseActionsData>(initialData: T) => {
  const initialState = useMemo(() => {
    const initialDataKeys = Object.keys(initialData) as (keyof T)[]

    return {
      isValid: false,
      isActing: false,
      errors: {} as TUseActionsErrors<T>,
      changed: initialDataKeys.reduce(
        (acc, key) => ({ ...acc, [key]: !!initialData[key] }),
        {} as TUseActionsChanged<T>
      ),
    }
  }, [initialData])

  const [actionData, setPrivateActionData] = useState<T>(initialData)
  const [actionState, setPrivateActionState] = useState<TUseActionsActionState<T>>(initialState)

  const actionDataRef = useRef<T>(actionData)
  const actionStateRef = useRef<TUseActionsActionState<T>>(actionState)
  console.log(actionState)

  const setState = useCallback(
    (
      values:
        | Partial<TUseActionsActionState<T>>
        | ((prev: TUseActionsActionState<T>) => Partial<TUseActionsActionState<T>>)
    ) => {
      let newValues: Partial<TUseActionsActionState<T>>

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

  const checkIsValid = useCallback(() => {
    const hasSomeError = Object.keys(actionStateRef.current.errors).length > 0
    const hasSomeNotChanged = Object.values(actionStateRef.current.changed).some(value => value !== true)
    if (hasSomeError || hasSomeNotChanged) {
      setState({ isValid: false })
      return
    }

    setState({ isValid: true })
  }, [setState])

  const clearErrors = useCallback(
    (key?: keyof T | (keyof T)[]) => {
      let newErrors = {} as TUseActionsErrors<T>
      const keys = key ? (Array.isArray(key) ? key : [key]) : undefined

      if (keys) {
        newErrors = cloneDeep(actionStateRef.current.errors)
        keys.forEach(k => {
          delete newErrors[k]
        })
      }

      setState({ errors: newErrors })
      checkIsValid()
    },
    [setState, checkIsValid]
  )

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

      setState(prev => ({
        changed: {
          ...prev.changed,
          ...Object.keys(newValues).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Record<keyof T, boolean>),
        },
      }))

      clearErrors(Object.keys(newValues) as (keyof T)[])
    },
    [clearErrors, setState]
  )

  const setDataFromEventWrapper = useCallback(
    (key: TUseActionsKeysMatching<T, string>) => {
      return (event: ChangeEvent) => {
        if (typeof (event.target as any).value !== 'string') throw new Error('Invalid event')
        setData({ [key]: (event.target as any).value } as Partial<T>)
      }
    },
    [setData]
  )

  const setError = useCallback(
    (key: keyof T, error: string) => {
      setState(prev => ({ errors: { ...prev.errors, [key]: error } }))
      checkIsValid()
    },
    [setState, checkIsValid]
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
  }, [initialData, initialState])

  return { actionData, setData, setError, setDataFromEventWrapper, clearErrors, actionState, handleAct, reset }
}
