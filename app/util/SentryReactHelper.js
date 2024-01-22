import * as ElectronRedererSentry from '@sentry/electron/renderer'
import * as ReactSentry from '@sentry/react'

const { sentryConfig, isSentryEnable } = require('../../config/sentry.config')

export function setupSentryReact() {
  if (isSentryEnable) {
    ElectronRedererSentry.init(
      {
        dsn: process.env.SENTRY_DSN,
        ...sentryConfig,
        anrDetection: { captureStackTrace: true },
      },
      ReactSentry.init,
    )
  }
}

export const setupSentryWrapper = app =>
  isSentryEnable
    ? ReactSentry.withProfiler(ReactSentry.withErrorBoundary(app))
    : app
