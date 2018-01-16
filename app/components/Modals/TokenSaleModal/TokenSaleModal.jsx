// @flow
import React, { Component } from 'react'
import { api } from 'neon-js'
import { isEqual } from 'lodash'

import { MODAL_TYPES } from '../../../core/constants'
import { asyncWrap } from '../../../core/asyncHelper'
import {
  getTokenBalancesMap,
  getTokenScriptHashMap
} from '../../../core/wallet'
import { oldMintTokens } from '../../../core/oldMintTokens'

import BaseModal from '../BaseModal'
import Button from '../../../components/Button'
import AssetInput from '../../../components/Inputs/AssetInput'

import styles from './styles.scss'

type Props = {
  NEO: number,
  GAS: number,
  loadWalletData: Function,
  oldParticipateInSale: Function,
  participateInSale: Function,
  tokenBalances: Array<TokenBalanceType>,
  hideModal: Function,
  showModal: Function,
  showErrorNotification: Function,
  allTokens: Array<TokenItemType>,
  setUserGeneratedTokens: Function,
  networks: Array<NetworkItemType>
}

type State = {
  useOldMintTokens: boolean,
  neoToSend: string,
  gasToSend: string,
  balances: Object,
  scriptHashes: Object,
  symbol: SymbolType
}

const REFRESH_INTERVAL_MS = 30000

export default class TokenSale extends Component<Props, State> {
  state = {
    useOldMintTokens: true,
    neoToSend: '0',
    gasToSend: '0',
    balances: {},
    scriptHashes: {},
    symbol: ''
  }

  componentDidMount() {
    const { tokenBalances } = this.props
    if (tokenBalances.length) {
      this.setState({
        balances: {
          ...getTokenBalancesMap(tokenBalances)
        },
        scriptHashes: {
          ...getTokenScriptHashMap(tokenBalances)
        },
        symbol: tokenBalances && tokenBalances.length && tokenBalances[0].symbol
      })
    }
  }

  componentWillReceiveProps = nextProps => {
    const { tokenBalances } = this.props
    const { symbol } = this.state
    const propsSame = isEqual(tokenBalances, nextProps.tokenBalances)
    if (!propsSame) {
      this.setState({
        balances: {
          ...getTokenBalancesMap(nextProps.tokenBalances)
        },
        scriptHashes: {
          ...getTokenScriptHashMap(nextProps.tokenBalances)
        },
        symbol:
          symbol ||
          (nextProps.tokenBalances &&
            nextProps.tokenBalances.length &&
            nextProps.tokenBalances[0].symbol)
      })
    }
  }

  oldParticipateInSale = () => {
    const { oldParticipateInSale } = this.props
    const { neoToSend, scriptHashes, symbol, gasToSend } = this.state
    oldParticipateInSale(neoToSend, scriptHashes[symbol], null, 0.000001)
    return this.setState({
      neoToSend: '0',
      gasToSend: '0'
    })
  }

  participateInSale = () => {
    const { participateInSale } = this.props
    const { neoToSend, gasToSend, scriptHashes, symbol } = this.state
    participateInSale(neoToSend, gasToSend, scriptHashes[symbol])
    return this.setState({
      neoToSend: '0',
      gasToSend: '0'
    })
  }

  getSymbols = () => {
    const { balances } = this.state
    return Object.keys(balances)
  }

  refreshTokenValues = () => {
    const { loadWalletData } = this.props
    loadWalletData()
  }

  setMintToken = e => {
    const useOldMintTokens = e.target.value === 'verified' ? false : true
    this.setState({ useOldMintTokens })
  }

  render() {
    const { hideModal } = this.props
    return (
      <BaseModal
        title="Token Sale"
        hideModal={hideModal}
        style={{ content: { width: '925px', height: '700px' } }}
      >
        {this.renderDisplay()}
      </BaseModal>
    )
  }

  renderDisplay = () => (
    <div clasName={styles.tokenSale} id="tokenSale">
      <div>
        <div className="description">Participate in Token Sale</div>
        {this.renderWarningText()}
        <div className="settingsForm">
          {this.renderBalances()}
          {this.renderAddToken()}
          {this.renderDropdown()}
          {this.renderSendInputs()}
          {this.renderRadioButtons()}
          {this.renderButtons()}
        </div>
      </div>
    </div>
  )

  switchModals = () => {
    const {
      hideModal,
      setUserGeneratedTokens,
      allTokens,
      showModal,
      networks,
      showErrorNotification
    } = this.props

    showModal(MODAL_TYPES.TOKEN, {
      tokens: allTokens,
      networks,
      setUserGeneratedTokens,
      showErrorNotification
    })
  }

  renderAddToken = () => (
    <div className={styles.mintNewButton}>
      <Button onClick={this.switchModals} secondary>
        Add New Token to Mint
      </Button>
    </div>
  )

  renderSendInputs = () => {
    const { useOldMintTokens, neoToSend, gasToSend } = this.state
    return (
      <div>
        <div className="settingsItem">
          <div className="itemTitle">Amount of NEO to Send:</div>
          <input
            type="text"
            className="neoAmount"
            placeholder="e.g., 100"
            value={neoToSend}
            onChange={e => this.setState({ neoToSend: e.target.value })}
          />
        </div>
        {useOldMintTokens ? null : (
          <div className="settingsItem">
            <div className="itemTitle">Amount of GAS to Send:</div>
            <input
              type="text"
              className="gasAmount"
              placeholder="e.g., 10.51"
              value={gasToSend}
              onChange={e => this.setState({ gasToSend: e.target.value })}
            />
          </div>
        )}
      </div>
    )
  }

  renderDropdown = () => {
    const { symbol } = this.state
    return (
      <div className="settingsItem">
        <div className="itemTitle">Select Token to Mint:</div>
        <AssetInput
          symbols={this.getSymbols()}
          value={symbol}
          onChange={value => this.setState({ symbol: value })}
        />
      </div>
    )
  }

  renderBalances = () => {
    const { NEO, GAS } = this.props
    const { balances, symbol } = this.state
    const tokenBalance = balances[symbol] || 0
    return (
      <div>
        <div className="settingsItem">
          <div className="itemTitle">NEO Balance:</div>
          <div>{NEO}</div>
        </div>
        <div className="settingsItem">
          <div className="itemTitle">GAS Balance:</div>
          <div>{GAS}</div>
        </div>
        <div className="settingsItem">
          <div className="itemTitle">Token Balance:</div>
          <div>{tokenBalance}</div>
        </div>
      </div>
    )
  }

  renderButtons = () => {
    const { neoToSend, gasToSend, symbol, useOldMintTokens } = this.state
    const submitSaleButtonDisabled = (!neoToSend && !gasToSend) || !symbol
    const refreshButtonDisabled = !symbol

    return (
      <div>
        {useOldMintTokens ? (
          <Button
            secondary
            onClick={this.oldParticipateInSale}
            disabled={submitSaleButtonDisabled}
          >
            Submit for Sale
          </Button>
        ) : (
          <Button
            secondary
            onClick={this.participateInSale}
            disabled={submitSaleButtonDisabled}
          >
            Submit for Sale
          </Button>
        )}
        <div className={styles.refreshButton}>
          <Button
            secondary
            onClick={this.refreshTokenValues}
            disabled={refreshButtonDisabled}
          >
            Refresh Balances
          </Button>
        </div>
      </div>
    )
  }

  renderRadioButtons = () => {
    const { useOldMintTokens } = this.state

    return (
      <div className={styles.switchMintTokens}>
        <p>
          <b>IMPORTANT:</b> Please consult with the company doing the ICO
          whether their smart contract performs verification or not
        </p>
        <div onChange={this.setMintToken}>
          <input
            type="radio"
            checked={useOldMintTokens}
            value="nonverified"
            name="nonverified"
          />{' '}
          Non Verified
          <input
            checked={!useOldMintTokens}
            type="radio"
            value="verified"
            name="verified"
          />{' '}
          verified
        </div>
      </div>
    )
  }

  renderWarningText = () => {
    return (
      <div className="warning">
        <b>WARNING:</b> Be very careful with how you participate in a sale! This
        interface may not work for all sales! Submitting NEO multiple times to a
        sale may result in lost funds or a delayed refund depending on the
        policy of the sale. Some sales also might only accept GAS or NEO and not
        both. Please make sure you are sending the correct assets. CoZ is not
        responsible for any mistakes you make participating in a sale. After
        submitting to a sale, you will need to <b>WAIT SOME TIME</b> for the
        balance of tokens to refresh. You can click "Refresh Token" after 10s if
        you still do not see anything. It is also possible that nodes may not
        update properly with your token balance, so <b>THINK VERY CAREFULLY</b>{' '}
        before resubmitting to a sale. Do not click "Submit" twice. CoZ does not
        endorse any token sale!
      </div>
    )
  }
}
