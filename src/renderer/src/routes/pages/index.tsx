import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from '@renderer/components/PrivateRoute'

import { SecuritySetupStep1Page } from './SecuritySetup/SecuritySetupStep1'
import { SecuritySetupStep2Page } from './SecuritySetup/SecuritySetupStep2'
import { SecuritySetupStep3Page } from './SecuritySetup/SecuritySetupStep3'
import { ContactsPage } from './Contacts'
import { LoginPage } from './Login'
import { PortfolioPage } from './Portfolio'
import { SecuritySetupPage } from './SecuritySetup'
import { SettingsPage } from './Settings'
import { WalletsPage } from './Wallets'
import { WelcomePage } from './Welcome'
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
  {
    path: '/contacts',
    element: (
      <PrivateRoute>
        <ContactsPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <PrivateRoute>
        <SettingsPage />
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
