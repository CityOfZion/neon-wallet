// @flow

import React from 'react'

import Panel from '../../Panel'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import SendIcon from '../../../assets/icons/send.svg'
import ConfirmCircle from '../../../assets/icons/confirm-circle.svg'
import { createFormattedDate } from '../../../util/createFormattedDate'

import Logo from '../../../assets/images/grey-logo.png'
import styles from './TokenSaleSuccess.scss'

type Props = {
  onClickHandler: () => void,
  token: string
}

const TokenSaleSuccess = ({ onClickHandler, token }: Props) => (
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
            {token} TOKEN SALE ENTERED
          </h2>
          <p className={styles.tokenSaleSuccessInnerTextParagraph}>
            {createFormattedDate()}
          </p>
        </div>
      </div>
      <Button
        onClick={onClickHandler}
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
