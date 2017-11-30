// @flow
import React from 'react'

import Table from '../../components/Table'

import { MODAL_TYPES } from '../../core/constants'
import { formatBalance } from '../../core/formatters'

import InfoOutline from 'react-icons/lib/md/info-outline'

import styles from './TokensBalance.scss'

type Props = {
  tokens: Object,
  showModal: Function,
  retrieveTokenInfo: Function
}

const tokens = ({ tokens, showModal, retrieveTokenInfo }: Props) => (
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
        const { balance, info } = token
        return (
          <tr key={symbol}>
            <td
              className={styles.symbol}
              onClick={() => showModal(MODAL_TYPES.TOKEN_INFO, { token, retrieveTokenInfo })}>
              <InfoOutline className={styles.symbolIcon} />{symbol}
            </td>
            <td>{info ? formatBalance(balance, info.decimals) : balance}</td>
          </tr>
        )
      })}
    </tbody>
  </Table>
)

export default tokens
