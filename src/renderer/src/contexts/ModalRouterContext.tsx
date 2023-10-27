import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { THistory, TModalRouterContextValue, TModalRouterProviderProps } from '@renderer/@types/modal'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type ModalProps = {
  children: React.ReactNode
  onClose: (name: string) => void
  history: THistory
}

const Modal = ({ children, onClose, history }: ModalProps) => {
  const { closeOnEsc, closeOnOutsideClick, className, ...props } = history.props ?? {}

  const containerRef = useRef<HTMLDivElement>(null)

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
  }

  const handleModalClick = () => {
    if (closeOnOutsideClick === false) {
      return
    }

    onClose(history.name)
  }

  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (closeOnEsc === false || event.key !== 'Escape') {
      return
    }

    onClose(history.name)
  }

  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  return (
    <div
      className={StyleHelper.mergeStyles(
        'fixed left-0 top-0 w-screen h-screen flex justify-end bg-gray-black/50 backdrop-blur-sm',
        className
      )}
      onClick={handleModalClick}
      onKeyDown={handleModalKeyDown}
      ref={containerRef}
      tabIndex={0}
      {...props}
    >
      <div onClick={handleContentClick} onKeyDown={handleModalKeyDown} className="h-full">
        {children}
      </div>
    </div>
  )
}

const ModalPortal = (props: ModalProps) => {
  const modalRoot = document.querySelector('body') as HTMLBodyElement
  return createPortal(<Modal {...props} />, modalRoot)
}

export const ModalRouterContext = createContext<TModalRouterContextValue>({} as TModalRouterContextValue)

export const ModalRouterProvider = ({ routes, children }: TModalRouterProviderProps) => {
  const [history, setHistory] = useState<THistory[]>([])

  const setNonRepeatedHistoryElement = useCallback((newHistory: THistory) => {
    setHistory(prevState => {
      const prevStateFiltered = prevState.filter(item => item.name !== newHistory.name)

      return [...prevStateFiltered, newHistory]
    })
  }, [])

  const navigate = useCallback(
    (name: string | number, options?: Omit<THistory, 'name'>) => {
      if (typeof name === 'string') {
        const routeExist = routes.some(route => route.name === name)
        if (!routeExist) {
          throw new Error(`Route not found: ${name}`)
        }

        return setNonRepeatedHistoryElement({ name, ...options })
      }

      if (name >= 0) {
        const routeElement = routes[name]
        if (!routeElement) {
          throw new Error(`Route not found: ${name}`)
        }

        return setNonRepeatedHistoryElement(routeElement)
      }

      setHistory(prevState => prevState.slice(0, name))
      return
    },
    [setNonRepeatedHistoryElement, routes]
  )

  const getElementByHistory = (historyElement: THistory) => {
    const route = routes.find(route => route.name === historyElement.name)
    if (!route) {
      throw new Error(`Route not found: ${historyElement.name}`)
    }

    return route.element
  }

  const handleClose = () => {
    navigate(-1)
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

      {history.map(item => (
        <ModalPortal key={item.name} onClose={handleClose} history={item}>
          {getElementByHistory(item)}
        </ModalPortal>
      ))}
    </ModalRouterContext.Provider>
  )
}
