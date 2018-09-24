// @flow
import React from 'react'

import Panel from '../../Panel'
import TokenSaleSelection from './TokenSaleSelection/TokenSaleSelection'
import TokenSaleConditions from './TokenSaleConditions/TokenSaleConditions'
import DialogueBox from '../../DialogueBox'
import Button from '../../Button'
import PriorityFee from '../../Send/SendPanel/PriorityFee'
import WarningIcon from '../../../assets/icons/warning.svg'
import CheckMarkIcon from '../../../assets/icons/check.svg'

import styles from './TokenSalePanel.scss'

type Props = {
  onClickHandler: () => void,
  assetBalances: Object,
  getAssetsToPurchaseWith: () => Array<string>,
  assetToPurchaseWith: string,
  assetToPurchase: string,
  amountToPurchaseFor: number,
  getPurchaseableAssets: () => Array<string>,
  conditions: Array<string>,
  disabledButton: boolean,
  acceptedConditions: Array<string>,
  updateField: ({ name: string, value: string | number }) => void,
  updateConditions: (condition: string) => void,
  inputErrorMessage: string,
  availableGas: number,
  gasFee: number,
  handleAddPriorityFee: (gasFee: number) => void
}

const TokenSalePanel = ({
  onClickHandler,
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
  updateConditions,
  inputErrorMessage,
  availableGas,
  gasFee,
  handleAddPriorityFee
}: Props) => (
  <Panel
    className={styles.tokenSalePanel}
    renderHeader={() => <p>Participate in Token Sale</p>}
  >
    <div className={styles.tokenSalePanelContainer}>
      <TokenSaleSelection
        assetBalances={assetBalances}
        getAssetsToPurchaseWith={getAssetsToPurchaseWith}
        assetToPurchaseWith={assetToPurchaseWith}
        assetToPurchase={assetToPurchase}
        amountToPurchaseFor={amountToPurchaseFor}
        updateField={updateField}
        getPurchaseableAssets={getPurchaseableAssets}
        inputErrorMessage={inputErrorMessage}
      />
      <DialogueBox
        icon={<WarningIcon />}
        text="Please read and acknowledge these statements to continue"
        className={styles.tokenSalePanelDialogueBox}
      />
      <TokenSaleConditions
        conditions={conditions}
        updateConditions={updateConditions}
        acceptedConditions={acceptedConditions}
      />
      <PriorityFee
        availableGas={Number(availableGas)}
        handleAddPriorityFee={handleAddPriorityFee}
        fees={gasFee}
        disabled={false}
      />
      <Button
        onClick={onClickHandler}
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
