// @flow
import { pick, keys, uniqBy } from 'lodash'
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'
import { getDefaultTokens } from '../core/nep5'
import { EXPLORERS, DEFAULT_CURRENCY_CODE } from '../core/constants'
import pack from '../../package.json'

type Settings = {
  currency?: string,
  blockExplorer?: string,
  tokens?: Array<TokenItemType>
}

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: () => Promise<Settings> = async () => ({
  currency: DEFAULT_CURRENCY_CODE,
  blockExplorer: EXPLORERS.NEO_SCAN,
  tokens: await getDefaultTokens()
})

const ensureHex = (token: string): boolean => {
  const hexRegex = /^([0-9A-Fa-f]{2})*$/
  try {
    return hexRegex.test(token)
  } catch (err) {
    console.warn('An invalid script hash was manually entered in Settings!', {
      scriptHash: token
    })
    return false
  }
}

const validateHashLength = (token: string): boolean => {
  return token.length === 40
}

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
    [
      ...(defaults.tokens || []),
      ...(settings.tokens.filter(ensureHex).filter(validateHashLength) || [])
    ],
    token => [token.networkId, token.scriptHash].join('-')
  )

  return { ...defaults, ...settings, tokens, version }
}

export const ID = 'SETTINGS'

export const updateSettingsActions = createActions(ID, (values: Settings = {}) => async (state: Object): Promise<Settings> => {
  const settings = await getSettings()
  const newSettings = { ...settings, ...values }
  await setStorage(STORAGE_KEY, newSettings)
  return newSettings
})

export default createActions(ID, () => async (state: Object): Promise<Settings> => {
  const settings = await getSettings()
  const picked = await pick(settings, keys(await DEFAULT_SETTINGS()))
  return picked
})
