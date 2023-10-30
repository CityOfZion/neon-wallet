import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from '@renderer/components/PrivateRoute'
import { LoginPage } from '@renderer/pages/Login'
import { PortfolioPage } from '@renderer/pages/Portfolio'
import { SecuritySetupPage } from '@renderer/pages/SecuritySetup'
import { SecuritySetupStep1Page } from '@renderer/pages/SecuritySetup/SecuritySetupStep1'
import { SecuritySetupStep2Page } from '@renderer/pages/SecuritySetup/SecuritySetupStep2'
import { SecuritySetupStep3Page } from '@renderer/pages/SecuritySetup/SecuritySetupStep3'
import { WalletsPage } from '@renderer/pages/Wallets'
import { WelcomePage } from '@renderer/pages/Welcome'

export const pageRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <PortfolioPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/wallets',
    element: (
      <PrivateRoute>
        <WalletsPage />
      </PrivateRoute>
    ),
  },
  { path: '/welcome', element: <WelcomePage /> },
  {
    path: '/security-setup',
    element: <SecuritySetupPage />,
    children: [
      {
        path: '1?',
        element: <SecuritySetupStep1Page />,
      },
      {
        path: '2',
        element: <SecuritySetupStep2Page />,
      },
      {
        path: '3',
        element: <SecuritySetupStep3Page />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
