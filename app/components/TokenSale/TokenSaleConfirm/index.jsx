import React from 'react'

import Panel from '../../Panel'
import Logo from '../../../assets/icons/neonLogoGrey.svg'

import styles from './TokenSaleConfirm.scss'

const TokenSaleConfirm = () => (
  <Panel className={styles.tokenSaleConfirmPanel} renderHeader={() => <Logo />}>
    hello
  </Panel>
)

export default TokenSaleConfirm
