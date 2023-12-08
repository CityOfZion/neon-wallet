import { BrowserOptions } from '@sentry/electron/renderer'

import { version } from './package.json'
export const sentryConfig: Omit<BrowserOptions, 'transportOptions' | 'transport'> = {
  attachStacktrace: true,
  autoSessionTracking: true,
  debug: false,
  enableTracing: true,
  environment: 'release',
  release: version,
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost'],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,
}
