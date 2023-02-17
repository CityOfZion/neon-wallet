// @flow
import React, { useContext, useEffect } from 'react'
import { pick, keys, uniqBy, cloneDeep } from 'lodash-es'

import {
  DEFAULT_EXPLORER,
  DEFAULT_CURRENCY_CODE,
  DEFAULT_THEME,
  DEFAULT_LANGUAGE,
} from '../../core/constants'
import { getDefaultTokens } from '../../core/nep5'
import { version } from '../../../package.json'
import { getStorage, setStorage } from '../../core/storage'
import { ensureHex, validateHashLength } from '../../util/tokenHashValidation'

// $FlowFixMe
export const SettingsContext = React.createContext({})
export const useSettingsContext = () => useContext(SettingsContext)

const STORAGE_KEY = 'settings'

type Settings = {
  currency: string,
  blockExplorer: string,
  tokens: Array<TokenItemType>,
  version: string,
  theme: string,
  soundEnabled: boolean,
  chain: string,
}

const DEFAULT_SETTINGS: () => Promise<Settings> = async () => ({
  currency: DEFAULT_CURRENCY_CODE,
  theme: DEFAULT_THEME,
  blockExplorer: DEFAULT_EXPLORER,
  tokens: await getDefaultTokens(),
  version,
  soundEnabled: true,
  language: DEFAULT_LANGUAGE,
  chain: 'neo3',
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
        : []),
    ],
    token => [token.networkId, token.scriptHash].join('-'),
  )

  return { ...defaults, ...settings, tokens }
}

export const updateSettingsActions = async (
  values: Settings = {},
): Promise<Settings> => {
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

export const SettingsContextProvider = ({
  children,
}: {
  children: React$Node,
}) => {
  // $FlowFixMe
  const [settings, setSettings] = React.useState(null)

  const setSetting = async (values: Settings = {}) => {
    const nextSettings = await updateSettingsActions(values)
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
