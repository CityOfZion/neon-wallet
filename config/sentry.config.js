const { version } = require('../package.json')

const isSentryEnable =
  process.env.NODE_ENV === 'production' && !!process.env.SENTRY_DSN

const sentryConfig = {
  attachStacktrace: true,
  autoSessionTracking: true,
  debug: false,
  enableTracing: true,
  environment: 'NEON-2',
  release: version,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  tracePropagationTargets: ['localhost'],
  tracesSampleRate: 1.0,
}

module.exports = { sentryConfig, isSentryEnable }
