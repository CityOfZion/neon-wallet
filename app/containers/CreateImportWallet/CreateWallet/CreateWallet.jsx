// @flow
import React from 'react'
import { ROUTES } from '../../../core/constants'
import CloseButton from '../../../components/CloseButton'
import BackButton from '../../../components/BackButton'
import CreateImportWalletForm from '../../../components/CreateImportWalletForm'
import AddIcon from '../../../assets/icons/add.svg'
import FullHeightPanel from '../../../components/Panel/FullHeightPanel'
import styles from './CreateWallet.scss'

type Props = {
  authenticated: boolean,
}

export default class CreateWallet extends React.Component<Props> {
  render = () => {
    const { authenticated } = this.props
    const conditionalPanelProps = {}
    if (authenticated) {
      conditionalPanelProps.renderBackButton = () => (
        <BackButton routeTo={ROUTES.WALLET_MANAGER} />
      )
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.DASHBOARD} />
      )
    } else {
      conditionalPanelProps.renderCloseButton = () => (
        <CloseButton routeTo={ROUTES.HOME} />
      )
    }

    return (
      <FullHeightPanel
        headerText="Create New Wallet"
        renderHeaderIcon={() => (
          <div className={styles.iconDisplay}>
            <AddIcon />
          </div>
        )}
        {...conditionalPanelProps}
      >
        <div className={styles.inputContainer}>
          <CreateImportWalletForm option="CREATE" />
        </div>
      </FullHeightPanel>
    )
  }
}
