// @flow
import React from 'react'
import Check from 'react-icons/lib/fa/check'
import { map } from 'lodash'

import Button from '../../../../components/Button'
import toSentence from '../../../../util/toSentence'
import styles from './styles.scss'

type Props = {
  onClose: () => any,
  assetBalancesToSend: { [key: SymbolType]: string },
  token: TokenBalanceType
}

export default class ParticipationSuccess extends React.Component<Props> {
  render () {
    const { onClose, token } = this.props
    const { scriptHash, name, symbol } = token
    return (
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <Check />
        </div>
        <div className={styles.heading}>Participation successful!</div>
        <div className={styles.subHeading}>
          Your balances may take time to update - please be patient
        </div>
        <div className={styles.confirmation}>
          <div>You sent <strong>{this.getAmounts()}</strong></div>
          <div>To: <strong>{scriptHash}</strong></div>
          <div>For: <strong>{symbol} ({name})</strong></div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={() => onClose()}>I'm Finished</Button>
        </div>
      </div>
    )
  }

  getAmounts = () => {
    const amounts = map(this.props.assetBalancesToSend, (amount, symbol) => (
      [amount || 0, symbol].join(' ')
    ))

    return toSentence(amounts)
  }
}
