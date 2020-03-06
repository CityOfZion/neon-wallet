// @flow
import { withData } from 'spunky'

import { DEFAULT_LANGUAGE, LANGUAGES } from '../core/constants'
import settingsActions from '../actions/settingsActions'

export default function withLanguageData() {
  const mapSettingsDataToProps = settings => ({
    languageDisplayValue: settings
      ? LANGUAGES[settings.language].label || LANGUAGES.ENGLISH.label
      : LANGUAGES.ENGLISH.label,
    language: settings
      ? settings.language || DEFAULT_LANGUAGE
      : DEFAULT_LANGUAGE,
  })
  return withData(settingsActions, mapSettingsDataToProps)
}
