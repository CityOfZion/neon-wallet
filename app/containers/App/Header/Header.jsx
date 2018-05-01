// @flow
import React from 'react'

import { version } from '../../../../package.json'

import WalletVersion from './WalletVersion'
import WalletBlockHeight from './WalletBlockHeight'
import NetworkSwitch from './NetworkSwitch'
import PriceDisplay from './PriceDisplay'

import Logout from './Logout'
import styles from './Header.scss'

import logo from '../../../images/neon-logo2.png'

const Logo = () => <div><img src={logo} width='60px' /></div>
const wallet = <WalletVersion version={version} />

type Props = {
  address: string,
  neoPrice: number,
  gasPrice: number,
  currencyCode: string
}

const Header = ({
  address,
  neoPrice,
  gasPrice,
  currencyCode
}: Props) => (
  <div className={styles.container}>
    <Logo />
    {!address && wallet}
    {address &&
    <div className={styles.navBar}>
      <PriceDisplay
        neoPrice={neoPrice}
        gasPrice={gasPrice}
        currencyCode={currencyCode}
      />
      <WalletBlockHeight />
      {wallet}
      <NetworkSwitch />
      <Logout />
    </div>
    }
  </div>
)

export default Header
