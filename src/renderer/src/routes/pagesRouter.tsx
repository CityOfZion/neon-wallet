import { Fragment } from 'react'
import { redirect } from 'react-router-dom'
import { PrivateRoute } from '@renderer/components/PrivateRoute'
import { createRouteHandler } from '@renderer/libs/sentryReact'

import { ContactsPage } from './pages/Contacts'
import { LoginPage } from './pages/Login'
import { PortfolioPage } from './pages/Portfolio'
import { PortfolioActivityPage } from './pages/Portfolio/Activity'
import { PortfolioConnectionsPage } from './pages/Portfolio/Connections'
import { PortfolioOverviewPage } from './pages/Portfolio/Overview'
import { ReceiveYourAddress } from './pages/Receive'
import { SendPage } from './pages/Send'
import { SettingsPage } from './pages/Settings'
import { SettingsEncryptKeyPage } from './pages/Settings/SettingsEncryptKey'
import { SettingsNetwork } from './pages/Settings/SettingsNetwork'
import { SettingsReleaseNotesPage } from './pages/Settings/SettingsReleaseNotes'
import { WalletsPage } from './pages/Wallets'
import { AccountConnections } from './pages/Wallets/AccountConnection'
import { AccountNftList } from './pages/Wallets/AccountNftList'
import { AccountOverview } from './pages/Wallets/AccountOverview'
import { AccountTokensList } from './pages/Wallets/AccountTokensList'
import { AccountTransactionsList } from './pages/Wallets/AccountTransactionsList'
import { WelcomePage } from './pages/Welcome'
import { WelcomeImportWalletPage } from './pages/WelcomeImportWallet'
import { WelcomeImportWalletStep1Page } from './pages/WelcomeImportWallet/Step1'
import { WelcomeImportWalletStep2Page } from './pages/WelcomeImportWallet/Step2'
import { WelcomeImportWalletStep3Page } from './pages/WelcomeImportWallet/Step3'
import { WelcomeImportWalletStep4Page } from './pages/WelcomeImportWallet/Step4'
import { WelcomeImportWalletStep5Page } from './pages/WelcomeImportWallet/Step5'
import { WelcomeSecuritySetupPage } from './pages/WelcomeSecuritySetup'
import { WelcomeSecuritySetupStep1Page } from './pages/WelcomeSecuritySetup/Step1'
import { WelcomeSecuritySetupStep2Page } from './pages/WelcomeSecuritySetup/Step2'
import { WelcomeSecuritySetupStep3Page } from './pages/WelcomeSecuritySetup/Step3'

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
      {
        path: 'connections',
        element: <PortfolioConnectionsPage />,
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
    children: [
      {
        path: ':address',
        children: [
          {
            path: 'overview?',
            element: <AccountOverview />,
          },
          {
            path: 'tokens',
            element: <AccountTokensList />,
          },
          {
            path: 'nfts',
            element: <AccountNftList />,
          },
          {
            path: 'transactions',
            element: <AccountTransactionsList />,
          },
          {
            path: 'connections',
            element: <AccountConnections />,
          },
        ],
      },
    ],
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
    path: '/welcome-security-setup',
    element: <WelcomeSecuritySetupPage />,
    children: [
      {
        path: '1?',
        element: <WelcomeSecuritySetupStep1Page />,
      },
      {
        path: '2',
        element: <WelcomeSecuritySetupStep2Page />,
      },
      {
        path: '3',
        element: <WelcomeSecuritySetupStep3Page />,
      },
    ],
  },
  {
    path: '/welcome-import-wallet',
    element: <WelcomeImportWalletPage />,
    children: [
      {
        path: '1?',
        element: <WelcomeImportWalletStep1Page />,
      },
      {
        path: '2',
        element: <WelcomeImportWalletStep2Page />,
      },
      {
        path: '3',
        element: <WelcomeImportWalletStep3Page />,
      },
      {
        path: '4',
        element: <WelcomeImportWalletStep4Page />,
      },
      {
        path: '5',
        element: <WelcomeImportWalletStep5Page />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
])
