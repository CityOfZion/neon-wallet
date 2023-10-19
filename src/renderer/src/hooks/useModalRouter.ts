import { useContext } from 'react'
import { THistory } from '@renderer/@types/modal'
import { ModalRouterContext } from '@renderer/contexts/ModalRouter'

export const useModalNavigate = () => {
  const { navigate } = useContext(ModalRouterContext)
  return navigate
}

export const useModalLocation = (): THistory | undefined => {
  const { history } = useContext(ModalRouterContext)
  return history[history.length - 1]
}
