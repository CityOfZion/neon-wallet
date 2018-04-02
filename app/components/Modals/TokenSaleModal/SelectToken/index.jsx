// @flow
import React from 'react'

import { COIN_DECIMAL_LENGTH } from '../../../../core/formatters'

import AssetInput from '../../../../components/Inputs/AssetInput'
import NumberInput from '../../../../components/NumberInput'

import styles from './styles.scss'
import commonStyles from '../styles.scss'

type Props = {
  onChangeScriptHash: string => any,
  onChangeAmount: (SymbolType, string) => any,
  assetBalancesToSend: {
    [key: SymbolType]: string
  },
  assetBalances: {
    [key: SymbolType]: string
  },
  scriptHash: string
}

type State = {
  selectedAsset: SymbolType
}

class SelectToken extends React.Component<Props, State> {
  state = {
    selectedAsset: Object.keys(this.props.assetBalances)[0]
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.assetBalances !== nextProps.assetBalances) {
      this.setState({
        selectedAsset: Object.keys(nextProps.assetBalances)[0]
      })
    }
  }

  render () {
    const {
      onChangeScriptHash,
      assetBalances,
      onChangeAmount,
      scriptHash,
      assetBalancesToSend
    } = this.props

    const { selectedAsset } = this.state

    const assetBalance = assetBalances[selectedAsset]
    const balanceToSend = assetBalancesToSend[selectedAsset]

    return (
      <div className={styles.container}>
        <div className={commonStyles.sectionHeading}>
          Fill out the details below to participate
        </div>
        <div className={styles.section}>
          <div className={styles.heading}>
            <strong>Fill in the details below to participate in a token sale</strong>
          </div>
          <div className={styles.content}>
            <div className={styles.mint}>
              <div className={styles.mintBody}>
                <div className={styles.label}>Enter ICO token script hash to purchase</div>
                <div>
                  <input
                    type='text'
                    placeholder='Enter token script hash'
                    value={scriptHash}
                    className={styles.assetInput}
                    onChange={(event) => onChangeScriptHash(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.assets}>
              <div className={styles.assetsBody}>
                <div className={styles.label}>What are you purchasing with?</div>
                <AssetInput
                  symbols={Object.keys(assetBalances)}
                  value={selectedAsset}
                  onChange={asset => this.setState({ selectedAsset: asset }, () => {
                    onChangeAmount(asset, '')
                  })}
                  className={styles.assetInput}
                />

                <div className={styles.label}>Amount of {selectedAsset}</div>
                <NumberInput
                  className={styles.numberInput}
                  max={assetBalance}
                  value={balanceToSend}
                  placeholder='Amount'
                  options={{ numeralDecimalScale: COIN_DECIMAL_LENGTH }}
                  onChange={amount => onChangeAmount(selectedAsset, amount)}
                />
              </div>
              <div className={styles.footer}>
                <strong>Your {selectedAsset} balance:</strong> {assetBalance}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectToken
