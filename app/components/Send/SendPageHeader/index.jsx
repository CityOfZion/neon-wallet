import React, { Component } from 'react'

import SelectBox from '../../Inputs/SelectBox'
import RefreshIcon from '../../../assets/icons/refresh.svg'

import styles from './SendPageHeader.scss'

class SendPageHeader extends Component {
  render() {
    return (
      <section className={styles.sendPageHeader}>
        <h1 className={styles.sendPageHeading}>Send Assets</h1>
        <SelectBox
          options={['Main Account Wallet', 'Secondary Account Wallet']}
          onChangeHandler={() => {}}
        />
        <button className={styles.sendPageHeaderRefreshButton} type="button">
          <RefreshIcon className={styles.sendPageHeaderRefreshIcon} />Refresh
        </button>
      </section>
    )
  }
}
export default SendPageHeader
