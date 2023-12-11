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
import N3ClaimAbstract from './N3ClaimAbstract'
import InfoIcon from '../../../assets/icons/info.svg'
import { openExplorerTx } from '../../../core/explorer'
import Tooltip from '../../Tooltip'
import styles from './Transaction.scss'
import N3NEP11ReceiveAbstract from './N3NEP11ReceiveAbstract'
import N3NEP11SendAbstract from './N3NEP11SendAbstract'
import N3PendingAbstract from './N3PendingAbstract'
import { useContactsContext } from '../../../context/contacts/ContactsContext'

type Props = {
  address: string,
  chain: string,
  className?: string,
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

export default function Transaction(props: Props) {
  const { tx, chain, className, isPending, renderN2Tx, address } = props

  const { contacts } = useContactsContext()

  function findContact(address: string): string | React$Node {
    if (contacts && !isEmpty(contacts)) {
      // find the contact with the matching address based on the types above and
      // return the keyname for that contact
      let contactName = ''
      Object.keys(contacts).forEach(key => {
        const contact = contacts[key]
        if (contact.some(c => c.address === address)) {
          contactName = key
        }
      })
      if (contactName) {
        return (
          <Tooltip title={address} className={styles.largerFont}>
            {contactName}
          </Tooltip>
        )
      }
    }

    return address
  }

  function displayModal(address: string) {
    props.showAddContactModal({ address })
  }

  function handleViewTransaction() {
    const { networkId, blockExplorer, tx, chain } = props
    let { txid } = tx
    if (chain === 'neo3') {
      txid = tx.hash.substring(2)
    }
    openExplorerTx(networkId || '1', blockExplorer, txid, chain)
  }

  function renderTxDate(time: ?number) {
    if (!time) {
      return null
    }

    return (
      <div className={styles.txDateContainer}>
        {moment.unix(time).format('MM/DD/YYYY | HH:mm:ss')}
      </div>
    )
  }

  function renderAbstract(isN3?: boolean) {
    const { isPending, address } = props
    const { time, label, amount, isNetworkFee, to, from, image } =
      props.tx || {}
    const contactTo = findContact(to)
    const contactFrom = from && findContact(from)
    const contactToExists = contactTo !== to
    const contactFromExists = contactFrom !== from
    const logo = image && <img src={image} alt={`${label}`} />
    const txDate = renderTxDate(time)

    const abstractProps = {
      txDate,
      logo,
      contactTo,
      amount,
      contactFrom,
      contactToExists,
      findContact,
      showAddContactModal: displayModal,
      isNetworkFee,
      contactFromExists,
      from,
      address,
      ...props.tx,
    }

    if (isPending) {
      return isN3 ? (
        <N3PendingAbstract
          {...abstractProps}
          {...props.pendingTx}
          renderTxDate={renderTxDate}
        />
      ) : (
        <PendingAbstract
          {...abstractProps}
          {...props.pendingTx}
          renderTxDate={renderTxDate}
        />
      )
    }

    switch (tx?.type) {
      case TX_TYPES.CLAIM:
        return <ClaimAbstract {...abstractProps} />
      case TX_TYPES.SEND:
        return <SendAbstract {...abstractProps} />
      case TX_TYPES.RECEIVE: {
        return <ReceiveAbstract {...abstractProps} />
      }
      default:
        console.warn('renderTxTypeIcon() invoked with an invalid argument!', {
          type: tx?.type,
        })
        return null
    }
  }

  /**
   * Builds a contract invocation object.
   * @returns {null|*}
   */
  function renderAbstractN3() {
    const { isPending, tx } = props
    if (isPending) {
      return renderAbstract(true)
    }

    const { time, type, sender } = tx
    const txDate = renderTxDate(time || (tx.metadata && tx.metadata.time))

    const metadata = {
      txDate,
      isPending,
      sender,
      findContact,
      showAddContactModal: displayModal,
      ...tx.metadata,
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
      case TX_TYPES.CLAIM:
        return <N3ClaimAbstract {...metadata} />
      default:
        console.warn('renderTxTypeIcon() invoked with an invalid argument!', {
          type,
        })
        return null
    }
  }

  return (
    <div className={classNames(styles.transactionContainer, className)}>
      {chain === 'neo3' && !renderN2Tx ? renderAbstractN3() : renderAbstract()}
      {!isPending && (
        <Button
          className={styles.transactionHistoryButton}
          renderIcon={InfoIcon}
          onClick={handleViewTransaction}
        >
          <FormattedMessage id="activityViewTx" />
        </Button>
      )}
    </div>
  )
}
