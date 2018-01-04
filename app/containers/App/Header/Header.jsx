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
  blockHeight: number,
  neoPrice: number,
  gasPrice: number,
  currencyCode: string,
  logout: Function,
  isLoggedIn: boolean,
  net: NetworkType,
  loadWalletData: Function,
  setNetwork: Function
}

const Header = ({
  blockHeight,
  logout,
  neoPrice,
  gasPrice,
  currencyCode,
  isLoggedIn,
  net,
  setNetwork,
  loadWalletData
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
      <WalletBlockHeight blockHeight={blockHeight} />
      <WalletVersion version={version} />
      <NetworkSwitch
        net={net}
        setNetwork={setNetwork}
        loadWalletData={loadWalletData}
      />
      <Logout onClick={logout} />
    </div>
    }
  </div>
)

export default Header
