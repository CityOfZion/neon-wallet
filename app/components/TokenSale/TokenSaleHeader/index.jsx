import React from 'react'

import RefreshIcon from '../../../assets/icons/refresh.svg'
import styles from './TokenSaleHeader.scss'

const TokenSaleHeader = () => (
  <section className={styles.tokenSaleHeader}>
    <h1>Token Sale</h1>
    <button type="button">
      <RefreshIcon />
      Refresh
    </button>
  </section>
)

export default TokenSaleHeader
