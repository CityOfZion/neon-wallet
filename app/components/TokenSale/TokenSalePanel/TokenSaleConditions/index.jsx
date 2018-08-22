import React from 'react'

import TokenSaleCondition from './TokenSaleCondition'

import styles from './TokenSaleConditions.scss'

const TokenSaleConditions = () => (
  <section className={styles.tokenSaleConditions}>
    <TokenSaleCondition text="I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company" />
    <TokenSaleCondition text="I understand that some sales may only accept NEO or GAS, and I have verified which is accepted" />
    <TokenSaleCondition text="I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company" />
    <TokenSaleCondition text="I understand that some sales may only accept NEO or GAS, and I have verified which is accepted" />
  </section>
)

export default TokenSaleConditions
