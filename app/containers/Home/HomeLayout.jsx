// @flow
import React from 'react'
import classNames from 'classnames'
import { withActions } from 'spunky'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'

import styles from './Home.scss'
import lightLogo from '../../assets/images/logo-light.png'
import darkLogo from '../../assets/images/logo-dark.png'
import Flag from '../../assets/icons/flag.svg'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import withLanguageData from '../../hocs/withLanguageData'
import { LANGUAGES } from '../../core/constants'
import { updateSettingsActions } from '../../actions/settingsActions'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  theme: ThemeType,
  languageDisplayValue: string,
  setLanguageSetting: (value: String) => void,
  headerText: string,
}

type State = {
  languageMenuOpen: boolean,
}

const parsedLangOptions = Object.keys(LANGUAGES).map(key => ({
  value: LANGUAGES[key].value,
  label: LANGUAGES[key].label,
}))

class HomeLayout extends React.Component<Props, State> {
  state = {
    languageMenuOpen: false,
  }

  render() {
    const {
      children,
      renderNavigation,
      headerText,
      theme,
      languageDisplayValue,
      setLanguageSetting,
    } = this.props
    const dynamicImage = theme === 'Light' ? lightLogo : darkLogo
    const { languageMenuOpen } = this.state

    return (
      <div
        id="home"
        className={styles.homeContainer}
        onClick={() =>
          languageMenuOpen && this.setState({ languageMenuOpen: false })
        }
      >
        <div className={styles.innerHomeContainer}>
          {renderNavigation && renderNavigation()}
          <div
            onClick={() =>
              !languageMenuOpen && this.setState({ languageMenuOpen: true })
            }
            id={styles.flagDropdownContainer}
          >
            <Flag
              onClick={() =>
                this.setState({ languageMenuOpen: !languageMenuOpen })
              }
            />
            {languageMenuOpen && (
              <div id={styles.floatingLanguageSelect}>
                <StyledReactSelect
                  hideControl
                  settingsSelect
                  onChange={({ value }) => {
                    this.setState({ languageMenuOpen: true })
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
          <div
            className={
              renderNavigation
                ? classNames(
                    styles.logoWithNegativeMargin,
                    styles.logoContainer,
                  )
                : styles.logoContainer
            }
          >
            <img className={styles.logo} src={dynamicImage} alt="" />
          </div>
          <div className={styles.loginHeader}>
            <FormattedMessage id="authLogin" />
          </div>
          {children}
        </div>
      </div>
    )
  }
}

const mapSettingsActionsToProps = actions => ({
  setLanguageSetting: language => actions.call({ language }),
})

export default compose(
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  withLanguageData(),
)(HomeLayout)
