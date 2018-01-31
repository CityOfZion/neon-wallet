// @flow
import { pick, keys } from 'lodash'

import createRequestActions from '../util/api/createRequestActions'
import { getStorage, setStorage } from '../core/storage'
import { getDefaultTokens } from '../core/nep5'
import { EXPLORERS, DEFAULT_CURRENCY_CODE } from '../core/constants'

type Settings = {
  currency?: string,
  blockExplorer?: string,
  tokens?: Array<TokenItemType>
}

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: Settings = {
  currency: DEFAULT_CURRENCY_CODE,
  blockExplorer: EXPLORERS.NEO_TRACKER,
  tokens: getDefaultTokens()
}

const getSettings = async (): Promise<Settings> => ({
  ...DEFAULT_SETTINGS,
  ...await getStorage(STORAGE_KEY)
})

export const ID = 'SETTINGS'

export const updateSettingsActions = createRequestActions(ID, (values: Settings = {}) => async (state: Object): Promise<Settings> => {
  const settings = await getSettings()
  const newSettings = { ...settings, ...values }
  await setStorage(STORAGE_KEY, newSettings)

  return newSettings
})

export default createRequestActions(ID, () => async (state: Object): Promise<Settings> => {
  const settings = await getSettings()
  return pick(settings, keys(DEFAULT_SETTINGS))
})
