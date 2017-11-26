// @flow
import React from 'react'

import BaseModal from '../BaseModal'

import Table from '../../Table'
import Loader from '../../Loader'

import styles from './TokenInfoModal.scss'

type Props = {
    hideModal: Function,
    token: TokenWithInfoType,
    retrieveTokenInfo: Function
}

const TokenInfoTypeModal = ({ hideModal, token, retrieveTokenInfo }: Props) => (
  <BaseModal
    onAfterOpen={() => retrieveTokenInfo(token.symbol)}
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
      {!token.info ? <Loader /> : (
        <Table>
          <tbody>
            <tr>
              <td>Symbol:</td>
              <td>{token.symbol}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{token.info.name}</td>
            </tr>
            <tr>
              <td>Total Supply:</td>
              <td>{token.info.totalSupply}</td>
            </tr>
            <tr>
              <td>Decimals</td>
              <td>{token.info.decimals}</td>
            </tr>
            <tr>
              <td>Balance</td>
              <td>{token.balance}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  </BaseModal>
)

export default TokenInfoTypeModal
