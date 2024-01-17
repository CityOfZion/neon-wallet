import { Fragment } from 'react'
import { PrivateRoute } from '@renderer/components/PrivateRoute'
import { createRouteHandler } from '@renderer/libs/sentryReact'

import { ContactsPage } from './pages/Contacts'
import { LoginPage } from './pages/Login'
import { PortfolioPage } from './pages/Portfolio'
import { SecuritySetupPage } from './pages/SecuritySetup'
import { SecuritySetupStep1Page } from './pages/SecuritySetup/SecuritySetupStep1'
import { SecuritySetupStep2Page } from './pages/SecuritySetup/SecuritySetupStep2'
import { SecuritySetupStep3Page } from './pages/SecuritySetup/SecuritySetupStep3'
import { SendPage } from './pages/Send'
import { SettingsEncryptKeyPage } from './pages/Settings/SettingsEncryptKey'
import { SettingsPersonalisationPage } from './pages/Settings/SettingsPersonalisation'
import { SettingsSecurityPage } from './pages/Settings/SettingsSecurity'
import { WalletsPage } from './pages/Wallets'
import { WelcomePage } from './pages/Welcome'

const routeHandler = createRouteHandler()

export const pagesRouter = routeHandler([
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
    path: '/send',
    element: (
      <PrivateRoute>
        <SendPage />
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
    children: [
      {
        path: 'personalisation?',
        element: (
          <PrivateRoute>
            <SettingsPersonalisationPage />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'network-configuration?',
            element: <Fragment />,
          },
          {
            path: 'currency',
            element: <Fragment />,
          },
          {
            path: 'language',
            element: <Fragment />,
          },
          {
            path: 'theme',
            element: <Fragment />,
          },
          {
            path: 'release-notes',
            element: <Fragment />,
          },
        ],
      },
      {
        path: 'security',
        element: (
          <PrivateRoute>
            <SettingsSecurityPage />
          </PrivateRoute>
        ),
        children: [
          {
            path: 'encrypt-key?',
            element: <SettingsEncryptKeyPage />,
          },
          {
            path: 'recover-wallet',
            element: <Fragment />,
          },
          {
            path: 'backup-wallet',
            element: <Fragment />,
          },
        ],
      },
    ],
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
