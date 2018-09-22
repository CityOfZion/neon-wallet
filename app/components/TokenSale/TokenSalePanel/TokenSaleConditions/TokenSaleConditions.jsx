import React from 'react'

import TokenSaleCondition from './TokenSaleCondition/TokenSaleCondition'

import uniqueKey from '../../../../util/uniqueKey'
import styles from './TokenSaleConditions.scss'

const TokenSaleConditions = ({
  conditions,
  updateConditions,
  acceptedConditions
}) => (
  <section className={styles.tokenSaleConditions}>
    {conditions.map(condition => {
      const checked = acceptedConditions.find(
        acceptedCondition => acceptedCondition === condition
      )
      return (
        <TokenSaleCondition
          text={condition}
          key={uniqueKey()}
          updateConditions={updateConditions}
          checked={checked}
        />
      )
    })}
  </section>
)

export default TokenSaleConditions
