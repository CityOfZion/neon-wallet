// @flow
import React from 'react'

import StyledReactSelect from '../StyledReactSelect/StyledReactSelect'
import { LANGUAGES } from '../../../core/constants'
import styles from './LanguageSelect.scss'

type Props = {
  languageDisplayValue: string,
  setLanguageSetting: (value: String) => void,
  toggleMenu: (open: boolean) => void,
  languageMenuOpen: boolean,
}

type Language = {
  label: string,
  value: string,
  renderFlag: () => React$Element<any>,
}

const parsedLangOptions = Object.keys(LANGUAGES).map(key => ({
  value: LANGUAGES[key].value,
  label: LANGUAGES[key].label,
  renderFlag: LANGUAGES[key].renderFlag,
}))

export const LanguageSettingsIcon = (data: Language) => {
  const { renderFlag, label } = data
  return (
    <div className={styles.languageOptionRow}>
      {renderFlag()}
      <div />
      {label}
    </div>
  )
}

export default function LanguageSelect({
  setLanguageSetting,
  toggleMenu,
  languageDisplayValue,
  languageMenuOpen,
}: Props) {
  const arrOfLanguages: Array<Language> = Object.keys(LANGUAGES).map(
    key => LANGUAGES[key],
  )

  const selectedLang =
    arrOfLanguages.find(lang => lang.label === languageDisplayValue) ||
    LANGUAGES.ENGLISH

  return (
    <div
      onClick={() => !languageMenuOpen && toggleMenu(true)}
      id={styles.flagDropdownContainer}
    >
      <div id={styles.flagButtonContainer}>
        <div onClick={() => toggleMenu(!languageMenuOpen)}>
          {selectedLang.renderFlag()}
        </div>
      </div>

      {languageMenuOpen && (
        <div id={styles.floatingLanguageSelect}>
          <StyledReactSelect
            formatOptionLabel={LanguageSettingsIcon}
            hideControl
            settiingsSelect
            languageSelect
            onChange={({ value }) => {
              toggleMenu(true)
              setLanguageSetting(value)
            }}
            isSearchable={false}
            transparent
            menuIsOpen
            options={parsedLangOptions}
            value={parsedLangOptions.find(
              option => option.label === languageDisplayValue,
            )}
          />
        </div>
      )}
    </div>
  )
}
