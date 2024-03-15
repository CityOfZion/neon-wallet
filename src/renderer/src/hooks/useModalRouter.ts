import { useCallback, useContext, useMemo, useRef } from 'react'
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
  const currentHistoryId = useRef<string>(history[history.length - 1].id)

  const state = useMemo(() => {
    return (history.find(item => item.id === currentHistoryId.current)?.state ?? {}) as T
  }, [history])

  return state
}

export const useModalHistory = () => {
  const { history } = useContext(ModalRouterContext)

  return history
}
