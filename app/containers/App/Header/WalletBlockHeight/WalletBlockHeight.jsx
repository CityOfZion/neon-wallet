// @flow
import React from 'react'

import headerStyles from '../Header.scss'

type Props = {
  blockHeight: number
}

const WalletBlockHeight = ({ blockHeight }: Props) => (
  <div className={headerStyles.navBarItem}>
    <span className={headerStyles.navBarItemLabel}>Block</span>
    <span>{blockHeight}</span>
  </div>
)

export default WalletBlockHeight
