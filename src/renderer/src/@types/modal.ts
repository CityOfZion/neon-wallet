export type THistory<T = any> = {
  name: string
  state: T
  status: 'mounted' | 'unmounted'
  id: string
}

export type TRoute = {
  element: JSX.Element
  name: string
}

export type TModalRouterContextValue = {
  navigate: (name: string | number, options?: TModalRouterContextNavigateOptions) => void
  history: THistory[]
}

export type TModalRouterProviderProps = {
  routes: TRoute[]
  children: React.ReactNode
}

export type TModalRouterContextNavigateOptions = {
  state?: any
  replace?: boolean
}
