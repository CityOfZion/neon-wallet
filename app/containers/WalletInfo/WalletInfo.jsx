// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { isNil } from 'lodash'

import Claim from '../Claim'

import Tooltip from '../../components/Tooltip'

import { formatGAS, formatFiat, formatNEO } from '../../core/formatters'
import { ASSETS, CURRENCIES } from '../../core/constants'
import { toNumber } from '../../core/math'

import MdSync from 'react-icons/lib/md/sync'

import styles from './WalletInfo.scss'

import TokensBalance from './TokensBalance'

type Props = {
  address: string,
  NEO: string,
  GAS: string,
  neoPrice: number,
  gasPrice: number,
  tokens: Object,
  loadWalletData: Function,
  currencyCode: string,
  showSuccessNotification: Function,
  showErrorNotification: Function,
  showModal: Function
};

export default class WalletInfo extends Component<Props> {
  refreshBalance = () => {
    const {
      showSuccessNotification,
      showErrorNotification,
      loadWalletData
    } = this.props
    loadWalletData()
      .then(response => {
        showSuccessNotification({
          message: 'Received latest blockchain information.'
        })
      })
      .catch(e => {
        showErrorNotification({
          message: 'Failed to retrieve blockchain information'
        })
      })
  };

  render () {
    const {
      address,
      NEO,
      GAS,
      neoPrice,
      gasPrice,
      tokens,
      showModal,
      currencyCode
    } = this.props

    if (isNil(address)) {
      return null
    }

    let neoValue = neoPrice && NEO !== '0' ? neoPrice * toNumber(NEO) : 0
    let gasValue = gasPrice && GAS !== '0' ? gasPrice * toNumber(GAS) : 0

    let totalValue = neoValue + gasValue

    const displayCurrencyCode = currencyCode.toUpperCase()
    const currencySymbol = CURRENCIES[currencyCode].symbol

    return (
      <div id='accountInfo'>
        <div id='balance'>
          <div className='split'>
            <div className='label'>{ASSETS.NEO}</div>
            <div className='amountBig amountNeo'>{formatNEO(NEO)}</div>
            <div className='fiat neoWalletValue'>
              {currencySymbol}
              {formatFiat(neoValue)} {displayCurrencyCode}
            </div>
          </div>
          <div className='split'>
            <div className='label'>{ASSETS.GAS}</div>
            <div className='amountBig amountGas'>
              <Tooltip title={formatGAS(GAS)} disabled={GAS === 0}>
                {formatGAS(GAS, true)}
              </Tooltip>
            </div>
            <div className='fiat gasWalletValue'>
              {currencySymbol}
              {formatFiat(gasValue)} {displayCurrencyCode}
            </div>
          </div>
          <div className='fiat walletTotal'>
            Total {currencySymbol}
            {formatFiat(totalValue)} {displayCurrencyCode}
          </div>
          <div
            onClick={this.refreshBalance}
            className={classNames(
              styles.refreshIconContainer,
              'refreshBalance'
            )}
          >
            <Tooltip title='Refresh account balance'>
              <MdSync id='refresh' className={styles.refreshIcon} />
            </Tooltip>
          </div>
        </div>
        <div className='spacer' />
        <Claim />
        <TokensBalance tokens={tokens} showModal={showModal} />
      </div>
    )
  }
}
