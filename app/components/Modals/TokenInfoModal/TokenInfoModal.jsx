// @flow
import React from 'react'
import BaseModal from '../BaseModal'
import Table from '../../Table'

import styles from './TokenInfoModal.scss'

type Props = {
    hideModal: Function,
    token: TokenType
}

const TokenInfoTypeModal = (props: Props) => {
  const { hideModal, token } = props
  const { symbol, balance, info: { name, totalSupply, decimals } } = token

  return (
    <BaseModal
      title='Token Info'
      hideModal={hideModal}
      style={{
        content: {
          width: '350px',
          height: '250px'
        }
      }}
    >
      <div className={styles.container}>
        <Table>
          <tbody>
            <tr>
              <td>Symbol:</td>
              <td>{symbol}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Total Supply:</td>
              <td>{totalSupply}</td>
            </tr>
            <tr>
              <td>Decimals</td>
              <td>{decimals}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{balance}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </BaseModal>
  )
}

export default TokenInfoTypeModal
