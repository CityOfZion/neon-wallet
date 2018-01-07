// @flow
import React from 'react'

import headerStyles from '../Header.scss'

type Props = {
  version: number
}

const WalletVersion = ({ version }: Props) => (
  <div className={headerStyles.navBarItem}>
    <span className={headerStyles.navBarItemLabel}>Version</span>
    <span>{version}</span>
  </div>
)

export default WalletVersion
