// @flow
import React from 'react'
import Check from 'react-icons/lib/fa/check'

import Button from '../../../../components/Button'

import styles from './styles.scss'

type Props = {
  hideModal: () => any,
  assetBalancesToSend: {
    [key: SymbolType]: string
  },
  scriptHash: string
}

const formatAssetBalances = assetBalancesToSend => {
  const balances = []
  Object.keys(assetBalancesToSend).forEach(symbol => {
    const balance = assetBalancesToSend[symbol]
    if (balance) {
      balances.push(`${balance} ${symbol}`)
    }
  })

  return balances.join(', ')
}

const ParticipationSuccess = ({ hideModal, scriptHash, assetBalancesToSend }: Props) => {
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
        <div>You sent <strong>{formatAssetBalances(assetBalancesToSend)}</strong></div>
        <div>To: <strong>{scriptHash}</strong></div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => hideModal()}>I'm Finished</Button>
      </div>
    </div>
  )
}

export default ParticipationSuccess
