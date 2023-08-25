// @flow
import React from 'react'
import { uniqueId, get } from 'lodash-es'
import { wallet } from '@cityofzion/neon-js-legacy'
import { wallet as n3Wallet } from '@cityofzion/neon-js'
import { FormattedMessage, IntlShape } from 'react-intl'

import {
  toNumber,
  toBigNumber,
  multiplyNumber,
  minusNumber,
  addNumber,
} from '../../core/math'
import { isBlacklisted } from '../../core/wallet'
import { MODAL_TYPES, PRICE_UNAVAILABLE } from '../../core/constants'
import AmountsPanel from '../../components/AmountsPanel'
import SendPanel from '../../components/Send/SendPanel'
import HeaderBar from '../../components/HeaderBar'
import WarningIcon from '../../assets/icons/warning.svg'
import styles from './Send.scss'
import DialogueBox from '../../components/DialogueBox'

const MAX_NUMBER_OF_RECIPIENTS = 25
const MIN_EXPECTED_N3_GAS_FEE = 0.072

type Props = {
  sendableAssets: Object,
  prices: Object,
  sendTransaction: ({
    sendEntries: Array<SendEntryType>,
    fees: number,
    tokens: Array<TokenItemType>,
  }) => Object,
  performMigration: ({
    sendEntries: Array<SendEntryType>,
    migrationAddress: string,
    net: string,
  }) => Object,
  calculateN3Fees: ({
    sendEntries: Array<SendEntryType>,
    tokens: Array<TokenItemType>,
  }) => Object,
  contacts: Object,
  currency: string,
  address: string,
  shouldRenderHeaderBar: boolean,
  location: Object,
  showSendModal: (props: Object) => any,
  tokens: Array<TokenItemType>,
  networkId: string,
  isWatchOnly?: boolean,
  showGeneratedTransactionModal: Object => void,
  showImportModal: (props: Object) => void,
  intl: IntlShape,
  chain: string,
  isMigration: boolean,
  wif: string,
  handleSwapComplete: () => void,
  showModal: (modalType: string, modalProps: Object) => any,
  migrationAddress?: string,
  net: string,
}

type State = {
  showConfirmSend: boolean,
  pendingTransaction: boolean,
  sendSuccess: boolean,
  sendError: boolean,
  sendErrorMessage: string,
  txid: string,
  fees: number,
  sendRowDetails: Array<Object>,
  address?: string,
  hasEnoughGas: boolean,
  n3Fees: {
    systemFee: string,
    networkFee: string,
  },
  loading: boolean,
  expectedGasFee: string | number,
  isSendingTotalAmountOfGas: boolean,
}

export default class Send extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      showConfirmSend: false,
      pendingTransaction: false,
      sendSuccess: false,
      sendError: false,
      sendErrorMessage: '',
      txid: '',
      sendRowDetails: [],
      fees: 0,
      n3Fees: {
        systemFee: '0',
        networkFee: '0',
      },
      hasEnoughGas: true,
      loading: false,
      expectedGasFee: MIN_EXPECTED_N3_GAS_FEE,
      isSendingTotalAmountOfGas: false,
    }
  }

  static defaultProps = {
    shouldRenderHeaderBar: true,
    tokens: [],
  }

  async componentDidMount() {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      newState.push(this.generateRow())

      return { sendRowDetails: newState }
    })
    if (this.props.location && this.props.location.state) {
      const { address } = this.props.location.state
      if (address) {
        this.updateRowField(0, 'address', address)
      }
    }

    if (this.props.isMigration) {
      const account = this.props.migrationAddress
        ? new n3Wallet.Account(this.props.migrationAddress)
        : new n3Wallet.Account(this.props.wif)
      this.updateRowField(0, 'address', account.address)
    }

    if (this.props.chain === 'neo3') {
      // Calculate expected gas fee
      this.setState({ loading: true })
      const results = await this.attemptToCalculateN3Fees([])
      if (results) {
        const transactionFee = (
          Number(results.networkFee) + Number(results.systemFee)
        ).toFixed(8)
        this.setState({ expectedGasFee: transactionFee })
      }
    }
  }

  pushQRCodeData = (data: Object) => {
    const { sendRowDetails } = this.state
    const { asset, address, amount } = data
    const currIndex = sendRowDetails.length - 1
    if (asset) this.updateRowField(currIndex, 'asset', asset)
    if (address) {
      this.clearErrors(currIndex, 'address')
      this.updateRowField(currIndex, 'address', address)
      setTimeout(() => {
        this.validateAddress(address, currIndex)
      }, 500)
    }
    if (amount) this.updateRowField(currIndex, 'amount', amount)
  }

  generateRow = (row: Object = {}) => {
    const { sendableAssets } = this.props
    const sendableAssetNames = Object.keys(sendableAssets)
    const firstSendableAssetName = sendableAssetNames[0]

    if (sendableAssetNames.length > 0) {
      return {
        asset: row.asset || firstSendableAssetName,
        amount: row.amount || 0,
        address: row.address || '',
        max: this.calculateMaxValue(row.asset || firstSendableAssetName),
        id: uniqueId(),
        errors: {},
      }
    }
    return {
      errors: {},
    }
  }

  // TODO: Move this logic to AmountsPanel / Centralized place
  createSendAmountsData = () => {
    const { sendableAssets, prices } = this.props

    const assets = Object.keys(sendableAssets)

    return (assets.map((asset: string) => {
      const { balance } = sendableAssets[asset]
      const price = prices[asset]

      const totalBalanceWorth = price
        ? multiplyNumber(balance, price)
        : PRICE_UNAVAILABLE

      return {
        symbol: asset,
        totalBalance: balance,
        price,
        totalBalanceWorth,
      }
    }): Array<*>)
  }

  removeRow = (index: number) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      if (newState.length > 1) {
        newState.splice(index, 1)
      }

      if (this.props.chain === 'neo3') {
        this.attemptToCalculateN3Fees(newState)
      }
      return { sendRowDetails: newState }
    })
  }

  addRow = (row?: Object) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      if (newState.length < MAX_NUMBER_OF_RECIPIENTS) {
        newState.push(this.generateRow(row))
        return { sendRowDetails: newState }
      }
      return prevState
    })
  }

  updateRowField = (index: number, field: string, value: string) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]
      const objectToModify = newState[index]
      objectToModify[field] = value

      if (field === 'asset') {
        objectToModify.amount = 0
        const maxValue = this.calculateMaxValue(objectToModify.asset)
        objectToModify.max = maxValue
      }

      if (field === 'amount' && value) {
        objectToModify.max = this.calculateMaxValue(objectToModify.asset, index)
      }

      if (field === 'address') {
        objectToModify.address = value
      }

      if (this.props.chain === 'neo3') {
        this.attemptToCalculateN3Fees(newState)
      }

      return { sendRowDetails: newState }
    })
  }

  attemptToCalculateN3Fees = async (sendRowDetails: Array<Object>) => {
    if (!sendRowDetails.length) {
      const fees = await this.props
        .calculateN3Fees({
          tokens: this.props.tokens,
          sendEntries: [
            // $flow-fix-me
            { address: this.props.address, amount: 1, symbol: 'GAS' },
          ],
        })
        .catch(() => {
          console.warn('An error occurred attempting to calculate fees')
        })
      return fees
    }

    const sendEntries = sendRowDetails.map((row: Object) => ({
      address: row.address,
      amount: toNumber(row.amount.toString()),
      symbol: row.asset || 'GAS',
    }))

    if (this.props.sendableAssets.GAS) {
      const totalGasBeingSent = sendEntries.reduce((prev, curr) => {
        if (curr.symbol === 'GAS') {
          return prev + curr.amount
        }
        return 0
      }, 0)
      if (
        (Number(totalGasBeingSent) + Number(this.state.expectedGasFee)).toFixed(
          8,
        ) ===
        Number(
          this.props.sendableAssets.GAS
            ? this.props.sendableAssets.GAS.balance
            : 0,
        ).toFixed(8)
      ) {
        this.setState({ isSendingTotalAmountOfGas: true })
      } else {
        this.setState({ isSendingTotalAmountOfGas: false })
      }
    }

    let shouldCalculateFees = true

    sendEntries.forEach(entry => {
      if (!n3Wallet.isAddress(entry.address)) {
        shouldCalculateFees = false
      }
    })

    if (shouldCalculateFees) {
      const fees = await this.props
        .calculateN3Fees({ sendEntries, tokens: this.props.tokens })
        .catch(() => {
          console.warn('An error occurred attempting to calculate fees')
        })
      // eslint-disable-next-line
      this.setState({
        n3Fees: fees,
        loading: false,
      })
    }
  }

  calculateMaxValue = (asset: string, index: number = 0) => {
    const { sendableAssets, chain } = this.props

    if (chain === 'neo2') {
      if (sendableAssets[asset]) {
        const rows = [...this.state.sendRowDetails]
        const rowsWithAsset = rows.filter(row => row.asset === asset)
        const existingAmounts = this.calculateRowAmounts(asset, index)
        const decimals = this.calculateDecimals(asset)
        const totalSendableAssets = toBigNumber(sendableAssets[asset].balance)
        if (rowsWithAsset.length === 1 || rowsWithAsset.length === 0) {
          return toNumber(sendableAssets[asset].balance).toFixed(decimals)
        }
        return minusNumber(totalSendableAssets, existingAmounts).toFixed(
          decimals,
        )
      }
      return '0'
    }

    if (sendableAssets[asset]) {
      const rows = [...this.state.sendRowDetails]
      const rowsWithAsset = rows.filter(row => row.asset === asset)
      const existingAmounts = this.calculateRowAmounts(asset, index)
      const decimals = this.calculateDecimals(asset)
      let totalSendableAssets = toBigNumber(sendableAssets[asset].balance)

      if (asset === 'GAS') {
        const existingGasAmounts =
          Number(this.calculateRowAmounts(asset, index)) -
          Number(this.state.expectedGasFee)

        totalSendableAssets = minusNumber(
          totalSendableAssets,
          Number(this.state.expectedGasFee) * rowsWithAsset.length,
        )

        if (totalSendableAssets < 0) {
          // this.props.showErrorNotification({ message: 'oops' })
          return toNumber(sendableAssets[asset].balance).toFixed(decimals)
        }

        if (rowsWithAsset.length === 1 || rowsWithAsset.length === 0) {
          return toNumber(totalSendableAssets).toFixed(decimals)
        }
        return minusNumber(totalSendableAssets, existingGasAmounts).toFixed(
          decimals,
        )
      }

      if (rowsWithAsset.length === 1 || rowsWithAsset.length === 0) {
        return toNumber(totalSendableAssets).toFixed(decimals)
      }

      return minusNumber(totalSendableAssets, existingAmounts).toFixed(decimals)
    }
    return '0'
  }

  calculateRowAmounts = (asset: string, index: number) => {
    const rows = [...this.state.sendRowDetails]
    rows.splice(index, 1)
    if (rows.length > 0) {
      return (rows
        .filter((row: Object) => row.asset === asset)
        .map((row: Object) => get(row, 'amount', 0))
        .reduce(
          (accumulator: Object, currentValue: number | void) =>
            accumulator.plus(currentValue || 0),
          toBigNumber(0),
        ): number)
    }
    return 0
  }

  calculateDecimals = (asset: string) => {
    const { tokens, networkId } = this.props
    let decimals = 8
    if (asset === 'NEO') {
      decimals = 0
    }
    if (asset === 'GAS') {
      decimals = 8
    } else {
      const foundToken: TokenItemType | void = tokens.find(
        token => token.symbol === asset && token.networkId === networkId,
      )
      if (foundToken) {
        decimals = get(foundToken, 'decimals', 8)
      }
    }
    return decimals
  }

  resetViews = () => {
    this.setState(() => {
      const newState = []

      newState.push(this.generateRow())

      return {
        showConfirmSend: false,
        sendSuccess: false,
        sendRowDetails: newState,
        fees: 0,
      }
    })
  }

  handleSubmit = (generateTransaction: boolean = false) => {
    const rows = [...this.state.sendRowDetails]
    const promises = rows.map((row: Object, index: number) =>
      this.validateRow(row, index),
    )

    if (this.validateRowAmounts(rows)) {
      Promise.all(promises).then(values => {
        const isValid = values.every((result: boolean) => result)

        if (isValid && this.props.isMigration) {
          return this.handleMigration()
        }

        if (isValid && !this.props.isWatchOnly && !generateTransaction) {
          this.setState({ showConfirmSend: true })
        }
        if ((isValid && this.props.isWatchOnly) || generateTransaction) {
          this.handleSend(true)
        }
      })
    }
  }

  handleMigration = () => {
    this.setState({ loading: true })

    const BLACK_HOLE_MAIN_NET = 'ANeo2toNeo3MigrationAddressxwPB2Hz' // MainNet
    const BLACK_HOLE_TEST_NET = 'AJ36ZCpMhiHYMdMAUaP7i1i9pJz4jMdiQV' // TestNet

    const { sendRowDetails } = this.state

    const sendEntries = sendRowDetails.map((row: Object) => ({
      address:
        this.props.networkId === '1' || !this.props.networkId
          ? BLACK_HOLE_MAIN_NET
          : BLACK_HOLE_TEST_NET,
      amount: toNumber(row.amount.toString()),
      symbol: row.asset,
    }))

    const TO_ACCOUNT = new n3Wallet.Account(this.props.wif)

    const feeIsRequired = (symbol, amount) => {
      const userMustPayFee =
        (symbol === 'NEO' && Number(amount) < 10) ||
        (symbol === 'GAS' && Number(amount) < 20) ||
        (symbol === 'CGAS' && Number(amount) < 20) ||
        (symbol === 'nNEO' && Number(amount) < 10)

      return userMustPayFee
    }

    // eslint-disable-next-line
    this.props.migrationAddress
      ? this.props.showModal(MODAL_TYPES.LEDGER_MIGRATION_CONFIRM, {
          title: 'Confirm Migration',
          shouldRenderHeader: false,
          height: feeIsRequired(sendEntries[0].symbol, sendEntries[0].amount)
            ? '650px'
            : '580px',
          renderBody: () => (
            <div className={styles.confirmMigration}>
              <h2> Confirmation </h2>
              <h4>
                You are about to migrate{' '}
                {toBigNumber(sendEntries[0].amount).toString()}{' '}
                {sendEntries[0].symbol}
              </h4>
              <div>
                From (Neo Legacy): <br />
                <code> {this.props.address} </code>
              </div>
              <br />

              <div>
                To (Neo N3): <br />
                <code> {this.props.migrationAddress}</code>
              </div>
              <br />
              {feeIsRequired(sendEntries[0].symbol, sendEntries[0].amount) && (
                <div className={styles.feeWarningContainer}>
                  <DialogueBox icon={<WarningIcon />} text="1 GAS Fee" />
                </div>
              )}
              <br />
              <small>
                Most users should recieve their tokens on Neo N3 within 30
                minutes, however some migrations may take up to 24 hours.{' '}
              </small>
            </div>
          ),
          onClick: () => {
            this.props
              .performMigration({
                sendEntries,
                migrationAddress: this.props.migrationAddress ?? '',
                net: this.props.net,
              })
              .then(() => {
                this.props.handleSwapComplete()
              })
              .catch(() => {
                this.setState({ loading: false })
                // TODO: implement possible additional error state here
              })
          },
          onCancel: () => {
            this.setState({ loading: false })
          },
        })
      : this.props.showModal(MODAL_TYPES.CONFIRM, {
          title: 'Confirm Migration',
          shouldRenderHeader: false,
          height: feeIsRequired(sendEntries[0].symbol, sendEntries[0].amount)
            ? '524px'
            : '454px',

          renderBody: () => (
            <div className={styles.confirmMigration}>
              <h2> Confirmation </h2>
              <h4>
                You are about to migrate{' '}
                {toBigNumber(sendEntries[0].amount).toString()}{' '}
                {sendEntries[0].symbol}
              </h4>
              <div>
                From (Neo Legacy): <br />
                <code> {this.props.address} </code>
              </div>
              <br />

              <div>
                To (Neo N3): <br />
                <code> {TO_ACCOUNT.address}</code>
              </div>
              <br />
              {feeIsRequired(sendEntries[0].symbol, sendEntries[0].amount) && (
                <div className={styles.feeWarningContainer}>
                  <DialogueBox icon={<WarningIcon />} text="1 GAS Fee" />
                </div>
              )}
              <br />
              <small>
                Most users should recieve their tokens on Neo N3 within 30
                minutes, however some migrations may take up to 24 hours.{' '}
              </small>
            </div>
          ),
          onClick: () => {
            this.props
              .performMigration({
                sendEntries,
                migrationAddress: this.props.migrationAddress ?? '',
                net: this.props.net,
              })
              .then(() => {
                this.props.handleSwapComplete()
              })
              .catch(() => {
                this.setState({ loading: false })
                // TODO: implement possible additional error state here
              })
          },
          onCancel: () => {
            this.setState({ loading: false })
          },
        })
  }

  validateRowAmounts = (rows: Array<any>) => {
    const { sendableAssets, intl } = this.props

    let validAmounts = true

    rows.reduce((accum, currRow, index) => {
      if (accum[currRow.asset]) {
        // eslint-disable-next-line
        accum[currRow.asset] = addNumber(
          accum[currRow.asset],
          toBigNumber(currRow.amount),
        )
        if (
          toBigNumber(accum[currRow.asset]).greaterThan(
            toBigNumber(Number(sendableAssets[currRow.asset].balance)),
          )
        ) {
          const { errors } = this.state.sendRowDetails[index]

          const error = intl.formatMessage(
            { id: 'errors.send.balance' },
            { total: accum[currRow.asset], asset: currRow.asset },
          )

          errors.amount = error

          this.updateRowField(index, 'errors', errors)
          validAmounts = false
        }
      } else {
        // eslint-disable-next-line
        accum[currRow.asset] = toBigNumber(currRow.amount)
      }
      return accum
    }, {})
    return validAmounts
  }

  handleSend = (showTransactionModal: boolean = false) => {
    const {
      sendTransaction,
      isWatchOnly,
      showGeneratedTransactionModal,
      chain,
    } = this.props

    const { sendRowDetails, fees } = this.state

    const entries = sendRowDetails.map((row: Object) => ({
      address: row.address,
      amount: toNumber(row.amount.toString()),
      symbol: row.asset,
    }))

    this.setState({ pendingTransaction: true })
    sendTransaction({
      sendEntries: entries,
      fees,
      isWatchOnly: isWatchOnly || showTransactionModal,
      chain,
      tokens: this.props.tokens,
    })
      .then((result: Object) => {
        if (isWatchOnly || showTransactionModal) {
          this.setState({ pendingTransaction: false })
          showGeneratedTransactionModal(result)
        } else {
          this.setState({
            sendSuccess: true,
            txid: result.txid,
            pendingTransaction: false,
          })
        }
      })
      .catch((error: Object) => {
        // TODO: here is where we must generate the expected txId locally
        // and then add it to our pending tx arr
        this.setState({
          sendError: true,
          sendErrorMessage: error.message,
          pendingTransaction: false,
        })
      })
  }

  handleEditRecipientsClick = () => this.setState({ showConfirmSend: false })

  handleAddPriorityFee = (fees: number) => this.setState({ fees })

  validateRow = async (row: Object, index: number) => {
    const validAmount = this.validateAmount(
      row.amount,
      row.max,
      row.asset,
      index,
    )
    const validAddress = await this.validateAddress(row.address, index)

    return validAmount && validAddress
  }

  validateAmount = (
    amount: number,
    max: number,
    asset: string,
    index: number,
  ) => {
    const { errors } = this.state.sendRowDetails[index]
    const { tokens, networkId, intl } = this.props

    const amountNum = Number(amount)

    if (typeof amountNum !== 'number') {
      errors.amount = intl.formatMessage({ id: 'errors.send.number' })
    }

    if (asset === 'NEO' && !toBigNumber(amountNum).isInteger()) {
      errors.amount = intl.formatMessage({ id: 'errors.send.fraction' })
    }

    if (amountNum < 0) {
      errors.amount = intl.formatMessage(
        { id: 'errors.send.negative' },
        { asset },
      )
    }

    if (amountNum === 0) {
      errors.amount = intl.formatMessage({ id: 'errors.send.zero' }, { asset })
    }

    if (amountNum > max) {
      errors.amount = intl.formatMessage(
        { id: 'errors.send.balance' },
        { asset, total: amount },
      )
    }

    if (asset !== 'NEO' && asset !== 'GAS') {
      let decimalPlaces = 0
      const amountStr = amountNum.toString()
      const decPointIndex = amountStr.indexOf('.')

      if (decPointIndex !== -1) {
        decimalPlaces = amountStr.length - 1 - decPointIndex
      }

      const foundToken: TokenItemType | void = tokens.find(
        token => token.symbol === asset && token.networkId === networkId,
      )

      if (
        foundToken &&
        decimalPlaces > toNumber(get(foundToken, 'decimals', 8))
      ) {
        const decimalError = intl.formatMessage(
          { id: 'errors.send.decimal' },
          {
            asset,
            decimalCount: get(foundToken, 'decimals', 8),
          },
        )
        errors.amount = decimalError
      }
    }

    if (errors.amount) {
      this.updateRowField(index, 'errors', errors)
      return false
    }
    return true
  }

  validateAddress = async (formAddress: string, index: number) => {
    const { intl, chain, isMigration } = this.props
    const { errors } = this.state.sendRowDetails[index]

    if (chain === 'neo3' || isMigration) {
      if (formAddress[0].toLocaleUpperCase() !== 'N') {
        errors.address = intl.formatMessage({
          id: 'errors.send.invalidN3Address',
        })
      }

      if (!n3Wallet.isAddress(formAddress)) {
        errors.address = intl.formatMessage({
          id: 'errors.send.invalidN3Address',
        })
      }

      if (errors.address) {
        this.updateRowField(index, 'errors', errors)
        return false
      }
    } else {
      if (!wallet.isAddress(formAddress)) {
        errors.address = intl.formatMessage({
          id: 'errors.send.invalidAddress',
        })
      }

      const blackListedAddress = await isBlacklisted(formAddress)
      if (blackListedAddress) {
        errors.address = intl.formatMessage({ id: 'errors.send.blackListed' })
      }

      if (errors.address) {
        this.updateRowField(index, 'errors', errors)
        return false
      }
    }

    return true
  }

  clearErrors = (index: number, field: string) => {
    this.setState((prevState: Object) => {
      const newState = [...prevState.sendRowDetails]

      const objectToClear = newState[index]

      if (get(objectToClear, ['errors', field])) {
        objectToClear.errors[field] = null
      }

      return newState
    })
  }

  resetViewsAfterError = () =>
    this.setState({ sendError: false, sendErrorMessage: '' })

  toggleHasEnoughGas = (hasEnough: boolean = false) =>
    this.setState({ hasEnoughGas: hasEnough })

  render() {
    const {
      sendRowDetails,
      showConfirmSend,
      sendSuccess,
      sendError,
      sendErrorMessage,
      txid,
      fees,
      pendingTransaction,
      n3Fees,
      hasEnoughGas,
      loading,
      isSendingTotalAmountOfGas,
    } = this.state
    const {
      sendableAssets,
      contacts,
      currency,
      shouldRenderHeaderBar,
      address,
      showSendModal,
      isWatchOnly,
      showImportModal,
      chain,
      isMigration,
    } = this.props
    const noSendableAssets = Object.keys(sendableAssets).length === 0

    const assets = isMigration ? {} : sendableAssets

    if (isMigration) {
      if (sendableAssets.NEO) {
        assets.NEO = sendableAssets.NEO
      }
      if (sendableAssets.GAS) {
        assets.GAS = sendableAssets.GAS
      }
      if (sendableAssets.CGAS) {
        assets.CGAS = sendableAssets.CGAS
      }
      if (sendableAssets.nNEO) {
        assets.nNEO = sendableAssets.nNEO
      }
    }

    return (
      <section className={styles.sendContainer}>
        {shouldRenderHeaderBar &&
          !isMigration && (
            <HeaderBar
              label={<FormattedMessage id="sendPageLabel" />}
              shouldRenderRefresh
            />
          )}
        {!noSendableAssets &&
          !isMigration && (
            <AmountsPanel
              amountsData={this.createSendAmountsData()}
              currencyCode={currency}
            />
          )}

        <SendPanel
          calculateMaxValue={this.calculateMaxValue}
          maxNumberOfRecipients={MAX_NUMBER_OF_RECIPIENTS}
          sendRowDetails={sendRowDetails}
          sendableAssets={assets}
          showConfirmSend={showConfirmSend}
          pendingTransaction={pendingTransaction}
          sendSuccess={sendSuccess}
          sendError={sendError}
          sendErrorMessage={sendErrorMessage}
          noSendableAssets={noSendableAssets}
          contacts={contacts}
          txid={txid}
          addRow={this.addRow}
          removeRow={this.removeRow}
          updateRowField={this.updateRowField}
          clearErrors={this.clearErrors}
          handleSubmit={this.handleSubmit}
          handleAddPriorityFee={this.handleAddPriorityFee}
          fees={fees}
          address={address}
          resetViewsAfterError={this.resetViewsAfterError}
          handleEditRecipientsClick={this.handleEditRecipientsClick}
          handleSend={this.handleSend}
          resetViews={this.resetViews}
          showSendModal={showSendModal}
          pushQRCodeData={this.pushQRCodeData}
          isWatchOnly={isWatchOnly}
          showImportModal={showImportModal}
          chain={chain}
          n3Fees={n3Fees}
          hasEnoughGas={hasEnoughGas}
          loading={loading}
          toggleHasEnoughGas={this.toggleHasEnoughGas}
          isMigration={isMigration}
          isSendingTotalAmountOfGas={isSendingTotalAmountOfGas}
        />
      </section>
    )
  }
}
