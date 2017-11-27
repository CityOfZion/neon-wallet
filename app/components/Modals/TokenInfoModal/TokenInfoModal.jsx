// @flow
import React, { Component } from 'react'
import numeral from 'numeral'

import BaseModal from '../BaseModal'
import Table from '../../Table'
import Loader from '../../Loader'

import styles from './TokenInfoModal.scss'

type Props = {
    hideModal: Function,
    token: TokenWithInfoType,
    retrieveTokenInfo: Function
}

type State = {
  token: TokenWithInfoType
}

class TokenInfoModal extends Component<Props, State> {
  state = {
    token: this.props.token
  }

  onAfterOpen = () => {
    const { retrieveTokenInfo, token } = this.props
    if (!token.info) {
      retrieveTokenInfo(token.symbol).then((info) => {
        this.setState({
          token: {
            ...token,
            info
          }
        })
      })
    }
  }

  render () {
    const { hideModal } = this.props
    const { token } = this.state

    return (
      <BaseModal
        onAfterOpen={this.onAfterOpen}
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
                  <td>{numeral(token.info.totalSupply).format('0,0')}</td>
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
  }
}

export default TokenInfoModal
