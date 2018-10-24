// @flow

import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import TokenSaleConfirmDetails from './TokenSaleConfirmDetails/TokenSaleConfirmDetails'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import CheckMarkSVG from '../../../assets/icons/checkGreen.svg'
import CloseButton from '../../CloseButton'
import { ROUTES } from '../../../core/constants'
import { formatGAS } from '../../../core/formatters'
import styles from './TokenSaleConfirm.scss'

type Props = {
  onClickHandler: () => void,
  handleBack: () => void,
  assetToPurchaseWith: string,
  tokenInfo: Object,
  amountToPurchaseFor: number,
  gasFee: number
}

const TokenSaleConfirm = ({
  onClickHandler,
  assetToPurchaseWith,
  tokenInfo,
  handleBack,
  amountToPurchaseFor,
  gasFee
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
        gasFee={gasFee}
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
      {!!gasFee && (
        <div className={styles.confirmationFees}>
          <p>Fee: {formatGAS(gasFee)} GAS</p>
        </div>
      )}
    </div>
  </FullHeightPanel>
)

export default TokenSaleConfirm
