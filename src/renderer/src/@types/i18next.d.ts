import 'i18next'

import { defaultNS, resources } from '../libs/i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNs: typeof defaultNS
    resources: (typeof resources)['en']
  }
}
