// @flow
import React from 'react'
import classNames from 'classnames'
import { withActions } from 'spunky'
import { compose } from 'redux'
import { FormattedMessage } from 'react-intl'

import styles from './Home.scss'
import lightLogo from '../../assets/images/logo-light.png'
import darkLogo from '../../assets/images/logo-dark.png'
import { updateSettingsActions } from '../../actions/settingsActions'
import LanguageSelect from '../../components/Inputs/LanguageSelect'
import ChainSwitch from '../../components/ChainSwitch'
import { resetCachedNode } from '../../actions/nodeStorageActions'
import networkActions from '../../actions/networkActions'
import withSettingsContext from '../../hocs/withSettingsContext'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  theme: ThemeType,
  language: string,
  setSetting: ({ [key: string]: string }) => void,
  // setChain: (chain: string) => any,
  chain: string,
}

type State = {
  languageMenuOpen: boolean,
}

class HomeLayout extends React.Component<Props, State> {
  state = {
    languageMenuOpen: false,
  }

  updateChain = n3Toggled => {
    const chain = n3Toggled ? 'neo3' : 'neo2'
    this.props.setSetting({ chain })
    resetCachedNode()
  }

  render() {
    const {
      children,
      renderNavigation,
      theme,
      language,
      setSetting,
      chain,
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
            setLanguageSetting={nextLanguage =>
              setSetting({ language: nextLanguage })
            }
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
            <FormattedMessage id="authLogin" />
          </div>
          <ChainSwitch updateChain={this.updateChain} chain={chain} />
          {children}
        </div>
      </div>
    )
  }
}

const mapSettingsActionsToProps = actions => ({
  setChain: chain =>
    actions.call({
      chain,
    }),
})

const mapNetworkActionsToProps = (actions: Actions): Object => ({
  handleNetworkChange: networkId => actions.call({ networkId }),
})

// const mapStateToProps = () => ({
//   networks: getNetworks(),
// })

// // TODO: hack a way to get the dashboard to update when the settings change

// export default compose(
//   connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   ),
//   withNetworkData(),
//   withAuthData(),
//   withActions(nodeStorageActions, mapSaveNodeActionsToProps),
//   withRecall(accountActions, ['net']),
//   withActions(accountActions, mapAccountActionsToProps),
//   withActions(networkActions, mapNetworkActionsToProps),

export default compose(
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  // if a user swtiches chains we are going to reset any network informtation
  withActions(networkActions, mapNetworkActionsToProps),
)(withSettingsContext(HomeLayout))
