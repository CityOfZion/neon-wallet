// @flow
import React from 'react'
import classNames from 'classnames'
import { map } from 'lodash-es'

import Button from '../../../Button'
import { toFixedDecimals } from '../../../../core/formatters'
import toSentence from '../../../../util/toSentence'
import styles from './ConfirmToken.scss'

type Props = {
  className: ?string,
  token: TokenBalanceType,
  assetBalancesToSend: { [key: SymbolType]: string },
  processing: boolean,
  onConfirm: Function,
  onCancel: Function
}

export default class ConfirmToken extends React.Component<Props> {
  render() {
    const { token, processing, onConfirm, onCancel } = this.props

    return (
      <div className={classNames(styles.confirmToken, this.props.className)}>
        <div className={styles.heading}>Verify Purchase Details</div>
        <div className={styles.details}>
          <p>
            Sending <strong>{this.getAmounts()}</strong> to:
          </p>
          <p>
            Name: <strong>{token.name}</strong>
            <br />
            Symbol: <strong>{token.symbol}</strong>
            <br />
            Total Supply:{' '}
            <strong>
              {toFixedDecimals(token.totalSupply, token.decimals)}
            </strong>
            <br />
            Script Hash: <strong>{token.scriptHash}</strong>
            <br />
          </p>
        </div>

        <Button onClick={onCancel}>&laquo; Cancel</Button>
        <Button primary onClick={onConfirm} disabled={processing}>
          Confirm Purchase &raquo;
        </Button>
      </div>
    )
  }

  getAmounts = () => {
    const amounts = map(this.props.assetBalancesToSend, (amount, symbol) =>
      [amount || 0, symbol].join(' ')
    )

    return toSentence(amounts)
  }
}
