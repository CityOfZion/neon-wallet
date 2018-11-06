// @flow
import React from 'react'
import classNames from 'classnames'
import { get } from 'lodash-es'

import AssetInput from '../../Inputs/AssetInput'
import NumberInput from '../../Inputs/NumberInput'
import TextInput from '../../Inputs/TextInput'
import Button from '../../Button/Button'
import { Address } from '../../Blockchain'
import { ASSETS, TOKENS } from '../../../core/constants'
import { formatNEO } from '../../../core/formatters'
import GridIcon from '../../../assets/icons/grid.svg'

import styles from './styles.scss'
import { toBigNumber, toNumber } from '../../../core/math'

type Props = {
  className?: string,
  address: string,
  onSubmit: Function,
  networkId: string
}

type State = {
  asset: ?string,
  amount: ?number | ?string,
  description: ?string,
  error: ?string
}

export default class QRCodeForm extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    asset: ASSETS.NEO,
    amount: undefined,
    description: undefined,
    error: undefined
  }

  render() {
    const { className, address, onSubmit } = this.props
    const { asset, amount, description } = this.state
    const symbols = [ASSETS.NEO, ASSETS.GAS, ...Object.keys(TOKENS)]

    return (
      <div className={classNames(styles.receivePanel, className)}>
        <form
          className={styles.form}
          onSubmit={() => {
            if (this.validateForm()) {
              onSubmit({
                address,
                asset:
                  (TOKENS[asset] && TOKENS[asset].networks['1'].hash) || asset,
                amount,
                description
              })
            }
          }}
        >
          <div className={styles.amountContainer}>
            <div className={styles.asset}>
              <div className={styles.inputDescription}>ASSET</div>
              <AssetInput
                symbols={symbols}
                value={{ label: asset, value: asset }}
                onChange={value => this.setState({ asset: value, amount: 0 })}
              />
            </div>
            <div className={styles.amount}>
              <div className={styles.inputDescription}>AMOUNT</div>
              <NumberInput
                value={amount}
                placeholder="Amount"
                options={{
                  numeralDecimalScale: 8
                }}
                error={this.state.error}
                // this is a hack because Cleave will not update
                // when props change https://github.com/nosir/cleave.js/issues/352
                onChange={(e, value) =>
                  this.setState({
                    amount: !this.determineDecimalScale()
                      ? formatNEO(value || 0)
                      : value || 0
                  })
                }
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
            shouldCenterButtonLabelText
            className={styles.submitButton}
            renderIcon={() => <GridIcon />}
            disabled={!amount}
            type="submit"
          >
            Generate QR Code
          </Button>
        </form>
      </div>
    )
  }

  validateForm = () => {
    const { amount, asset } = this.state
    const { networkId } = this.props

    let valid = false

    if (asset && amount) {
      const decpoint =
        amount.toString().length - 1 - amount.toString().indexOf('.')

      const validDecimals = get(
        TOKENS[asset],
        `networks.${networkId}.decimals`,
        8
      )
      if (decpoint > validDecimals && asset !== 'NEO') {
        valid = false
        this.setState({
          error: `You can only request ${asset} up to ${validDecimals} decimals.`
        })
      }
      if (toBigNumber(amount.toString()).greaterThan(toBigNumber(1000000000))) {
        valid = false
        this.setState({
          error: `You cannot request more than 100,000,000 ${asset}.`
        })
      }
      if (!toNumber(amount.toString())) {
        valid = false
        this.setState({
          error: `You cannot request 0 ${asset}.`
        })
      } else {
        valid = true
      }
    }
    return valid
  }

  determineDecimalScale = () => {
    const { asset } = this.state
    const { networkId } = this.props
    if (asset === ASSETS.NEO) return 0
    if (asset === ASSETS.GAS) return 8
    return get(TOKENS[this.state.asset], `networks.${networkId}.decimals`, 8)
  }
}
