import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  THistory,
  TModalRouterContextNavigateOptions,
  TModalRouterContextValue,
  TModalRouterProviderProps,
} from '@renderer/@types/modal'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
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

  const renderRoutes = useMemo(
    () =>
      history.filter(item => item.status === 'mounted').map(item => routes.find(route => route.name === item.name)!),
    [history, routes]
  )

  const navigate = useCallback(
    (name: string | number, options?: TModalRouterContextNavigateOptions) => {
      if (typeof name === 'string') {
        const routeExist = routes.find(route => route.name === name)
        if (!routeExist) {
          throw new Error(`Route not found: ${name}`)
        }

        setHistory(prevState => {
          const lastMountedItem = prevState.reverse().find(item => item.status === 'mounted')
          if (lastMountedItem && lastMountedItem.name === name) {
            return prevState.map(item => (item.id === lastMountedItem.id ? { ...item, state: options?.state } : item))
          }

          const newHistory: THistory = { name, state: options?.state, status: 'mounted', id: UtilsHelper.uuid() }
          if (options?.replace) {
            return [...prevState.slice(0, -1), newHistory]
          }

          return [...prevState, newHistory]
        })
        return
      }

      if (name >= 0) {
        throw new Error('Number is only allowed to go back in history')
      }

      setHistory(prevState =>
        prevState.map((item, index) => (index < prevState.length + name ? item : { ...item, status: 'unmounted' }))
      )
    },
    [routes]
  )

  const removeUnmounted = useCallback(() => {
    setHistory(prevState => prevState.filter(item => item.status === 'mounted'))
  }, [])

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

      <AnimatePresence onExitComplete={removeUnmounted}>
        {renderRoutes.map((route, index) => {
          return <ModalPortal key={`${route.name}-${index}`}>{route.element}</ModalPortal>
        })}
      </AnimatePresence>
    </ModalRouterContext.Provider>
  )
}
