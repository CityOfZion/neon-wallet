// @flow

import React from 'react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import TokenSaleConfirmDetails from './TokenSaleConfirmDetails/TokenSaleConfirmDetails'
import Button from '../../Button'
import TokenSaleIcon from '../../../assets/navigation/tokens.svg'
import CheckMarkSVG from '../../../assets/icons/checkGreen.svg'
import CloseButton from '../../CloseButton'
import BackButton from '../../BackButton'
import { ROUTES } from '../../../core/constants'
import styles from './TokenSaleConfirm.scss'

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
  <FullHeightPanel
    headerText="Confirm Purchase"
    renderInstructions={() => <div />}
    renderHeaderIcon={() => <CheckMarkSVG />}
    renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
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
