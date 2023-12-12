import { useCallback, useContext, useMemo } from 'react'
import { TModalRouterContextNavigateOptions } from '@renderer/@types/modal'
import { ModalRouterContext } from '@renderer/contexts/ModalRouterContext'

export const useModalNavigate = () => {
  const { navigate: modalNavigate } = useContext(ModalRouterContext)

  const modalNavigateWrapper = useCallback(
    (name: string | number, options?: TModalRouterContextNavigateOptions) => {
      return () => {
        modalNavigate(name, options)
      }
    },
    [modalNavigate]
  )

  return {
    modalNavigate,
    modalNavigateWrapper,
  }
}

export const useModalState = <T = any>(): T => {
  const { history } = useContext(ModalRouterContext)

  const state = useMemo(() => {
    return (history[history.length - 1].state ?? {}) as T
    // It is intentional not to add history to the dependencies array, because I don't want to update the ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}

export const useModalHistory = () => {
  const { history } = useContext(ModalRouterContext)

  return history
}
