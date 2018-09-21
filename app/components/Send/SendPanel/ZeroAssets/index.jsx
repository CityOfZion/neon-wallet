// @flow

import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../../../core/constants'
import NothingIcon from '../../../../assets/icons/nothing.svg'
import TextInput from '../../../Inputs/TextInput'
import CopyToClipboard from '../../../CopyToClipboard'
import LogoWithStrikethrough from '../../../LogoWithStrikethrough'
import styles from './ZeroAssets.scss'

const ZeroAssets = ({ address }: { address: string }) => (
  <section className={styles.zeroAssets}>
    {/* <NotificationIcon />
    <h1 className={styles.zeroAssetsHeaderText}>You have no assets to send.</h1> */}
    {/* renderEmptyBalanceInfo = () => {
    const { address } = this.props */}
    {/* return ( */}
    <div className={styles.emptyBalanceContainer}>
      {/* <div className={styles.headerContainer}>
        <NothingIcon /> <h1> Nothing to see here! </h1>
      </div> */}
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
        {/* <Address className={styles.link} address={address} /> */}
        <CopyToClipboard
          className={styles.copy}
          text={address}
          tooltip="Copy Public Address"
        />
      </div>

      <LogoWithStrikethrough />
    </div>
  </section>
)

export default ZeroAssets
