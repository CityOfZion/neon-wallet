// @flow
import { pick, keys, uniqBy, cloneDeep } from 'lodash-es'
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'
import { getDefaultTokens } from '../core/nep5'
import { ensureHex, validateHashLength } from '../util/tokenHashValidation'

import {
  DEFAULT_EXPLORER,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_THEME,
  DEFAULT_LANGUAGE,
} from '../core/constants'
import { version } from '../../package.json'

export type Settings = {
  currency: string,
  blockExplorer: string,
  tokens: Array<TokenItemType>,
  version: string,
  theme: string,
  soundEnabled: boolean,
  chain: string,
  language: string,
  customNetworks: Array<{ rpc: string, api: string, label: string }>,
}

const STORAGE_KEY = 'settings'

const DEFAULT_SETTINGS: () => Promise<Settings> = async () => ({
  currency: DEFAULT_CURRENCY_CODE,
  theme: DEFAULT_THEME,
  blockExplorer: DEFAULT_EXPLORER,
  tokens: await getDefaultTokens(),
  version,
  soundEnabled: true,
  language: DEFAULT_LANGUAGE,
  // TODO: create constant like the other defaults
  chain: 'neo2',
  customNetworks: [],
})

export const getSettings = async (): Promise<Settings> => {
  const defaults = await DEFAULT_SETTINGS()

  const settings = await getStorage(STORAGE_KEY)

  const { chain } = settings

  const tokens = uniqBy(
    [
      ...defaults.tokens,
      ...(settings.tokens
        ? settings.tokens
            .filter(token => ensureHex(token.scriptHash))
            .filter(token => validateHashLength(token.scriptHash))
        : []),
    ],
    token => [token.networkId, token.scriptHash].join('-'),
  )

  const nextSettings = { ...defaults, ...settings, tokens }
  const picked = await pick(nextSettings, keys(await DEFAULT_SETTINGS()))
  if (chain === 'neo3') {
    picked.tokens = await getDefaultTokens('neo3')
  }
  return picked
}

export const updateSettings = async (values: Settings = {}) => {
  const settings = await getSettings()
  const { chain } = values

  const newSettings = {
    ...settings,
    ...values,
  }
  const parsedForLocalStorage = cloneDeep(newSettings)
  if (chain === 'neo2') {
    const tokensForStorage = [
      ...newSettings.tokens.filter(token => token.isUserGenerated),
    ]
    parsedForLocalStorage.tokens = tokensForStorage
  } else {
    const tokens = await getDefaultTokens('neo3')
    newSettings.tokens = tokens
  }
  // NOTE: we only save user generated tokens to local storage to avoid
  // conflicts in managing the "master" nep5 list
  await setStorage(STORAGE_KEY, parsedForLocalStorage)
  return newSettings
}

export const ID = 'settings'

export const updateSettingsActions = createActions(
  ID,
  // $FlowFixMe
  (values: Settings = {}) => (): Promise<Settings> => updateSettings(values),
)

export default createActions(ID, () => async (): Promise<Settings> => {
  return getSettings()
})
