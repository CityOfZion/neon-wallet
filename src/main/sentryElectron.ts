import * as ElectronSentry from '@sentry/electron/main'
import { IPCMode } from '@sentry/electron/main'
import { ExitReason } from '@sentry/electron/main/electron-normalize'
import { session } from 'electron'

import { sentryConfig } from '../../sentry.config'

const isProductionMode = Boolean(import.meta.env?.MAIN_VITE_SENTRY_DSN && import.meta.env.PROD)

const exitReasons: ExitReason[] = [
  'clean-exit',
  'abnormal-exit',
  'killed',
  'crashed',
  'oom',
  'launch-failed',
  'integrity-failure',
]

export function setupSentry() {
  if (isProductionMode) {
    ElectronSentry.init({
      dsn: import.meta.env.MAIN_VITE_SENTRY_DSN,
      ...sentryConfig,
      getSessions: () => [session.defaultSession, session.fromPartition('persist:my-session')],
      integrations: [
        new ElectronSentry.Integrations.BrowserWindowSession(),
        new ElectronSentry.Integrations.ChildProcess({
          events: exitReasons,
          breadcrumbs: exitReasons,
        }),
        new ElectronSentry.Integrations.ElectronMinidump(),
        new ElectronSentry.Integrations.MainProcessSession({ sendOnCreate: true }),
        new ElectronSentry.Integrations.Console(),
      ],
      ipcMode: IPCMode.Both,
    })
  }
}
