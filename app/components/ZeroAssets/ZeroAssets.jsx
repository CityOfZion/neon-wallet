// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import TextInput from '../Inputs/TextInput'
import CopyToClipboard from '../CopyToClipboard'
import LogoWithStrikethrough from '../LogoWithStrikethrough'
import Panel from '../Panel'
import styles from './ZeroAssets.scss'

type Props = {
  address: string,
  children?: React$Node
}

const ZeroAssets = ({ address, children }: Props) => (
  <Panel renderHeader={() => <p>No available assets to send</p>}>
    <section className={styles.zeroAssets}>
      <div className={styles.emptyBalanceContainer}>
        <p>
          You’ll need to <b>transfer compatible NEP-5 assets</b> to this wallet
          using{' '}
          <NavLink id="wallet-manager" exact to={ROUTES.RECEIVE}>
            <span> Receive </span>
          </NavLink>{' '}
          or your public address:
        </p>
        <div className={styles.address}>
          <TextInput value={address} disabled />
          <CopyToClipboard
            className={styles.copy}
            text={address}
            tooltip="Copy Public Address"
          />
        </div>
        <LogoWithStrikethrough />
      </div>
    </section>
    {children}
  </Panel>
)

export default ZeroAssets
