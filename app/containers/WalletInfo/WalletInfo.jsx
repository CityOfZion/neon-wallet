// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { isNil, keyBy } from 'lodash'

import Claim from '../Claim'

import Tooltip from '../../components/Tooltip'
import Button from '../../components/Button'

import { formatGAS, formatFiat, formatNEO } from '../../core/formatters'
import {
  ASSETS,
  CURRENCIES,
  MODAL_TYPES,
  ENDED_ICO_TOKENS
} from '../../core/constants'
import { toBigNumber } from '../../core/math'

import MdSync from 'react-icons/lib/md/sync'

import styles from './WalletInfo.scss'

import TokenBalances from './TokenBalances'

type Props = {
  address: string,
  NEO: ?string,
  GAS: ?string,
  neoPrice: ?number,
  gasPrice: ?number,
  icoTokenBalances: Array<TokenBalanceType>,
  tokenBalances: Array<TokenBalanceType>,
  loadWalletData: Function,
  currencyCode: string,
  showModal: Function,
  participateInSale: Function,
  allTokens: Array<TokenItemType>,
  setUserGeneratedTokens: Function,
  networks: Array<NetworkItemType>,
  networkId: string,
};

export default class WalletInfo extends Component<Props> {
  render () {
    const {
      address,
      NEO,
      GAS,
      neoPrice,
      gasPrice,
      tokenBalances,
      icoTokenBalances,
      showModal,
      currencyCode,
      participateInSale,
      networks,
      networkId,
      allTokens,
      setUserGeneratedTokens,
      loadWalletData
    } = this.props

    if (isNil(address)) {
      return null
    }

    const invalidPrice = isNil(neoPrice) || isNil(gasPrice)

    const neoValue =
      neoPrice && NEO && NEO !== '0'
        ? toBigNumber(neoPrice).mul(NEO)
        : toBigNumber(0)

    const gasValue =
      gasPrice && GAS && GAS !== '0'
        ? toBigNumber(gasPrice).mul(GAS)
        : toBigNumber(0)

    const totalValue = neoValue.plus(gasValue).toString()

    const displayCurrencyCode = currencyCode.toUpperCase()
    const currencySymbol = CURRENCIES[currencyCode].symbol

    return (
      <div id='accountInfo'>
        <div id='balance'>
          <div className='split'>
            <div className='label'>{ASSETS.NEO}</div>
            <div className='amountBig amountNeo'>
              {NEO ? formatNEO(NEO) : '-'}
            </div>
            <div className='fiat neoWalletValue'>
              {currencySymbol}
              {invalidPrice ? (
                '-'
              ) : (
                <span>
                  {formatFiat(neoValue)} {displayCurrencyCode}
                </span>
              )}
            </div>
          </div>
          <div className='split'>
            <div className='label'>{ASSETS.GAS}</div>
            <div className='amountBig amountGas'>
              {GAS ? (
                <Tooltip title={formatGAS(GAS)} disabled={GAS === 0}>
                  {formatGAS(GAS, true)}
                </Tooltip>
              ) : (
                '-'
              )}
            </div>
            <div className='fiat gasWalletValue'>
              {currencySymbol}
              {invalidPrice ? (
                '-'
              ) : (
                <span>
                  {formatFiat(gasValue)} {displayCurrencyCode}
                </span>
              )}
            </div>
          </div>
          <div className='fiat walletTotal'>
            Total {currencySymbol}
            {invalidPrice ? (
              '-'
            ) : (
              <span>
                {formatFiat(totalValue)} {displayCurrencyCode}
              </span>
            )}
          </div>
          <div
            onClick={loadWalletData}
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
        <TokenBalances tokenBalances={tokenBalances} showModal={showModal} />
        <div
          className={(styles.walletButton, styles.icoButton)}
          onClick={() =>
            showModal(MODAL_TYPES.ICO, {
              assetBalances: {
                [ASSETS.NEO]: NEO,
                [ASSETS.GAS]: GAS
              },
              tokenBalances: keyBy(
                icoTokenBalances.filter(
                  token => !ENDED_ICO_TOKENS.includes(token.symbol)
                ),
                'symbol'
              ),
              showTokensModal: () => {
                showModal(MODAL_TYPES.TOKEN, {
                  tokens: allTokens,
                  networks,
                  networkId,
                  setUserGeneratedTokens,
                  onSave: loadWalletData
                })
              },
              participateInSale
            })
          }
        >
          <Button>Participate in a token sale</Button>
        </div>
      </div>
    )
  }
}
