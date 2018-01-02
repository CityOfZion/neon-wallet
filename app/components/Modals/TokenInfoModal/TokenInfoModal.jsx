// @flow
import React from 'react'

import BaseModal from '../BaseModal'
import Table from '../../Table'

import { formatBalance, formatThousands } from '../../../core/formatters'

import styles from './TokenInfoModal.scss'

type Props = {
    hideModal: Function,
    token: TokenType,
}

const TokenInfoModal = ({ hideModal, token }: Props) => (
  <BaseModal
    title='Token Info'
    hideModal={hideModal}
    style={{
      content: {
        width: '350px',
        height: '300px'
      }
    }}
  >
    <div className={styles.container}>
      <Table>
        <tbody>
          <tr>
            <td>Symbol:</td>
            <td>{token.symbol}</td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{token.name}</td>
          </tr>
          <tr>
            <td>Total Supply:</td>
            <td>{formatThousands(token.totalSupply)}</td>
          </tr>
          <tr>
            <td>Decimals</td>
            <td>{token.decimals}</td>
          </tr>
          <tr>
            <td>Balance</td>
            <td>{formatBalance(token.symbol, token.balance)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  </BaseModal>
)

export default TokenInfoModal
