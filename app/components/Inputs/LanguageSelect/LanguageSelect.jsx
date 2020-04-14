// @flow
import React from 'react'

import StyledReactSelect from '../StyledReactSelect/StyledReactSelect'
import { LANGUAGES } from '../../../core/constants'
import styles from './LanguageSelect.scss'

type Props = {
  value: string,
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
  value,
  languageMenuOpen,
}: Props) {
  const arrOfLanguages: Array<Language> = Object.keys(LANGUAGES).map(
    key => LANGUAGES[key],
  )

  const selectedLang =
    arrOfLanguages.find(lang => lang.value === value) || LANGUAGES.ENGLISH

  return (
    <div
      onClick={() => !languageMenuOpen && toggleMenu(true)}
      id={styles.flagDropdownContainer}
    >
      <div id={styles.flagButtonContainer}>
        <div
          id="selected-lang-country-flag"
          onClick={() => toggleMenu(!languageMenuOpen)}
        >
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
            value={parsedLangOptions.find(option => option.value === value)}
          />
        </div>
      )}
    </div>
  )
}
