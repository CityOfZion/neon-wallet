import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import * as ElectronRedererSentry from '@sentry/electron/renderer'
import * as ReactSentry from '@sentry/react'

import { sentryConfig } from '../../../../sentry.config'

const isProductionMode = Boolean(import.meta.env?.RENDERER_VITE_SENTRY_DSN && import.meta.env.PROD)
export function setupSentryReact() {
  if (isProductionMode) {
    ElectronRedererSentry.init(
      {
        dsn: import.meta.env.RENDERER_VITE_SENTRY_DSN,
        ...sentryConfig,
        anrDetection: { captureStackTrace: true },
      },
      // @ts-expect-error Something wrong with Sentry's typings
      ReactSentry.init
    )
  }
}

export function setupSentryWrapper(app: React.ComponentType) {
  return isProductionMode ? ReactSentry.withProfiler(app) : app
}

export function createRouteHandler() {
  return isProductionMode ? ReactSentry.wrapCreateBrowserRouter(createBrowserRouter) : createBrowserRouter
}
