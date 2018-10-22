// @flow

import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import TokenSaleConfirmDetails from './TokenSaleConfirmDetails/TokenSaleConfirmDetails'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import CheckMarkSVG from '../../../assets/icons/checkGreen.svg'
import CloseButton from '../../CloseButton'
import { ROUTES } from '../../../core/constants'
import styles from './TokenSaleConfirm.scss'

type Props = {
  onClickHandler: () => void,
  handleBack: () => void,
  assetToPurchaseWith: string,
  tokenInfo: Object,
  amountToPurchaseFor: number
}

const TokenSaleConfirm = ({
  onClickHandler,
  assetToPurchaseWith,
  tokenInfo,
  handleBack,
  amountToPurchaseFor
}: Props) => (
  <FullHeightPanel
    headerText="Confirm Purchase"
    renderInstructions={() => <div />}
    renderHeaderIcon={() => <CheckMarkSVG />}
    renderCloseButton={() => (
      <button
        className={styles.tokenSaleConfirmCloseButton}
        onClick={handleBack}
      >
        <CloseButton routeTo={ROUTES.TOKEN_SALE} />
      </button>
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
  </FullHeightPanel>
)

export default TokenSaleConfirm
