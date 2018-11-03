// @flow
import React, { Fragment } from 'react'
import type { Node } from 'react'

import moment from 'moment'
import { isEmpty } from 'lodash-es'

import Button from '../../Button'
import { openExplorerTx } from '../../../core/explorer'
import styles from './Transaction.scss'
import ClaimIcon from '../../../assets/icons/claim.svg'
import SendIcon from '../../../assets/icons/send-tx.svg'
import ReceiveIcon from '../../../assets/icons/receive-tx.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import InfoIcon from '../../../assets/icons/info.svg'
import CopyToClipboard from '../../CopyToClipboard'
import Tooltip from '../../Tooltip'

type Props = {
  tx: Object,
  networkId: string,
  explorer: ExplorerType,
  contacts: Object,
  showAddContactModal: ({ address: string }) => null,
  address: string
}

export default class Transaction extends React.Component<Props> {
  render = () => {
    const { tx } = this.props
    const { iconType } = tx
    return (
      <div className={styles.transactionContainer}>
        {this.renderAbstract(iconType)}
        <Button
          className={styles.transactionHistoryButton}
          renderIcon={InfoIcon}
          onClick={this.handleClick}
        >
          View
        </Button>
      </div>
    )
  }

  findContact = (address: string): Node => {
    const { contacts } = this.props
    if (contacts && !isEmpty(contacts)) {
      let label
      Object.keys(contacts).forEach(key => {
        if (contacts[key] === address) {
          label = key
        }
      })
      return label ? (
        <Tooltip title={address} className={styles.largerFont}>
          {label}
        </Tooltip>
      ) : (
        address
      )
    }
    return address
  }

  displayModal = () => {
    const {
      showAddContactModal,
      tx: { to, from, iconType }
    } = this.props
    showAddContactModal({ address: iconType === 'RECEIVE' ? from : to })
  }

  handleClick = () => {
    const { networkId, explorer, tx } = this.props
    const { txid } = tx
    openExplorerTx(networkId, explorer, txid)
  }

  renderAbstract = (type: string) => {
    const { tx } = this.props
    const { iconType, time, label, amount, isNetworkFee, to, from } = tx

    const formattedTime = moment.unix(time).format('MM/DD/YYYY | HH:mm:ss')

    const contactTo = this.findContact(to)
    const contactToExists = contactTo !== to

    switch (type) {
      case 'CLAIM':
        return (
          <div className={styles.abstractContainer}>
            <div className={styles.txTypeIconContainer}>
              <div className={styles.claimIconContainer}>
                <ClaimIcon />
              </div>
            </div>
            <div className={styles.txDateContainer}>{formattedTime}</div>
            <div className={styles.txLabelContainer}>{label}</div>
            <div className={styles.txAmountContainer}>{amount}</div>
            <div className={styles.txToContainer}>
              <Fragment>
                <span>{contactTo}</span>
                {!contactToExists && (
                  <CopyToClipboard
                    className={styles.copy}
                    text={to}
                    tooltip="Copy Public Address"
                  />
                )}
              </Fragment>
            </div>
            <div className={styles.historyButtonPlaceholder} />
          </div>
        )
      case 'SEND':
        return (
          <div className={styles.abstractContainer}>
            <div className={styles.txTypeIconContainer}>
              <div className={styles.sendIconContainer}>
                <SendIcon />
              </div>
            </div>
            <div className={styles.txDateContainer}>{formattedTime}</div>
            <div className={styles.txLabelContainer}>{label}</div>
            <div className={styles.txAmountContainer}>{amount}</div>
            <div className={styles.txToContainer}>
              {isNetworkFee ? (
                to
              ) : (
                <Fragment>
                  <span>{contactTo}</span>
                  {!contactToExists && (
                    <CopyToClipboard
                      className={styles.copy}
                      text={to}
                      tooltip="Copy Public Address"
                    />
                  )}
                </Fragment>
              )}
            </div>
            {isNetworkFee ? (
              <div className={styles.historyButtonPlaceholder} />
            ) : (
              <Button
                className={styles.transactionHistoryButton}
                renderIcon={ContactsAdd}
                onClick={this.displayModal}
                disabled={contactToExists}
              >
                Add
              </Button>
            )}
          </div>
        )
      case 'RECEIVE': {
        const contactFrom = this.findContact(from)
        const contactFromExists = contactFrom !== from
        const isMintTokens = from === 'MINT TOKENS'
        const isGasClaim = this.props.address === from && !Number(amount)
        return (
          <div className={styles.abstractContainer}>
            <div className={styles.txTypeIconContainer}>
              <div className={styles.receiveIconContainer}>
                <ReceiveIcon />
              </div>
            </div>
            <div className={styles.txDateContainer}>{formattedTime}</div>
            <div className={styles.txLabelContainer}>{label}</div>
            <div className={styles.txAmountContainer}>{amount}</div>
            <div className={styles.txToContainer}>
              <span>{contactFrom}</span>
              {!contactFromExists &&
                !isMintTokens && (
                  <CopyToClipboard
                    className={styles.copy}
                    text={from}
                    tooltip="Copy Public Address"
                  />
                )}
            </div>
            {isMintTokens || isGasClaim ? (
              <div className={styles.transactionHistoryButton} />
            ) : (
              <Button
                className={styles.transactionHistoryButton}
                renderIcon={ContactsAdd}
                onClick={this.displayModal}
                disabled={contactFromExists}
              >
                Add
              </Button>
            )}
          </div>
        )
      }

      default:
        console.warn('renderTxTypeIcon() invoked with an invalid argument!', {
          type
        })
        return null
    }
  }
}
