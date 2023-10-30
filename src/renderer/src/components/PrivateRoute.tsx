import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '@renderer/@types/store'
import { useAppSelector } from '@renderer/hooks/useRedux'

export const PrivateRoute = ({ children }) => {
  const securityType = useAppSelector((state: RootState) => state.settings.securityType)
  const encryptedPassword = useAppSelector((state: RootState) => state.settings.encryptedPassword)

  const location = useLocation()

  if (securityType === 'password' && encryptedPassword) {
    return children
  }

  return <Navigate to={'/login'} state={{ from: location.pathname }} />
}
