// @flow

import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import SendIcon from '../../../assets/icons/send.svg'
import ConfirmCircle from '../../../assets/icons/confirm-circle.svg'
import { createFormattedDate } from '../../../util/createFormattedDate'
import { ROUTES } from '../../../core/constants'
import CloseButton from '../../CloseButton'

import styles from './TokenSaleSuccess.scss'

type Props = {
  onClickHandler: () => void,
  token: string
}

const TokenSaleSuccess = ({ onClickHandler, token }: Props) => (
  <FullHeightPanel
    headerText="Complete!"
    renderInstructions={() => <div />}
    renderHeaderIcon={() => (
      <SendIcon className={styles.tokenSaleSuccessSendIcon} />
    )}
    renderCloseButton={() => (
      <button
        className={styles.tokenSaleSuccessCloseButton}
        onClick={onClickHandler}
      >
        <CloseButton routeTo={ROUTES.TOKEN_SALE} />
      </button>
    )}
  >
    <div className={styles.tokenSaleSuccessContainer}>
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
  </FullHeightPanel>
)

export default TokenSaleSuccess
