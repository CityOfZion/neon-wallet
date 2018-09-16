// @flow
import React from 'react'

import Panel from '../../Panel'
import TokenSaleSelection from './TokenSaleSelection'
import TokenSaleConditions from './TokenSaleConditions'
import DialogueBox from '../../DialogueBox'
import Button from '../../Button'
import WarningIcon from '../../../assets/icons/warning.svg'
import CheckMarkIcon from '../../../assets/icons/check.svg'

import styles from './TokenSalePanel.scss'

import { TOKEN_SALE_CONFIRM } from '../../../core/constants'

type Props = {
  setStep: () => void,
  assetBalances: object
}

const TokenSalePanel = ({
  setStep,
  assetBalances,
  getAssetsToPurchaseWith,
  assetToPurchaseWith,
  assetToPurchase,
  amountToPurchaseFor,
  getPurchaseableAssets,
  conditions,
  disabledButton,
  acceptedConditions,
  updateField,
  updateConditions
}: Props) => (
  <Panel renderHeader={() => <p>Participate in Token Sale</p>}>
    <div className={styles.tokenSalePanelContainer}>
      <TokenSaleSelection
        assetBalances={assetBalances}
        getAssetsToPurchaseWith={getAssetsToPurchaseWith}
        assetToPurchaseWith={assetToPurchaseWith}
        assetToPurchase={assetToPurchase}
        amountToPurchaseFor={amountToPurchaseFor}
        updateField={updateField}
        getPurchaseableAssets={getPurchaseableAssets}
      />
      <DialogueBox
        icon={<WarningIcon />}
        text="Please read and acknowledge these statements to continue"
        className={styles.tokenSalePanelDialogueBox}
      />
      <TokenSaleConditions conditions={conditions} updateConditions={updateConditions} acceptedConditions={acceptedConditions}/>
      <Button
        onClick={() => setStep(TOKEN_SALE_CONFIRM)}
        disabled={disabledButton}
        primary
        renderIcon={CheckMarkIcon}
        className={styles.tokenSaleButton}
      >
        Continue
      </Button>
    </div>
  </Panel>
)

export default TokenSalePanel
