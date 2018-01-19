// @flow
import { pick } from 'lodash'

import createRequestActions from '../util/api/createRequestActions'
import { getStorage, setStorage } from '../core/storage'
import { EXPLORERS, CURRENCIES } from '../core/constants'

type Props = {
  currency: string
}

const DEFAULT_SETTINGS = {
  currency: CURRENCIES.usd,
  blockExplorer: EXPLORERS.NEO_TRACKER
}

const getSettings = async () => ({
  ...DEFAULT_SETTINGS,
  ...await getStorage('settings')
})

export const ID = 'SETTINGS'

export default createRequestActions(ID, () => async (state: Object) => {
  const settings = await getSettings()
  return pick(settings, 'currency', 'blockExplorer')
})

export const setCurrency = createRequestActions(ID, ({ currency }: Props) => async (state: Object) => {
  const settings = await getSettings()
  const newSettings = { ...settings, currency }
  await setStorage('settings', newSettings)

  return newSettings
})
