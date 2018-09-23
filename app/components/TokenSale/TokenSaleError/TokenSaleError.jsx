// @flow

import React from 'react'

import Panel from '../../Panel'
import Button from '../../Button'
import BackArrow from '../../../assets/icons/arrow.svg'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'

import TokenSaleErrorDetails from './TokenSaleErrorDetails/TokenSaleErrorDetails'

import styles from './TokenSaleError.scss'
import Logo from '../../../assets/images/grey-logo.png'

type Props = {
  retryHandler: () => void,
  backHandler: () => void,
  error: Object
}

const TokenSaleError = ({ retryHandler, backHandler, error }: Props) => (
  <Panel
    className={styles.tokenSaleErrorPanel}
    renderHeader={() => (
      <img src={Logo} alt="Neon logo" className={styles.tokenSaleErrorImage} />
    )}
  >
    <div className={styles.tokenSaleErrorContainer}>
      <TokenSaleErrorDetails error={error} />
      <Button
        onClick={retryHandler}
        primary
        renderIcon={TokenSaleIcon}
        className={styles.tokenSaleErrorButton}
      >
        Try Again
      </Button>
      <Button primary={false} onClick={backHandler} renderIcon={BackArrow}>
        Go Back
      </Button>
    </div>
  </Panel>
)

export default TokenSaleError
