// @flow
import React from 'react'

import SelectInput from '../../../Inputs/SelectInput'
import NumberInput from '../../../Inputs/NumberInput'

import styles from './TokenSaleSelection.scss'

type Props = {
  assetBalances: Object,
  getAssetsToPurchaseWith: () => Array<string>,
  assetToPurchaseWith: string,
  assetToPurchase: string,
  amountToPurchaseFor: number,
  getPurchaseableAssets: () => Array<string>,
  updateField: ({ name: string, value: string | number }) => void,
  inputErrorMessage: string
}

const TokenSaleSelection = ({
  assetBalances,
  getAssetsToPurchaseWith,
  assetToPurchaseWith,
  assetToPurchase,
  amountToPurchaseFor,
  getPurchaseableAssets,
  updateField,
  inputErrorMessage
}: Props) => {
  const maxBalance = assetBalances[assetToPurchaseWith]

  return (
    <section className={styles.tokenSaleSelectionContainer}>
      <div className={styles.tokenSaleSelectTokenContainer}>
        <h3 className={styles.tokenSaleSelectionHeader}>ICO Token</h3>
        <SelectInput
          items={getPurchaseableAssets()}
          name="assetToPurchase"
          onChange={updateField}
          value={assetToPurchase}
          getItemValue={item => ({
            value: item,
            name: 'assetToPurchase',
            toString: () => item
          })}
          customChangeEvent
        />
      </div>
      <div className={styles.tokenSaleContributionContainer}>
        <div className={styles.tokenSaleContributionSelectToken}>
          <h3 className={styles.tokenSaleSelectionHeader}>Contribution</h3>
          <SelectInput
            items={getAssetsToPurchaseWith()}
            name="assetToPurchaseWith"
            onChange={updateField}
            value={assetToPurchaseWith}
            getItemValue={item => ({
              value: item,
              name: 'assetToPurchaseWith',
              toString: () => item
            })}
            customChangeEvent
          />
        </div>
        <div className={styles.tokenSaleContributionAmount}>
          <h3 className={styles.tokenSaleSelectionHeader}>Amount</h3>
          <NumberInput
            max={maxBalance}
            value={amountToPurchaseFor}
            name="amountToPurchaseFor"
            error={inputErrorMessage}
            className={styles.tokenSaleContributionNumberInput}
            onChange={e =>
              updateField({ name: e.target.name, value: e.target.value })
            }
            handleMaxClick={() =>
              updateField({
                name: 'amountToPurchaseFor',
                value: maxBalance
              })
            }
            customChangeEvent
          />
        </div>
      </div>
    </section>
  )
}

export default TokenSaleSelection
