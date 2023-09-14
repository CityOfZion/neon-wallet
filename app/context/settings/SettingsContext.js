// @flow
import React, { useContext, useEffect } from 'react'
import { pick, keys, uniqBy, cloneDeep } from 'lodash-es'

import { ensureHex, validateHashLength } from '../../util/tokenHashValidation'
import { getStorage, setStorage } from '../../core/storage'
import { getDefaultTokens } from '../../core/nep5'
import {
  DEFAULT_EXPLORER,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_THEME,
  DEFAULT_LANGUAGE,
} from '../../core/constants'
import { version } from '../../../package.json'

const STORAGE_KEY = 'settings'

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

type SettingsContextType = {
  settings: Settings,
  setSetting: (values: Settings) => Promise<void>,
}

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

  const neoLegacyTokens = uniqBy(
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
  const N3Tokens = await getDefaultTokens('neo3')

  return {
    ...defaults,
    ...settings,
    tokens: settings.chain === 'neo2' ? neoLegacyTokens : N3Tokens,
  }
}

export const updateSettings = async (values: Settings = {}) => {
  const settings = await getSettings()
  const { chain } = values
  const newSettings = {
    ...settings,
    ...values,
  }
  // console.log({ chain })
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

export const SettingsContext = React.createContext<SettingsContextType>({})
export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsContextProvider = ({
  children,
}: {
  children: React$Node,
}) => {
  const [settings, setSettings] = React.useState({})

  const setSetting = async (values: Settings = {}) => {
    const nextSettings = await updateSettings(values)
    setSettings(nextSettings)
  }

  useEffect(() => {
    const init = async () => {
      const settings = await getSettings()
      setSettings(settings)
    }
    init()
  }, [])

  const contextValue = {
    settings,
    setSetting,
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}
