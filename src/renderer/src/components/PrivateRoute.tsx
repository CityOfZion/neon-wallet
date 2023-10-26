import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '@renderer/@types/store'

export const PrivateRoute = ({ children }) => {
  const securityType = useSelector((state: RootState) => state.settings.securityType)
  const encryptedPassword = useSelector((state: RootState) => state.settings.encryptedPassword)

  const location = useLocation()

  if (securityType === 'password' && encryptedPassword) {
    return children
  }

  return <Navigate to={'/login'} state={{ from: location.pathname }} />
}
