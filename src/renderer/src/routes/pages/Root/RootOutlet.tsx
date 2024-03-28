import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { accountReducerActions } from '@renderer/store/reducers/AccountReducer'

export const RootOutlet = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(accountReducerActions.removeAllPendingTransactions())
  }, [dispatch])

  return <Outlet />
}
