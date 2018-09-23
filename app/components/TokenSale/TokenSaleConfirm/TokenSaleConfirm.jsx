// @flow

import React from 'react'

import Panel from '../../Panel'
import TokenSaleConfirmDetails from './TokenSaleConfirmDetails/TokenSaleConfirmDetails'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'

import styles from './TokenSaleConfirm.scss'
import Logo from '../../../assets/images/grey-logo.png'

type Props = {
  onClickHandler: () => void,
  assetToPurchaseWith: string,
  tokenInfo: Object,
  amountToPurchaseFor: number
}

const TokenSaleConfirm = ({
  onClickHandler,
  assetToPurchaseWith,
  tokenInfo,
  amountToPurchaseFor
}: Props) => (
  <Panel
    className={styles.tokenSaleConfirmPanel}
    renderHeader={() => (
      <img
        src={Logo}
        alt="Neon logo"
        className={styles.tokenSaleConfirmImage}
      />
    )}
  >
    <div className={styles.tokenSaleConfirmContainer}>
      <TokenSaleConfirmDetails
        tokenInfo={tokenInfo}
        assetToPurchaseWith={assetToPurchaseWith}
        amountToPurchaseFor={amountToPurchaseFor}
      />
      <Button
        onClick={onClickHandler}
        primary
        renderIcon={TokenSaleIcon}
        className={styles.tokenSaleConfirmButton}
      >
        Confirm and Purchase
      </Button>
    </div>
  </Panel>
)

export default TokenSaleConfirm
