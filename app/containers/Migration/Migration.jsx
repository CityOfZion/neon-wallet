// @flow
import React from 'react'
import Button from '../../components/Button'

import HeaderBar from '../../components/HeaderBar'
import CreateMigrationWallet from '../../components/Migration/CreateMigrationWallet'
import TokenSwap from '../../components/Migration/TokenSwap'
import Explanation from '../../components/Migration/Explanation'
import Panel from '../../components/Panel'

import styles from './Migration.scss'

const CREATE_WALLET_STEP = 'CREATE_WALLET_STEP'
const SELECT_TOKEN_STEP = 'SELECT_TOKEN_STEP'
const MIGRATION_HISTORY_STEP = 'MIGRATION_HISTORY_STEP'

type Props = {
  address: string,
}

type State = {
  step: string,
}

export default class Migration extends React.Component<Props, State> {
  state = {
    step: CREATE_WALLET_STEP,
  }

  async componentDidMount() {
    const { address } = this.props
    const hasMigrated = await localStorage.getItem(`hasMigrated-${address}`)
    /*
      TODO: 
        - conditionally display the migration summary OR  the select token
          step depending on if there is any history
    */
    if (hasMigrated) {
      this.setState({ step: SELECT_TOKEN_STEP })
    }
  }

  render() {
    const { step } = this.state
    return (
      <section>
        <HeaderBar shouldRenderRefresh={false} />

        <Panel
          renderHeader={() => (
            <div>
              <h3>Token Migration</h3>
            </div>
          )}
          contentClassName={styles.migrationPanelContent}
        >
          <Explanation />

          {step === CREATE_WALLET_STEP && (
            <CreateMigrationWallet
              handleWalletCreatedComplete={() =>
                this.setState({ step: SELECT_TOKEN_STEP })
              }
            />
          )}

          {step === SELECT_TOKEN_STEP && (
            <TokenSwap
              handleSwapComplete={() =>
                this.setState({ step: MIGRATION_HISTORY_STEP })
              }
            />
          )}
        </Panel>
      </section>
    )
  }
}
