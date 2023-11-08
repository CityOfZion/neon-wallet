import { useCallback, useContext, useRef } from 'react'
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

export const useModalLocation = <T>(): THistory<T> => {
  const { history } = useContext(ModalRouterContext)
  const index = useRef(history.length - 1)

  const location = history[index.current]

  if (!location) {
    throw new Error('useModalLocation must be used within a ModalRouter')
  }

  return location as THistory<T>
}
