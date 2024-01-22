const ElectronSentry = require('@sentry/electron/main')
const { IPCMode } = require('@sentry/electron/main')
const { session } = require('electron')

const { sentryConfig, isSentryEnable } = require('./sentry.config')

const exitReasons = [
  'clean-exit',
  'abnormal-exit',
  'killed',
  'crashed',
  'oom',
  'launch-failed',
  'integrity-failure',
]

const setupSentry = () => {
  if (isSentryEnable) {
    ElectronSentry.init({
      dsn: process.env.SENTRY_DSN,
      ...sentryConfig,
      getSessions: () => [
        session.defaultSession,
        session.fromPartition('persist:my-session'),
      ],
      integrations: [
        new ElectronSentry.Integrations.BrowserWindowSession(),
        new ElectronSentry.Integrations.ChildProcess({
          events: exitReasons,
          breadcrumbs: exitReasons,
        }),
        new ElectronSentry.Integrations.ElectronMinidump(),
        new ElectronSentry.Integrations.MainProcessSession({
          sendOnCreate: true,
        }),
        new ElectronSentry.Integrations.Console(),
      ],
      ipcMode: IPCMode.Both,
    })
  }
}

module.exports = { setupSentry }
