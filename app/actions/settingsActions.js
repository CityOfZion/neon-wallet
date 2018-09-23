// @flow
import { pick, keys, uniqBy } from 'lodash-es'
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'
import { getDefaultTokens } from '../core/nep5'

import {
  EXPLORERS,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_THEME
} from '../core/constants'
import pack from '../../package.json'

type Settings = {
  currency?: string,
  blockExplorer?: string,
  tokens?: Array<TokenItemType>
}

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: () => Promise<Settings> = async () => ({
  currency: DEFAULT_CURRENCY_CODE,
  theme: DEFAULT_THEME,
  blockExplorer: EXPLORERS.NEO_SCAN,
  tokens: await getDefaultTokens()
})

const getSettings = async (): Promise<Settings> => {
  const defaults = await DEFAULT_SETTINGS()
  const settings = (await getStorage(STORAGE_KEY)) || {}

  // indicates that this user is running 0.2.7 or less
  // and we override the saved settings with EXPLORERS.NEO_SCAN
  // until user updtates settings themselves
  if (!settings.version) {
    settings.blockExplorer = EXPLORERS.NEO_SCAN
  }

  const { version } = pack
  const tokens = uniqBy(
    [...(defaults.tokens || []), ...(settings.tokens || [])],
    token => [token.networkId, token.scriptHash].join('-')
  )

  return { ...defaults, ...settings, tokens, version }
}

export const ID = 'settings'

export const updateSettingsActions = createActions(
  ID,
  (values: Settings = {}) => async (): Promise<Settings> => {
    const settings = await getSettings()
    const newSettings = {
      ...settings,
      ...values
    }
    await setStorage(STORAGE_KEY, newSettings)

    return newSettings
  }
)

export default createActions(ID, () => async (): Promise<Settings> => {
  const settings = await getSettings()
  const picked = await pick(settings, keys(await DEFAULT_SETTINGS()))
  return picked
})
