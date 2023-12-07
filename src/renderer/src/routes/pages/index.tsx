import { Fragment } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PrivateRoute } from '@renderer/components/PrivateRoute'

import { SecuritySetupStep1Page } from './SecuritySetup/SecuritySetupStep1'
import { SecuritySetupStep2Page } from './SecuritySetup/SecuritySetupStep2'
import { SecuritySetupStep3Page } from './SecuritySetup/SecuritySetupStep3'
import { SettingsEncryptKey } from './Settings/SettingsEncryptKey'
import { SettingsPersonalisationPage } from './Settings/SettingsPersonalisation'
import { SettingsSecurityPage } from './Settings/SettingsSecurity'
import { ContactsPage } from './Contacts'
import { LoginPage } from './Login'
import { PortfolioPage } from './Portfolio'
import { SecuritySetupPage } from './SecuritySetup'
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
            element: <SettingsEncryptKey />,
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
