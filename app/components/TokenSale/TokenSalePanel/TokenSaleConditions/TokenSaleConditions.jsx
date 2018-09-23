// @flow
import React from 'react'

import TokenSaleCondition from './TokenSaleCondition/TokenSaleCondition'

import uniqueKey from '../../../../util/uniqueKey'
import styles from './TokenSaleConditions.scss'

type Props = {
  conditions: Array<string>,
  updateConditions: (condition: string) => void,
  acceptedConditions: Array<string>
}

const TokenSaleConditions = ({
  conditions,
  updateConditions,
  acceptedConditions
}: Props) => (
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
          checked={!!checked}
        />
      )
    })}
  </section>
)

export default TokenSaleConditions
