import { useCallback, useContext } from 'react'
import { THistory } from '@renderer/@types/modal'
import { ModalRouterContext } from '@renderer/contexts/ModalRouterContext'

export const useModalNavigate = () => {
  const { navigate: modalNavigate } = useContext(ModalRouterContext)

  const modalNavigateWrapper = useCallback(
    (name: string | number, options?: Omit<THistory, 'name'> | undefined) => {
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

export const useModalLocation = (): THistory | undefined => {
  const { history } = useContext(ModalRouterContext)
  return history[history.length - 1]
}
