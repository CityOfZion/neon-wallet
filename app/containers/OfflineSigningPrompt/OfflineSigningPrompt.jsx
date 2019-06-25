// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './OfflineSigningPrompt.scss'
import Button from '../../components/Button'
import { ROUTES } from '../../core/constants'
import themes from '../../themes'
import Arrow from '../../assets/icons/arrow.svg'
import Edit from '../../assets/icons/edit.svg'
import Home from '../../assets/navigation/home.svg'
import lightLogo from '../../assets/images/logo-light.png'
import darkLogo from '../../assets/images/logo-dark.png'

type Props = {
  theme: string,
  logout: () => void,
  showImportModal: () => void,
  promptHasBeenDisplayed: boolean => void,
  isWatchOnly: boolean,
}

export default class OfflineSigningPrompt extends Component<Props> {
  componentDidMount() {
    const { promptHasBeenDisplayed } = this.props
    promptHasBeenDisplayed(true)
  }

  render() {
    const {
      theme,
      logout,
      showImportModal,
      promptHasBeenDisplayed,
      isWatchOnly,
    } = this.props
    const dynamicImage = theme === 'Light' ? lightLogo : darkLogo

    return (
      <div style={themes[theme]} className={styles.container}>
        <img className={styles.logo} src={dynamicImage} alt="" />
        <h1>It looks like your machine is offline...</h1>
        {isWatchOnly && (
          <h4>
            Log in with a private key, encrypted key or ledger to sign
            transactions offline
          </h4>
        )}
        {!isWatchOnly && (
          <Button
            renderIcon={() => <Edit />}
            shouldCenterButtonLabelText
            className={styles.signButton}
            onClick={() => showImportModal()}
            primary
          >
            Sign Transaction
          </Button>
        )}
        <Link to={ROUTES.DASHBOARD}>
          <Button
            renderIcon={() => <Home />}
            shouldCenterButtonLabelText
            className={styles.promptButton}
            onClick={() => {
              promptHasBeenDisplayed(true)
            }}
          >
            Continue to Dashboard
          </Button>
        </Link>
        <Link to={ROUTES.HOME}>
          <Button
            renderIcon={() => <Arrow />}
            shouldCenterButtonLabelText
            className={styles.promptButton}
            onClick={() => {
              promptHasBeenDisplayed(false)
              logout()
            }}
          >
            Back to Login
          </Button>
        </Link>
      </div>
    )
  }
}
