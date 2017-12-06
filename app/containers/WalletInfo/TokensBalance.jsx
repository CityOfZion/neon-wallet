// @flow
import React from 'react'

import Table from '../../components/Table'
import Tooltip from '../../components/Tooltip'

import { MODAL_TYPES } from '../../core/constants'
import { formatBalance } from '../../core/formatters'

import InfoOutline from 'react-icons/lib/md/info-outline'

import styles from './TokensBalance.scss'

type Props = {
  tokens: Object,
  showModal: Function,
}

const tokens = ({ tokens, showModal }: Props) => (
  <Table className={styles.table}>
    <thead>
      <tr>
        <th>Token</th>
        <th>Balance</th>
      </tr>
    </thead>
    <tbody>
      {tokens && Object.keys(tokens).map((symbol) => {
        const token = tokens[symbol]
        const { balance } = token
        const formattedBalance = formatBalance(symbol, balance)
        const formattedBalanceDisplay = formatBalance(symbol, balance, true)
        return (
          <tr key={symbol}>
            <td onClick={() => showModal(MODAL_TYPES.TOKEN_INFO, { token })}>
              <span className={styles.symbol}><InfoOutline className={styles.symbolIcon} />{symbol}</span>
            </td>
            <td><Tooltip title={formattedBalance} disabled={balance === 0}>{formattedBalanceDisplay}</Tooltip></td>
          </tr>
        )
      })}
    </tbody>
  </Table>
)

export default tokens
