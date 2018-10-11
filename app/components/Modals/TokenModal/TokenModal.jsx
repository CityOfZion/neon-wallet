// @flow
import React, { Component } from 'react'
import { reject, noop, isEqual } from 'lodash-es'

import { getNewTokenItem, validateTokens } from './utils'

import { TEST_NETWORK_ID } from '../../../core/constants'
import Tooltip from '../../Tooltip'
import BaseModal from '../BaseModal'
import Button from '../../Button'
import Row from './Row'
import NetworkSwitch from '../../../containers/App/Sidebar/NetworkSwitch'
import AddIcon from '../../../assets/icons/add.svg'
import styles from './TokenModal.scss'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'

type Props = {
  hideModal: () => any,
  networkId: string,
  setUserGeneratedTokens: Function,
  tokens: Array<TokenItemType>,
  showErrorNotification: Object => any,
  onSave: () => any
}

type InputErrorType = 'scriptHash'

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
    this.setState(state => ({
      tokens: [...state.tokens, getNewTokenItem(this.props.networkId)]
    }))
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

  shouldDisableSaveButton = () => {
    const { tokens } = this.state

    const invalidUserGeneratedTokens = tokens.filter(
      (token: TokenItemType) =>
        token.isUserGenerated && !token.scriptHash.length
    )

    if (
      isEqual(tokens, this.props.tokens) ||
      invalidUserGeneratedTokens.length ||
      tokens.length === this.props.tokens.length
    ) {
      return true
    }

    return false
  }

  render() {
    const { hideModal, networkId } = this.props
    const { tokens, errorItemId, errorType } = this.state

    const customTokenListLength = tokens.filter(
      token => token.networkId === networkId && token.isUserGenerated
    ).length

    return (
      <BaseModal
        title="Manage Tokens"
        hideModal={hideModal}
        style={{
          content: {
            width: '550px',
            height: '550px'
          }
        }}
      >
        <div className={styles.container}>
          <div className={styles.addToken}>
            <Button
              onClick={this.addToken}
              className={styles.addTokenButton}
              renderIcon={AddIcon}
            >
              Add a new token
            </Button>
            <div className={styles.switchNetworkContainer}>
              <NetworkSwitch shouldSwitchNetworks={false} />
            </div>
          </div>
          <form
            onSubmit={e => {
              e.preventDefault()
              this.saveAndValidateTokens()
            }}
          >
            <div className={styles.rowsContainer}>
              {!customTokenListLength ? (
                <LogoWithStrikethrough />
              ) : (
                tokens
                  .filter(
                    token =>
                      token.networkId === networkId && token.isUserGenerated
                  )
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
                  ))
              )}
            </div>
            <div className={styles.modalFooter}>
              <Button
                primary
                disabled={this.shouldDisableSaveButton()}
                onClick={this.saveAndValidateTokens}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </BaseModal>
    )
  }
}

export default TokenModal
