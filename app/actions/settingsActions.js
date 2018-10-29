// @flow
import { pick, keys, uniqBy, cloneDeep } from 'lodash-es'
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'
import { getDefaultTokens } from '../core/nep5'
import { ensureHex, validateHashLength } from '../util/tokenHashValidation'

import {
  DEFAULT_EXPLORER,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_THEME
} from '../core/constants'
import { version } from '../../package.json'

type Settings = {
  currency: string,
  blockExplorer: string,
  tokens: Array<TokenItemType>,
  version: string,
  theme: string,
  soundEnabled: boolean
}

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: () => Promise<Settings> = async () => ({
  currency: DEFAULT_CURRENCY_CODE,
  theme: DEFAULT_THEME,
  blockExplorer: DEFAULT_EXPLORER,
  tokens: await getDefaultTokens(),
  version,
  soundEnabled: true
})

export const getSettings = async (): Promise<Settings> => {
  const defaults = await DEFAULT_SETTINGS()

  const settings = await getStorage(STORAGE_KEY)

  const tokens = uniqBy(
    [
      ...defaults.tokens,
      ...(settings.tokens
        ? settings.tokens
            .filter(token => ensureHex(token.scriptHash))
            .filter(token => validateHashLength(token.scriptHash))
        : [])
    ],
    token => [token.networkId, token.scriptHash].join('-')
  )

  return { ...defaults, ...settings, tokens }
}

export const ID = 'settings'

export const updateSettingsActions = createActions(
  ID,
  // $FlowFixMe
  (values: Settings = {}) => async (): Promise<Settings> => {
    const settings = await getSettings()
    const newSettings = {
      ...settings,
      ...values
    }
    const parsedForLocalStorage = cloneDeep(newSettings)
    const tokensForStorage = [
      ...newSettings.tokens.filter(token => token.isUserGenerated)
    ]
    // NOTE: we only save user generated tokens to local storage to avoid
    // conflicts in managing the "master" nep5 list
    parsedForLocalStorage.tokens = tokensForStorage
    await setStorage(STORAGE_KEY, parsedForLocalStorage)
    return newSettings
  }
)

export default createActions(ID, () => async (): Promise<Settings> => {
  const settings = await getSettings()
  const picked = await pick(settings, keys(await DEFAULT_SETTINGS()))
  return picked
})
