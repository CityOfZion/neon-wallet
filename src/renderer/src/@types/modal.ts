import { ComponentProps } from 'react'

export type THistory = {
  name: string
  state?: unknown
  props?: {
    closeOnOutsideClick?: boolean
    closeOnEsc?: boolean
  } & ComponentProps<'div'>
}

export type TRoute = {
  element: React.ReactNode
  name: string
}

export type TModalRouterContextValue = {
  navigate: (name: string | number, options?: Omit<THistory, 'name'>) => void
  history: THistory[]
}

export type TModalRouterProviderProps = {
  routes: TRoute[]
  children: React.ReactNode
}
