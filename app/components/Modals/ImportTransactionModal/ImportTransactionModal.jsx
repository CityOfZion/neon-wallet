// @flow
import React, { Fragment } from 'react'
import moment from 'moment'
import { tx, rpc, api } from '@cityofzion/neon-js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import fs from 'fs'

import { getNode, getRPCEndpoint } from '../../../actions/nodeStorageActions'
import baseStyles from '../SendModal/SendModal.scss'
import styles from './ImportTransactionModal.scss'
import BaseModal from '../BaseModal'
import ConfirmIcon from '../../../assets/icons/confirm.svg'
import ImportIcon from '../../../assets/icons/import.svg'
import SaveIcon from '../../../assets/icons/save-icon.svg'
import Button from '../../Button'
import Loading from '../../../containers/App/Loading'

const electron = require('electron').remote

type Tx = {
  type: number,
  version: number,
  attributes: Array<*>,
  inputs: Array<*>,
  output: Array<*>,
  scripts: Array<*>,
  serialize: () => string,
}

type Props = {
  hideModal: () => void,
  showErrorNotification: ({ message: string }) => string,
  showSuccessNotification: ({ message: string }) => string,
  showInfoNotification: ({ message: string }) => string,
  hideNotification: (id: string) => void,
  wif: string,
  tx: Tx,
  net: string,
  theme: string,
  isHardwareLogin: Boolean,
  signingFunction?: () => void,
  publicKey?: string,
}

type State = {
  tabIndex: number,
  transaction: string,
  signedTx: null | Tx,
  serializedTransactionInput: string,
  loading: boolean,
}

export default class GeneratedTransactionModal extends React.Component<
  Props,
  State,
> {
  state = {
    tabIndex: 0,
    transaction: '',
    serializedTransactionInput: '',
    signedTx: null,
    loading: false,
  }

  handleSave = async () => {}

  signTransaction = () => {
    try {
      const { Transaction } = tx
      const {
        wif,
        isHardwareLogin,
        signingFunction,
        showInfoNotification,
        hideNotification,
        publicKey,
      } = this.props
      const Tx = new Transaction(JSON.parse(this.state.transaction))
      if (isHardwareLogin) {
        const notificationId = showInfoNotification({
          message: 'Please sign the transaction on your hardware device',
          autoDismiss: 0,
        })
        const config = {
          tx: Tx,
          signingFunction,
          publicKey,
        }
        const signingPromise = api.signTx(config)
        signingPromise.then(config => {
          hideNotification(notificationId)
          const signedTx = config.tx
          this.setState({
            signedTx,
          })
        })
      } else {
        const signedTx = Tx.sign(wif)
        this.setState({
          signedTx,
        })
      }
    } catch (error) {
      this.props.showErrorNotification({
        message: `An error occurred signing the transaction: ${error.message}`,
      })
    }
  }

  handleImport = async (isSignedRawTx: boolean = false) => {
    const { showErrorNotification } = this.props
    const { dialog } = electron
    try {
      dialog.showOpenDialog(fileName => {
        if (fileName === undefined) {
          return null
        }
        const rawData = fs.readFileSync(fileName[0])

        const data = isSignedRawTx
          ? rawData.toString('utf8')
          : JSON.parse(rawData)
        const transaction = isSignedRawTx ? data : JSON.stringify(data)

        return isSignedRawTx
          ? this.setState({
              serializedTransactionInput: transaction,
            })
          : this.setState({
              transaction,
            })
      })
    } catch (err) {
      console.error(err)
      showErrorNotification({
        message: `An error occurred importing the file: ${err.message}`,
      })
    }
  }

  handleSave = async (isSignedRawTx: boolean = false) => {
    const { showSuccessNotification, showErrorNotification } = this.props
    const { dialog, app } = electron
    try {
      dialog.showSaveDialog(
        {
          defaultPath: `${app.getPath(
            'documents',
          )}/neon-wallet-signed-transaction-${moment().unix()}`,
          filters: [
            {
              name: isSignedRawTx ? 'TXT' : 'JSON',
              extensions: isSignedRawTx ? ['txt'] : ['json'],
            },
          ],
        },
        fileName => {
          if (fileName === undefined) {
            return
          }
          fs.writeFile(
            fileName,
            isSignedRawTx && this.state.signedTx
              ? this.state.signedTx.serialize()
              : JSON.stringify(this.props.tx),
            errorWriting => {
              if (errorWriting) {
                showErrorNotification({
                  message: `An error occurred creating the file: ${
                    errorWriting.message
                  }`,
                })
              } else {
                showSuccessNotification({
                  message: 'The file has been succesfully saved',
                })
              }
            },
          )
        },
      )
    } catch (err) {
      console.error(err)
      showErrorNotification({
        message: `An error occurred creating the file: ${err.message}`,
      })
    }
  }

  handleBroadcast = async (rawTransaction: string) => {
    this.setState({ loading: true })
    const { net } = this.props
    let url = await getNode(net)
    if (isEmpty(url)) {
      url = await getRPCEndpoint(net)
    }
    const RPC = new rpc.RPCClient(url)
    const response = await RPC.sendRawTransaction(rawTransaction).catch(e => {
      this.props.showErrorNotification({
        message: `There was an issue broadcasting the transaction to the network... ${
          e.message
        }`,
      })
      this.setState({ loading: false })
    })
    if (response) {
      this.props.showSuccessNotification({
        message:
          'Transaction pending! Wallet balances will automatically update when the blockchain has processed it.',
      })
      this.setState({ loading: false })
      this.props.hideModal()
    }
  }

  generateOptions = () => ({
    signTransaction: {
      render: () => {
        if (this.state.signedTx) {
          return (
            <Fragment>
              <div className={baseStyles.section}>
                <textarea
                  value={this.state.signedTx.serialize()}
                  rows="17"
                  disabled
                  className={styles.transactionInput}
                />
              </div>
              <div className={styles.signedButtonContainer}>
                <Button
                  shouldCenterButtonLabelText
                  className={styles.submitButton}
                  renderIcon={() => <SaveIcon />}
                  type="submit"
                  onClick={() => this.handleSave(true)}
                >
                  Save
                </Button>
                <Button
                  shouldCenterButtonLabelText
                  primary
                  className={styles.submitButton}
                  renderIcon={() => <ConfirmIcon />}
                  type="submit"
                  onClick={() =>
                    this.state.signedTx &&
                    this.handleBroadcast(this.state.signedTx.serialize())
                  }
                >
                  Broadcast Transaction
                </Button>
              </div>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <div className={baseStyles.section}>
              <textarea
                value={this.state.transaction}
                rows="17"
                className={styles.transactionInput}
                onChange={e => this.setState({ transaction: e.target.value })}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button
                shouldCenterButtonLabelText
                className={styles.submitButton}
                renderIcon={() => <ImportIcon />}
                type="submit"
                onClick={() => this.handleImport()}
              >
                Import File
              </Button>

              <Button
                shouldCenterButtonLabelText
                primary
                className={styles.submitButton}
                renderIcon={() => <ConfirmIcon />}
                type="submit"
                onClick={this.signTransaction}
              >
                Sign Transaction
              </Button>
            </div>
          </Fragment>
        )
      },
      display: 'Sign Transaction',
    },
    broadcastTransaction: {
      render: () => (
        <Fragment>
          <div className={baseStyles.section}>
            <textarea
              value={this.state.serializedTransactionInput}
              rows="17"
              className={styles.transactionInput}
              onChange={e =>
                this.setState({ serializedTransactionInput: e.target.value })
              }
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              shouldCenterButtonLabelText
              className={styles.submitButton}
              renderIcon={() => <ImportIcon />}
              type="submit"
              onClick={() => this.handleImport(true)}
            >
              Import File
            </Button>
            <Button
              shouldCenterButtonLabelText
              primary
              className={styles.submitButton}
              renderIcon={() => <ConfirmIcon />}
              type="submit"
              onClick={() =>
                this.handleBroadcast(this.state.serializedTransactionInput)
              }
            >
              Broadcast Transaction
            </Button>
          </div>
        </Fragment>
      ),
      display: 'Add Signed Raw Transaction',
    },
  })

  // $FlowFixMe
  tabOptions = Object.keys(this.generateOptions()).map(
    (key: string) => this.generateOptions()[key],
  )

  render() {
    const { hideModal } = this.props

    return (
      <BaseModal
        title="Import Transaction"
        hideModal={hideModal}
        bodyClassName={styles.modalBody}
        style={{ content: { width: '750px', height: '100%' } }}
      >
        <div className={styles.contentContainer}>
          {this.state.loading ? (
            <Loading theme={this.props.theme} nobackground />
          ) : (
            <Fragment>
              <div className={baseStyles.header}>
                <ImportIcon className={baseStyles.icon} />
                <div className={baseStyles.title}>Import Transaction</div>
              </div>

              <div className={baseStyles.divider} />

              <div className={baseStyles.section}>
                <div className={styles.sectionContent}>
                  {!this.state.tabIndex ? (
                    'If you have generated a transaction you can sign it below or import an already signed transaction.'
                  ) : (
                    <div style={{ paddingBottom: '24px' }}>
                      Add a signed transaction below to broadcast it to the
                      network.
                    </div>
                  )}
                </div>
              </div>

              <Tabs
                selectedIndex={this.state.tabIndex}
                onSelect={tabIndex => {
                  this.setState({ tabIndex })
                }}
                className={classNames('neon-tabs', styles.tabs)}
              >
                <TabList>
                  {this.tabOptions.map(option => (
                    <Tab key={option.display}>
                      {option.display.toUpperCase()}
                    </Tab>
                  ))}
                </TabList>
                {this.tabOptions.map(option => (
                  <TabPanel
                    key={option.display}
                    selectedClassName={styles.homeTabPanel}
                  >
                    {option.render()}
                  </TabPanel>
                ))}
              </Tabs>
            </Fragment>
          )}
        </div>
      </BaseModal>
    )
  }
}
