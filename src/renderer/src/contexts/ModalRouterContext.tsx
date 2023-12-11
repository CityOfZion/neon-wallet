import { createContext, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  THistory,
  TModalRouterContextNavigateOptions,
  TModalRouterContextValue,
  TModalRouterProviderProps,
} from '@renderer/@types/modal'
import { AnimatePresence } from 'framer-motion'

type TModalPortalProps = {
  children: React.ReactNode
}
const ModalPortal = ({ children }: TModalPortalProps) => {
  const modalRoot = document.querySelector('body') as HTMLBodyElement
  return createPortal(children, modalRoot)
}

export const ModalRouterContext = createContext<TModalRouterContextValue>({} as TModalRouterContextValue)

export const ModalRouterProvider = ({ routes, children }: TModalRouterProviderProps) => {
  const [history, setHistory] = useState<THistory[]>([])

  const navigate = useCallback(
    (name: string | number, options?: TModalRouterContextNavigateOptions) => {
      if (typeof name === 'string') {
        const routeExist = routes.find(route => route.name === name)
        if (!routeExist) {
          throw new Error(`Route not found: ${name}`)
        }

        setHistory(prevState => {
          if (options?.replace) {
            return [...prevState.slice(0, -1), { name, state: options?.state }]
          }

          return [...prevState, { name, state: options?.state }]
        })
        return
      }

      if (name >= 0) {
        throw new Error('Number is only allowed to go back in history')
      }

      setHistory(prevState => prevState.slice(0, name))
    },
    [routes]
  )

  const getRouteByHistory = (historyElement: THistory) => {
    const route = routes.find(route => route.name === historyElement.name)
    if (!route) {
      throw new Error(`Route not found: ${historyElement.name}`)
    }

    return route
  }

  useEffect(() => {
    const names = routes.map(route => route.name)
    const uniqueNames = new Set(names)
    if (names.length !== uniqueNames.size) {
      throw new Error('Route names must be unique')
    }
  }, [routes])

  return (
    <ModalRouterContext.Provider value={{ navigate, history }}>
      {children}

      <AnimatePresence>
        {history.map(item => {
          const route = getRouteByHistory(item)
          const { element } = route

          return <ModalPortal key={item.name}>{element}</ModalPortal>
        })}
      </AnimatePresence>
    </ModalRouterContext.Provider>
  )
}
