// @flow
import React, { Component } from 'react'
import { reject, noop } from 'lodash'

import { getNewTokenItem, validateTokens } from './utils'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import Row from './Row'
import NetworkSwitch from '../../../containers/App/Header/NetworkSwitch'

import Add from 'react-icons/lib/md/add'

import styles from './TokenModal.scss'

type Props = {
  hideModal: () => any,
  networkId: string,
  setUserGeneratedTokens: Function,
  tokens: Array<TokenItemType>,
  showErrorNotification: Object => any,
  onSave: () => any
}

type InputErrorType = 'scriptHash';

type State = {
  tokens: Array<TokenItemType>,
  errorItemId: ?number,
  errorType: ?InputErrorType
}

class TokenModal extends Component<Props, State> {
  static defaultProps = {
    onSave: noop
  }

  state = {
    tokens: this.props.tokens,
    errorItemId: null,
    errorType: null
  }

  deleteToken = (id: string) => {
    const { tokens } = this.state

    this.setState({
      tokens: reject(tokens, { id })
    })
  }

  addToken = () => {
    this.setState({
      tokens: [...this.state.tokens, getNewTokenItem(this.props.networkId)]
    })
  }

  saveAndValidateTokens = () => {
    const {
      setUserGeneratedTokens,
      hideModal,
      showErrorNotification,
      onSave
    } = this.props
    const { tokens } = this.state
    const { errorMessage, errorType, errorItemId } = validateTokens(tokens)

    if (errorMessage) {
      showErrorNotification({ message: errorMessage })
      this.setState({
        errorItemId,
        errorType
      })
    } else {
      setUserGeneratedTokens(tokens)
      onSave()
      hideModal()
    }
  }

  updateToken = (id: string, newValue: TokenItemType) => {
    const { tokens } = this.state
    const updatedTokens = [...tokens]
    const tokenIndex = updatedTokens.findIndex(token => token.id === id)
    updatedTokens[tokenIndex] = newValue

    this.setState({
      tokens: updatedTokens,
      errorItemId: null,
      errorType: null
    })
  }

  render () {
    const { hideModal, networkId } = this.props
    const { tokens, errorItemId, errorType } = this.state

    return (
      <BaseModal
        title='Manage Tokens'
        hideModal={hideModal}
        style={{
          content: {
            width: '500px',
            height: '500px'
          }
        }}
      >
        <div className={styles.container}>
          <div className={styles.addToken}>
            <Button onClick={this.addToken}>
              <Add /> Add a new token
            </Button>
            <div className={styles.switchNetworkContainer}>
              <span className={styles.switchNetworkLabel}>Network:</span>
              <NetworkSwitch />
            </div>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault()
              this.saveAndValidateTokens()
            }}
          >
            <div className={styles.rowsContainer}>
              {tokens
                .filter(token => token.networkId === networkId)
                .map((token: TokenItemType) => (
                  <Row
                    token={token}
                    isScriptHashInvalid={
                      errorItemId === token.id && errorType === 'scriptHash'
                    }
                    onChangeScriptHash={(scriptHash: string) =>
                      this.updateToken(token.id, { ...token, scriptHash })
                    }
                    onDelete={() => this.deleteToken(token.id)}
                    key={`tokenOption${token.id}`}
                  />
                ))}
            </div>
            <div className={styles.modalFooter}>
              <Button onClick={this.saveAndValidateTokens}>Save</Button>
              <Button cancel onClick={hideModal}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </BaseModal>
    )
  }
}

export default TokenModal
