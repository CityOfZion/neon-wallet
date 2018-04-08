// @flow
import React from 'react'

import { COIN_DECIMAL_LENGTH } from '../../../../core/formatters'

import AssetInput from '../../../../components/Inputs/AssetInput'
import NumberInput from '../../../../components/NumberInput'
import Button from '../../../../components/Button'

import styles from './styles.scss'
import commonStyles from '../styles.scss'

type Props = {
  onChangeToken: string => any,
  onChangeAmount: (SymbolType, string) => any,
  assetBalancesToSend: {
    [key: SymbolType]: string
  },
  tokenBalances: {
    [key: SymbolType]: TokenBalanceType
  },
  assetBalances: {
    [key: SymbolType]: string
  },
  tokenToMint: SymbolType,
  showTokensModal: () => any,
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
      onChangeToken,
      showTokensModal,
      assetBalances,
      onChangeAmount,
      tokenBalances,
      tokenToMint,
      assetBalancesToSend
    } = this.props

    const { selectedAsset } = this.state

    const assetBalance = assetBalances[selectedAsset]
    let token
    if (tokenToMint) {
      token = tokenBalances[tokenToMint]
    }
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
                <div>
                  <div className={styles.label}>
                    Select ICO token to purchase
                  </div>
                  <div>
                    <AssetInput
                      placeholder='Choose token'
                      symbols={Object.keys(tokenBalances)}
                      value={tokenToMint}
                      onChange={symbol => onChangeToken(symbol)}
                      className={styles.assetInput}
                    />
                  </div>
                </div>
                <div>
                  <div className={styles.label}>
                    Token not in the list?
                  </div>
                  <div>
                    <Button onClick={() => showTokensModal()} className={styles.purchaseBtn}>
                      + Add a new token to purchase
                    </Button>
                  </div>
                </div>
              </div>

              <div className={styles.footer}>
                {token &&
                <div>
                  <div><strong>Token Script Hash:</strong> {token.scriptHash}</div>
                  <div><strong>Token Name:</strong> {token.name}</div>
                </div>
                }
              </div>
            </div>

            <div className={styles.assets}>
              <div className={styles.assetsBody}>
                <div>
                  <div className={styles.label}>What are you purchasing with?</div>
                  <AssetInput
                    symbols={Object.keys(assetBalances)}
                    value={selectedAsset}
                    onChange={asset => this.setState({ selectedAsset: asset }, () => {
                      onChangeAmount(asset, '')
                    })}
                    className={styles.assetInput}
                  />
                </div>
                <div>
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
