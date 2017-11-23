// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { isNil } from 'lodash'
import Claim from '../Claim'
import MdSync from 'react-icons/lib/md/sync'
import Tooltip from '../../components/Tooltip'
import { formatGAS, formatFiat } from '../../core/formatters'
import { ASSETS } from '../../core/constants'
import styles from './WalletInfo.scss'
import TokenBalances from './TokenBalances'

type Props = {
  address: string,
  neo: number,
  net: NetworkType,
  gas: number,
  neoPrice: number,
  gasPrice: number,
  tokens: Array<Object>,
  initiateGetBalance: Function,
  showSuccessNotification: Function,
  showErrorNotification: Function,
}

export default class WalletInfo extends Component<Props> {
  componentDidMount () {
    const { initiateGetBalance, net, address } = this.props
    initiateGetBalance(net, address)
  }

  // force sync with balance data
  refreshBalance = () => {
    const {
      showSuccessNotification,
      showErrorNotification,
      initiateGetBalance,
      net,
      address
    } = this.props
    initiateGetBalance(net, address).then((response) => {
      showSuccessNotification({ message: 'Received latest blockchain information.' })
    }).catch(() => {
      showErrorNotification({ message: 'Failed to retrieve blockchain information' })
    })
  }

  render () {
    const { address, neo, gas, neoPrice, gasPrice, tokens } = this.props
    if (isNil(address)) {
      return null
    }

    let neoValue = 0
    let gasValue = 0
    let totalValue = 0

    if (neoPrice && neo) {
      neoValue = formatFiat(neoPrice * neo)
      if (gasPrice && gas) {
        gasValue = formatFiat(gasPrice * gas)
        totalValue = formatFiat(neoPrice * neo + gasPrice * gas)
      }
    }

    return (
      <div id='accountInfo'>
        <div id='balance'>
          <div className='split'>
            <div className='label'>{ASSETS.NEO}</div>
            <div className='amountBig amountNeo'>{neo}</div>
            <div className='fiat neoWalletValue'>US ${neoValue}</div>
          </div>
          <div className='split'>
            <div className='label'>{ASSETS.GAS}</div>
            <div className='amountBig amountGas'>
              <Tooltip title={formatGAS(gas)} disabled={gas === 0}>{formatGAS(gas, true)}</Tooltip>
            </div>
            <div className='fiat gasWalletValue'>US ${gasValue}</div>
          </div>
          <div className='fiat walletTotal'>Total US ${totalValue}</div>
          <div onClick={this.refreshBalance} className={classNames(styles.refreshIconContainer, 'refreshBalance')}>
            <Tooltip title='Refresh account balance'>
              <MdSync id='refresh' className={styles.refreshIcon} />
            </Tooltip>
          </div>
        </div>
        <div className='spacer' />
        <Claim />
        <TokenBalances tokens={tokens} />
      </div>
    )
  }
}
