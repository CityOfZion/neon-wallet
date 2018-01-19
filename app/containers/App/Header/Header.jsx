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

type Props = {
  neoPrice: number,
  gasPrice: number,
  currencyCode: string,
  isLoggedIn: boolean,
  logout: () => any
}

const Header = ({
  logout,
  neoPrice,
  gasPrice,
  currencyCode,
  isLoggedIn
}: Props) => (
  <div className={styles.container}>
    <Logo />
    {isLoggedIn &&
    <div className={styles.navBar}>
      <PriceDisplay
        neoPrice={neoPrice}
        gasPrice={gasPrice}
        currencyCode={currencyCode}
      />
      <WalletBlockHeight />
      <WalletVersion version={version} />
      <NetworkSwitch />
      <Logout onClick={logout} />
    </div>
    }
  </div>
)

export default Header
