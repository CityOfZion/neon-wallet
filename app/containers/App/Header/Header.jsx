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
  isLoggedIn: boolean,
  networkId: string,
  networks: Array<NetworkItemType>,
  logout: () => any,
  onChangeNetwork: Function
}

const Header = ({
  blockHeight,
  logout,
  neoPrice,
  gasPrice,
  currencyCode,
  isLoggedIn,
  networkId,
  networks,
  onChangeNetwork
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
        networkId={networkId}
        networks={networks}
        onChange={onChangeNetwork}
      />
      <Logout onClick={logout} />
    </div>
    }
  </div>
)

export default Header
