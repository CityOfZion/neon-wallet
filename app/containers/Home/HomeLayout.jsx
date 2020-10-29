// @flow
import React from 'react'
import classNames from 'classnames'
import { withActions } from 'spunky'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'

import styles from './Home.scss'
import lightLogo from '../../assets/images/logo-light.png'
import darkLogo from '../../assets/images/logo-dark.png'
import withLanguageData from '../../hocs/withLanguageData'
import { updateSettingsActions } from '../../actions/settingsActions'
import LanguageSelect from '../../components/Inputs/LanguageSelect'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  theme: ThemeType,
  language: string,
  setLanguageSetting: (value: String) => void,
}

type State = {
  languageMenuOpen: boolean,
}

class HomeLayout extends React.Component<Props, State> {
  state = {
    languageMenuOpen: false,
  }

  render() {
    const {
      children,
      renderNavigation,
      theme,
      language,
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
          <LanguageSelect
            setLanguageSetting={setLanguageSetting}
            languageMenuOpen={languageMenuOpen}
            toggleMenu={languageMenuOpen => this.setState({ languageMenuOpen })}
            value={language}
          />
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
            test
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
