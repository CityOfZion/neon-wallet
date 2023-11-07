import { ComponentProps } from 'react'

export type THistory<T = undefined> = {
  name: string
  state: T extends undefined ? unknown | undefined : T
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
