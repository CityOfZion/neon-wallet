// @flow
import React from 'react'

import Table from '../../components/Table'

import { MODAL_TYPES } from '../../core/constants'

import InfoOutline from 'react-icons/lib/md/info-outline'

import styles from './TokensBalance.scss'

type Props = {
  tokens: Array<TokenType>,
  showModal: Function
}

const addTokenRows = (tokens, showModal) => {
  return tokens.map((token: TokenType) => {
    const { symbol, balance } = token
    return (
      <tr key={symbol}>
        <td
          className={styles.symbol}
          onClick={() => showModal(MODAL_TYPES.TOKEN_INFO, { token })}>
          <InfoOutline className={styles.symbolIcon} />{symbol}
        </td>
        <td>{balance}</td>
      </tr>
    )
  })
}

const tokens = ({ tokens, showModal }: Props) => (
  <div>
    {tokens.length > 0 &&
      <Table>
        <thead>
          <th>Token</th>
          <th>Balance</th>
        </thead>
        <tbody>
          {addTokenRows(tokens, showModal)}
        </tbody>
      </Table>
    }
  </div>
)

export default tokens
