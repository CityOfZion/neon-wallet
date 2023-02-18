// @flow
import React, { useContext, useEffect } from 'react'

import {
  getSettings,
  updateSettings,
  type Settings,
} from '../../actions/settingsActions'

type SettingsContextType = {
  settings: Settings,
  setSetting: (values: Settings) => Promise<void>,
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
