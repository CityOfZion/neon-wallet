// @flow
import {
  pick,
  keys,
  uniqBy
} from 'lodash'
import {
  createActions
} from 'spunky'

import {
  getStorage,
  setStorage
} from '../core/storage'
import {
  getDefaultTokens
} from '../core/nep5'
import {
  EXPLORERS,
  DEFAULT_CURRENCY_CODE
} from '../core/constants'
import themes from '../themes';

type Settings = {
  currency ? : string,
  blockExplorer ? : string,
  tokens ? : Array < TokenItemType >
}

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: Settings = {
  currency: DEFAULT_CURRENCY_CODE,
  blockExplorer: EXPLORERS.NEO_TRACKER,
  theme: themes.Light,
  tokens: getDefaultTokens()
}

const getSettings = async (): Promise < Settings > => {
  const defaults = DEFAULT_SETTINGS
  const settings = (await getStorage(STORAGE_KEY)) || {}

  const tokens = uniqBy(
    [...(defaults.tokens || []), ...(settings.tokens || [])],
    token => [token.networkId, token.scriptHash].join('-')
  )

  return { ...defaults,
    ...settings,
    tokens
  }
}

export const ID = 'settings'

export const updateSettingsActions = createActions(
  ID,
  (values: Settings = {}) => async (): Promise < Settings > => {
    const settings = await getSettings()
    const newSettings = { ...settings,
      ...values
    }
    await setStorage(STORAGE_KEY, newSettings)

    return newSettings
  }
)

export default createActions(ID, () => async (): Promise < Settings > => {
  const settings = await getSettings()
  return pick(settings, keys(DEFAULT_SETTINGS))
})
