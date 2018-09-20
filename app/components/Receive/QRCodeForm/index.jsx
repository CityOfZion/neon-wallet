// @flow
import React from 'react'
import classNames from 'classnames'

import AssetInput from '../../Inputs/AssetInput'
import NumberInput from '../../Inputs/NumberInput'
import TextInput from '../../Inputs/TextInput'
import Button from '../../Button/Button'
import CopyToClipboard from '../../CopyToClipboard'
import { Address } from '../../Blockchain'
import { ASSETS, TOKENS } from '../../../core/constants'
import { COIN_DECIMAL_LENGTH } from '../../../core/formatters'
import GridIcon from '../../../assets/icons/grid.svg'

import styles from './styles.scss'

type Props = {
  className?: string,
  address: string,
  onSubmit: Function
}

type State = {
  asset: ?string,
  amount: ?number,
  description: ?string
}

export default class QRCodeForm extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    asset: undefined,
    amount: undefined,
    description: undefined
  }

  render() {
    const { className, address, onSubmit } = this.props
    const { asset, amount, description } = this.state
    const symbols = [ASSETS.NEO, ASSETS.GAS, ...Object.keys(TOKENS)]

    return (
      <div className={classNames(styles.receivePanel, className)}>
        <div className={styles.header}>
          <GridIcon className={styles.icon} />
          <div className={styles.title}>Create a bespoke QR Code</div>
        </div>
        <form
          className={styles.form}
          onSubmit={() =>
            onSubmit({
              address,
              asset:
                (TOKENS[asset] && TOKENS[asset].networks['1'].hash) || asset,
              amount,
              description
            })
          }
        >
          <div className={styles.amountContainer}>
            <div className={styles.asset}>
              <div className={styles.inputDescription}>ASSET</div>
              <AssetInput
                symbols={symbols}
                value={asset}
                onChange={value => this.setState({ asset: value })}
              />
            </div>
            <div className={styles.amount}>
              <div className={styles.inputDescription}>AMOUNT</div>
              <NumberInput
                value={amount}
                placeholder="Amount"
                options={{ numeralDecimalScale: COIN_DECIMAL_LENGTH }}
                onChange={value => this.setState({ amount: value })}
              />
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.inputDescription}>
              DEPOSIT INTO THIS WALLET
            </div>
            <div className={styles.address}>
              <Address className={styles.link} address={address} />
            </div>
          </div>
          <div className={styles.rowContainer}>
            <div className={styles.inputDescription}>REFERENCE</div>
            <TextInput
              value={description}
              placeholder="Add a note..."
              onChange={e => this.setState({ description: e.target.value })}
            />
          </div>
          <Button
            primary
            className={styles.submitButton}
            renderIcon={() => <GridIcon />}
            type="submit"
          >
            Generate Code
          </Button>
        </form>
      </div>
    )
  }
}
