// @flow
import React, { Component } from 'react'
import { reject, noop, isEqual, cloneDeep } from 'lodash-es'

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
import { getNetworks } from '../../../core/networks'

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
  errorType: ?InputErrorType,
  networkOption: NetworkItemType
}

class TokenModal extends Component<Props, State> {
  static defaultProps = {
    onSave: noop
  }

  state = {
    tokens: this.props.tokens,
    errorItemId: null,
    errorType: null,
    networkOption:
      getNetworks().find(network => network.id === this.props.networkId) ||
      getNetworks()[0]
  }

  deleteToken = (id: string) => {
    const { tokens } = this.state

    this.setState({
      tokens: reject(tokens, { id })
    })
  }

  addToken = () => {
    const { networkOption } = this.state
    this.setState(state => ({
      tokens: [...state.tokens, getNewTokenItem(networkOption.id)]
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

    const newlyAddedTokens = tokens.filter(token => token.isNotValidated)

    const { errorMessage, errorType, errorItemId } = validateTokens(
      newlyAddedTokens,
      this.props.tokens
    )

    if (errorMessage) {
      showErrorNotification({ message: errorMessage })
      this.setState({
        errorItemId,
        errorType
      })
    } else {
      const validatedTokens = tokens.map(token => {
        if (token.isNotValidated) {
          const validatedToken = cloneDeep(token)
          delete validatedToken.isNotValidated
          return validatedToken
        }
        return token
      })
      setUserGeneratedTokens([...validatedTokens])
      setTimeout(() => {
        onSave()
        hideModal()
      }, 100)
    }
  }

  updateToken = (id: string, newValue: TokenItemType) => {
    const clonedNewValue = cloneDeep(newValue)

    const { tokens } = this.state
    const updatedTokens = [...tokens]
    const tokenIndex = updatedTokens.findIndex(token => token.id === id)

    clonedNewValue.isNotValidated = true
    updatedTokens[tokenIndex] = clonedNewValue
    this.setState({
      tokens: updatedTokens,
      errorItemId: null,
      errorType: null
    })
  }

  shouldDisableSaveButton = () =>
    this.state.tokens.filter(token => !token.scriptHash).length

  render() {
    const { hideModal } = this.props
    const { tokens, errorItemId, errorType, networkOption } = this.state
    const networkId = networkOption.id

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
              <NetworkSwitch
                handleControlledChange={option =>
                  this.setState({ networkOption: option })
                }
                value={this.state.networkOption}
                shouldSwitchNetworks={false}
              />
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
                      token.networkId === this.state.networkOption.id &&
                      token.isUserGenerated
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
