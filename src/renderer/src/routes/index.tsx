import { RouterProvider } from 'react-router-dom'
import { ModalRouterProvider } from '@renderer/contexts/ModalRouterContext'
import { ToastProvider } from '@renderer/libs/sonner'

import { modalsRouter } from './modalsRouter'
import { pagesRouter } from './pagesRouter'

export const Router = () => {
  return (
    <ModalRouterProvider routes={modalsRouter}>
      <RouterProvider router={pagesRouter} />
      <ToastProvider />
    </ModalRouterProvider>
  )
}
