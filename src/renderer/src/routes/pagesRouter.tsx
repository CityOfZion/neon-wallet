import { Fragment } from 'react'
import { redirect } from 'react-router-dom'
import { PrivateRoute } from '@renderer/components/PrivateRoute'
import { createRouteHandler } from '@renderer/libs/sentryReact'

import { ContactsPage } from './pages/Contacts'
import { LoginPage } from './pages/Login'
import { PortfolioPage } from './pages/Portfolio'
import { PortfolioActivityPage } from './pages/Portfolio/Activity'
import { PortfolioOverviewPage } from './pages/Portfolio/Overview'
import { ReceiveYourAddress } from './pages/Receive'
import { SecuritySetupPage } from './pages/SecuritySetup'
import { SecuritySetupStep1Page } from './pages/SecuritySetup/SecuritySetupStep1'
import { SecuritySetupStep2Page } from './pages/SecuritySetup/SecuritySetupStep2'
import { SecuritySetupStep3Page } from './pages/SecuritySetup/SecuritySetupStep3'
import { SendPage } from './pages/Send'
import { SettingsPage } from './pages/Settings'
import { SettingsEncryptKeyPage } from './pages/Settings/SettingsEncryptKey'
import { SettingsNetwork } from './pages/Settings/SettingsNetwork'
import { SettingsReleaseNotesPage } from './pages/Settings/SettingsReleaseNotes'
import { WalletsPage } from './pages/Wallets'
import { WelcomePage } from './pages/Welcome'

const routeHandler = createRouteHandler()

export const pagesRouter = routeHandler([
  {
    path: '/',
    loader: async () => redirect('/portfolio'),
  },
  {
    path: '/portfolio',
    element: (
      <PrivateRoute>
        <PortfolioPage />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        loader: async () => redirect('/portfolio/overview'),
      },
      {
        path: 'overview',
        element: <PortfolioOverviewPage />,
      },
      {
        path: 'activity',
        element: <PortfolioActivityPage />,
      },
    ],
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
    path: '/receive',
    element: (
      <PrivateRoute>
        <ReceiveYourAddress />
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
    children: [
      {
        path: 'personalisation?',
        children: [
          {
            path: 'network-configuration?',
            element: <SettingsNetwork />,
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
            element: <SettingsReleaseNotesPage />,
          },
        ],
      },
      {
        path: 'security',
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
