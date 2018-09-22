import React from 'react'

import Panel from '../../Panel'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import SendIcon from '../../../assets/icons/send.svg'
import ConfirmCircle from '../../../assets/icons/confirm-circle.svg'

import Logo from '../../../assets/images/grey-logo.png'
import styles from './TokenSaleSuccess.scss'

const TokenSaleSuccess = () => (
  <Panel
    className={styles.tokenSaleSuccess}
    renderHeader={() => (
      <img
        className={styles.tokenSaleSuccessImage}
        src={Logo}
        alt="Neon logo"
      />
    )}
  >
    <div className={styles.tokenSaleSuccessContainer}>
      <h1 className={styles.tokenSaleSuccessHeading}>
        <SendIcon className={styles.tokenSaleSuccessSendIcon} />Complete!
      </h1>
      <div className={styles.tokenSaleSuccessSpacer} />
      <div className={styles.tokenSaleSuccessInnerContainer}>
        <ConfirmCircle className={styles.tokenSaleSuccessIcon} />
        <div className={styles.tokenSaleSuccessInnerTextContainer}>
          <h2 className={styles.tokenSaleSuccessInnerTextHeading}>
            GDM TOKEN SALE ENTERED
          </h2>
          <p className={styles.tokenSaleSuccessInnerTextParagraph}>
            Tuesday 12 June 2019 21:30
          </p>
        </div>
      </div>
      <Button
        onClick={() => console.log('ok then')}
        primary
        renderIcon={TokenSaleIcon}
        className={styles.tokenSaleSuccessButton}
      >
        Purchase another token
      </Button>
    </div>
  </Panel>
)

export default TokenSaleSuccess
