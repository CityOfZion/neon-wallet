// @flow

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import Button from '../../components/Button'
import Edit from '../../assets/icons/edit.svg'

import styles from './WalletManager.scss'

type Props = {
  label: string,
  address: string,
}

class WalletManager extends Component<Props> {
  render() {
    const { label, address } = this.props
    return (
      <div className={styles.walletInfoRow}>
        <div className={styles.accountLabel}>{label}</div>
        <div className={styles.address}>{address}</div>
        <div className={styles.editAccountButton}>
          <NavLink
            id="import-wallet-authenticated-link"
            exact
            to={`edit-wallet/${address}/${label}`}
          >
            <Button renderIcon={Edit}>
              <FormattedMessage id="manageWalletsEdit" />
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default WalletManager
