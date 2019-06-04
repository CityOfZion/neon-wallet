// @flow
import React, { Fragment } from 'react'
import moment from 'moment'
import Neon, { tx, logging, rpc } from '@cityofzion/neon-js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import classNames from 'classnames'
import { isEmpty } from 'lodash'

import { getNode, getRPCEndpoint } from '../../../actions/nodeStorageActions'
import baseStyles from '../SendModal/SendModal.scss'
import styles from './ImportTransactionModal.scss'
import BaseModal from '../BaseModal'
import ConfirmIcon from '../../../assets/icons/confirm.svg'
import ImportIcon from '../../../assets/icons/import.svg'
import SaveIcon from '../../../assets/icons/save-icon.svg'
import Button from '../../Button'

logging.logger.setAll('info') // sets logging level of neon-js to 'info'

type Props = {
  hideModal: () => void,
}

type State = {
  tabIndex: number,
  transaction: string,
}
export default class GeneratedTransactionModal extends React.Component<
  Props,
  State,
> {
  state = {
    tabIndex: 0,
    transaction: '',
  }

  handleSave = async () => {}

  signTransaction = () => {
    const { Transaction } = tx
    const { wif } = this.props
    console.log(this.props)
    // TODO:
    // 1.) We need validate the transaction json blob here
    // 2.) Convert blob to neon js tx object
    // 3.) sign transaction
    // 4.) spit back to client
    console.log(this.state)
    const Tx = new Transaction(JSON.parse(this.state.transaction))
    const signedTx = Tx.sign(wif)
    this.setState({
      signedTx,
    })

    // console.log(Tx.serialize())
    //let Tx = new tx(transaction)
    //console.log(Tx)
    // console.log(tx)
    // console.log(Neon)
    // console.log(tx.default.serialize(transaction))
    // console.log(tx.serializeTransaction(transaction))

    // const GeneratedTransaction = new Tx(transaction)
    // console.log(Neon)
    // console.log(Neon.serialize.tx(transaction))
    // console.log(tx.Transaction.createContractTx(transaction))
    // console.log(Neon.create.contractTx(transaction))
    // console.log(GeneratedTransaction)
    // console.log(GeneratedTransaction.serializeTransaction())
  }

  handleSave = async () => {
    const { showSuccessNotification, showErrorNotification } = this.props
    const { dialog, app } = electron
    try {
      dialog.showSaveDialog(
        {
          defaultPath: `${app.getPath(
            'documents',
          )}/neon-wallet-transaction-${moment().unix()}`,
          filters: [
            {
              name: 'JSON',
              extensions: ['json'],
            },
          ],
        },
        fileName => {
          if (fileName === undefined) {
            return
          }
          // fileName is a string that contains the path and filename created in the save file dialog.
          fs.writeFile(
            fileName,
            JSON.stringify(this.props.tx, null, 2),
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

  handleBroadcast = async () => {
    const { net } = this.props
    let url = await getNode(net)
    if (isEmpty(url)) {
      url = await getRPCEndpoint(net)
    }
    const RPC = new rpc.RPCClient(url)
    console.log({ RPC })
    const response = await RPC.sendRawTransaction(
      this.state.signedTx.serialize(),
    )
    console.log({ response })
  }

  generateOptions = () => ({
    signTransaction: {
      render: () => {
        if (this.state.signedTx) {
          return (
            <Fragment>
              <div className={baseStyles.section}>
                {/* TODO: componentize this in a seperate PR */}
                <textarea
                  value={this.state.serializedSignedTx}
                  rows="15"
                  className={styles.transactionInput}
                  onChange={e => this.setState({ transaction: e.target.value })}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  shouldCenterButtonLabelText
                  className={styles.submitButton}
                  renderIcon={() => <SaveIcon />}
                  type="submit"
                  onClick={this.handleSave}
                >
                  Save
                </Button>
                <Button
                  shouldCenterButtonLabelText
                  primary
                  className={styles.submitButton}
                  renderIcon={() => <ConfirmIcon />}
                  type="submit"
                  onClick={this.handleBroadcast}
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
              {/* TODO: componentize this in a seperate PR */}
              <textarea
                value={this.state.transaction}
                rows="15"
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
                // onClick={() => this.copyText(JSON.stringify(this.props.tx))}
              >
                Upload file
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
        <div className={styles.dynamicReceiveContent}>
          <div>hello bar</div>
        </div>
      ),
      display: 'Add Signed Transaction',
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
          <div className={baseStyles.header}>
            <ImportIcon className={baseStyles.icon} />
            <div className={baseStyles.title}>Import Transaction</div>
          </div>

          <div className={baseStyles.divider} />

          <div className={baseStyles.section}>
            <div className={baseStyles.sectionContent}>
              {!this.state.tabIndex
                ? 'If you have produced a transction from a watch only address you can sign it below or import an already signed transaction.'
                : 'Add a signed transaction below to broadcast it to the network.'}
            </div>
          </div>

          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => {
              this.setState({ tabIndex })
            }}
            className={classNames(styles.tabs, 'neon-tabs')}
          >
            <TabList>
              {this.tabOptions.map(option => (
                <Tab key={option.display}>{option.display.toUpperCase()}</Tab>
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
        </div>
      </BaseModal>
    )
  }
}

// dispatch(
//   showSuccessNotification({
//     message:
//       'Transaction pending! Your balance will automatically update when the blockchain has processed it.',
//   }),
// )
// return resolve(response)
// } catch (err) {
// console.error({ err })
// rejectTransaction(`Transaction failed: ${err.message}`)
// return reject(err)
// } finally {
// const hash = get(config, 'tx.hash')

// if (!isWatchOnly) {
//   dispatch(
//     addPendingTransaction.call({
//       address: config.address,
//       tx: {
//         hash,
//         sendEntries,
//       },
//       net,
//     }),
//   )
// }
