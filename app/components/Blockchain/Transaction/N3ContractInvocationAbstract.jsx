// @flow
import React from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import styles from './Transaction.scss'
import InvokeIcon from '../../../assets/icons/raw-invoke-tx.svg'

type Props = {
  contract_name: string,
  isPending: boolean,
  method: string,
  txDate: React$Node,
}

class N3ContractInvocationAbstract extends React.Component<Props> {
  render = () => {
    const { contract_name, isPending, method, txDate } = this.props
    return (
      <div className={classNames(styles.transactionContainerN3)}>
        <div className={styles.abstractContainerN3}>
          <div className={styles.txTypeIconContainerN3}>
            <div className={styles.sendIconContainer}>
              <InvokeIcon />
            </div>
          </div>
          {isPending ? 'Pending' : txDate}
          <div className={styles.txLabelContainerN3}>Raw Invocation</div>
        </div>
        <div className={styles.txToContainerN3}>
          {contract_name} | {method}
        </div>
      </div>
    )
  }
}

export default injectIntl(N3ContractInvocationAbstract)
