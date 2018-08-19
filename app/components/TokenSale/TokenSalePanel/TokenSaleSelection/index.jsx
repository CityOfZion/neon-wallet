import React from 'react'

import SelectInput from '../../../Inputs/SelectInput'
import NumberInput from '../../../Inputs/NumberInput'

import styles from './TokenSaleSelection.scss'

const TokenSaleSelection = () => (
  <section className={styles.tokenSaleSelectionContainer}>
    <div className={styles.tokenSaleSelectTokenContainer}>
      <h3 className={styles.tokenSaleSelectionHeader}>ICO Token</h3>
      <SelectInput items={['RPX', 'GDM']} />
    </div>
    <div className={styles.tokenSaleContributionContainer}>
      <div className={styles.tokenSaleContributionSelectToken}>
        <h3 className={styles.tokenSaleSelectionHeader}>Contribution</h3>
        <SelectInput items={['NEO', 'GAS']} />
      </div>
      <div className={styles.tokenSaleContributionAmount}>
        <h3 className={styles.tokenSaleSelectionHeader}>Amount</h3>
        <NumberInput max={20} value={20} />
      </div>
    </div>
  </section>
)

export default TokenSaleSelection
