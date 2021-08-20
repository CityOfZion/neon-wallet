// @flow
import React from 'react'
import Send from '../../../containers/Send'

import styles from './TokenSwap.scss'

type Props = {
  handleSwapComplete: () => void,
}

type State = {}

export default class TokenSwap extends React.Component<Props, State> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.explanation}>
          <div>
            <h3> Select a token to migrate</h3>
            <p>
              You can migrate using multiple transactions in Neon Wallet so don't
              feel obligated to migrate all of your assets in a single event if you
              aren't comfortable doing so.
            </p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <Send
            isMigration
            handleSwapComplete={this.props.handleSwapComplete}
          />
        </div>
      </div>
    )
  }
}
