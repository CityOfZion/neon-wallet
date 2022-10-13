// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import styles from './Main.scss'
import Button from '../../Button'
import { ROUTES } from '../../../core/constants'
import themes from '../../../themes'
import Arrow from '../../../assets/icons/arrow.svg'
import lightLogo from '../../../assets/images/logo-light.png'
import darkLogo from '../../../assets/images/logo-dark.png'

type Props = {
  children: React$Node,
  theme: string,
  logout: () => void,
}

type State = {
  hasError: boolean,
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error: Error, info: any) {
    console.warn('An unknown error has occurred!', { error, info })
    this.setState({ hasError: true })
  }

  render() {
    const { theme, children, logout } = this.props
    const dynamicImage = theme === 'Light' ? lightLogo : darkLogo

    if (this.state.hasError) {
      return (
        <div style={themes[theme]} className={styles.errorContainer}>
          <img className={styles.logo} src={dynamicImage} alt="" />
          <h1>
            <FormattedMessage id="errors.network.general" />
          </h1>
          <Link to={ROUTES.HOME}>
            <Button
              renderIcon={() => <Arrow />}
              shouldCenterButtonLabelText
              className={styles.backButton}
              onClick={() => {
                logout()
                this.setState({ hasError: false })
              }}
              primary
            >
              Back to Login
            </Button>
          </Link>
        </div>
      )
    }

    return children
  }
}
