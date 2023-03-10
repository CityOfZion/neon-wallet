// @flow
import React from 'react'
import type { Node } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { isEmpty } from 'lodash-es'
import classNames from 'classnames'

import { TX_TYPES } from '../../../core/constants'
import Button from '../../Button'
import PendingAbstract from './PendingAbstract'
import ClaimAbstract from './ClaimAbstract'
import SendAbstract from './SendAbstract'
import ReceiveAbstract from './ReceiveAbstract'
import N3VoteAbstract from './N3VoteAbstract'
import N3NEP17SendAbstract from './N3NEP17SendAbstract'
import N3NEP17ReceiveAbstract from './N3NEP17ReceiveAbstract'
import N3ContractInvocationAbstract from './N3ContractInvocationAbstract'
import InfoIcon from '../../../assets/icons/info.svg'
import { openExplorerTx } from '../../../core/explorer'
import Tooltip from '../../Tooltip'
import styles from './Transaction.scss'
import N3NEP11ReceiveAbstract from './N3NEP11ReceiveAbstract'
import N3NEP11SendAbstract from './N3NEP11SendAbstract'
import N3PendingAbstract from './N3PendingAbstract'

type Props = {
  address: string,
  chain: string,
  className?: string,
  contacts: Object,
  blockExplorer: ExplorerType,
  isPending?: boolean,
  networkId: string,
  pendingTx: {
    asset: {
      symbol: string,
      image?: string,
    },
    blocktime: number,
    amount: string,
    to: string,
    confirmations: number,
  },
  showAddContactModal: ({ address: string }) => null,
  tx: Object,
  renderN2Tx?: boolean,
}

export default class Transaction extends React.Component<Props> {
  static defaultProps = {
    tx: {},
  }

  render = () => {
    const {
      tx: { type },
      chain,
      className,
      isPending,
      renderN2Tx,
    } = this.props
    return (
      <div className={classNames(styles.transactionContainer, className)}>
        {chain === 'neo3' && !renderN2Tx
          ? this.renderAbstractN3()
          : this.renderAbstract(type)}
        {!isPending && (
          <Button
            className={styles.transactionHistoryButton}
            renderIcon={InfoIcon}
            onClick={this.handleViewTransaction}
          >
            <FormattedMessage id="activityViewTx" />
          </Button>
        )}
      </div>
    )
  }

  findContact = (address: string): Node | string => {
    const { contacts } = this.props
    if (contacts && !isEmpty(contacts)) {
      const label = contacts[address]
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

  displayModal = (address: string) => {
    this.props.showAddContactModal({ address })
  }

  handleViewTransaction = () => {
    const { networkId, blockExplorer, tx, chain } = this.props
    let txid

    if (chain === 'neo3') {
      txid = tx.hash.substring(2)
    } else {
      ;({ txid } = tx)
    }
    openExplorerTx(networkId || '1', blockExplorer, txid, chain)
  }

  renderTxDate = (time: ?number) => {
    if (!time) {
      return null
    }

    return (
      <div className={styles.txDateContainer}>
        {moment.unix(time).format('MM/DD/YYYY | HH:mm:ss')}
      </div>
    )
  }

  renderAbstract = (type: string, isN3?: boolean) => {
    const { isPending, address } = this.props
    const { time, label, amount, isNetworkFee, to, from, image } = this.props.tx
    const contactTo = this.findContact(to)
    const contactFrom = from && this.findContact(from)
    const contactToExists = contactTo !== to
    const contactFromExists = contactFrom !== from
    const logo = image && <img src={image} alt={`${label}`} />
    const txDate = this.renderTxDate(time)

    const abstractProps = {
      txDate,
      logo,
      contactTo,
      amount,
      contactFrom,
      contactToExists,
      findContact: this.findContact,
      showAddContactModal: this.displayModal,
      isNetworkFee,
      contactFromExists,
      from,
      address,
      ...this.props.tx,
    }

    if (isPending) {
      return isN3 ? (
        <N3PendingAbstract
          {...abstractProps}
          {...this.props.pendingTx}
          renderTxDate={this.renderTxDate}
        />
      ) : (
        <PendingAbstract
          {...abstractProps}
          {...this.props.pendingTx}
          renderTxDate={this.renderTxDate}
        />
      )
    }

    switch (type) {
      case TX_TYPES.CLAIM:
        return <ClaimAbstract {...abstractProps} />
      case TX_TYPES.SEND:
        return <SendAbstract {...abstractProps} />
      case TX_TYPES.RECEIVE: {
        return <ReceiveAbstract {...abstractProps} />
      }
      default:
        console.warn('renderTxTypeIcon() invoked with an invalid argument!', {
          type,
        })
        return null
    }
  }

  /**
   * Builds a contract invocation object.
   * @returns {null|*}
   */
  renderAbstractN3 = () => {
    const { isPending, tx, address } = this.props
    const { time, type, sender } = tx
    const txDate = this.renderTxDate(time || (tx.metadata && tx.metadata.time))

    const metadata = {
      txDate,
      isPending,
      sender,
      findContact: this.findContact,
      showAddContactModal: this.displayModal,
      ...tx.metadata,
    }

    if (isPending) {
      return this.renderAbstract(type, true)
    }

    switch (type) {
      case TX_TYPES.N3CONTRACTINVOCATION:
        return <N3ContractInvocationAbstract {...metadata} />
      case TX_TYPES.N3NEP17TRANSFER:
        if (address === tx.metadata.to) {
          return <N3NEP17ReceiveAbstract {...metadata} />
        }
        return <N3NEP17SendAbstract {...metadata} />
      case TX_TYPES.N3NEP11TRANSFER:
        if (address === tx.metadata.to) {
          return <N3NEP11ReceiveAbstract {...metadata} />
        }
        return <N3NEP11SendAbstract {...metadata} />
      case TX_TYPES.N3VOTE:
        return <N3VoteAbstract {...metadata} />
      default:
        console.warn('renderTxTypeIcon() invoked with an invalid argument!', {
          type,
        })
        return null
    }
  }
}
