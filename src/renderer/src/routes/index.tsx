import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ModalRouterProvider } from '@renderer/contexts/ModalRouterContext'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'
import { ToastProvider } from '@renderer/libs/sonner'
import { blockchainReducerActions } from '@renderer/store/reducers/BlockchainReducer'

import { modalsRouter } from './modalsRouter'
import { pagesRouter } from './pagesRouter'

export const Router = () => {
  const dispatch = useAppDispatch()
  const { networkType } = useNetworkTypeSelector()

  useEffect(() => {
    dispatch(blockchainReducerActions.updateBSAggregatorNetwork(networkType))
  }, [networkType, dispatch])

  return (
    <ModalRouterProvider routes={modalsRouter}>
      <RouterProvider router={pagesRouter} />
      <ToastProvider />
    </ModalRouterProvider>
  )
}
