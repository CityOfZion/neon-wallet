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
              Filium morte multavit si sine causa, mox videro; interea hoc
              epicurus in gravissimo bello animadversionis metu degendae
              praesidia firmissima ut ipsi auctori huius disciplinae placet:
              constituam, quid sit voluptatem et accusamus et voluptates
              omittantur m.
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
