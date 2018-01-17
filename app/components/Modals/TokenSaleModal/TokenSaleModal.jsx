// @flow
import React, { Component } from 'react'
import { get, pick } from 'lodash'

import { isZero } from '../../../core/math'
import { ASSETS } from '../../../core/constants'

import BaseModal from '../BaseModal'
import Button from '../../../components/Button'

import WarningText from './WarningText'
import SelectToken from './SelectToken'
import VerificationOptions from './VerificationOptions'
import ParticipationSuccess from './ParticipationSuccess'

import styles from './styles.scss'

type Props = {
  oldParticipateInSale: (string, string, string) => Promise<boolean>,
  participateInSale: (string, string, string, string) => Promise<boolean>,
  tokenBalances: {
    [key: SymbolType]: TokenBalanceType
  },
  assetBalances: {
    [key: SymbolType]: string
  },
  hideModal: () => void,
  showTokensModal: () => void
};

type State = {
  useVerification: boolean,
  assetBalancesToSend: {
    [key: SymbolType]: string
  },
  tokenToMint: SymbolType,
  participationSuccessful: boolean,
  gasCost: string,
  loaded: boolean,
};

export default class TokenSale extends Component<Props, State> {
  // $FlowFixMe
  state = {
    useVerification: false,
    assetBalancesToSend: {
      NEO: '0',
      GAS: '0'
    },
    tokenToMint: '',
    participationSuccessful: false,
    loaded: false,
    gasCost: '0' // hard coded for now
  };

  oldParticipateInSale = () => {
    const { oldParticipateInSale, tokenBalances } = this.props
    const { assetBalancesToSend, tokenToMint, gasCost } = this.state
    if (tokenToMint) {
      const scriptHash = get(tokenBalances[tokenToMint], 'scriptHash')

      oldParticipateInSale(assetBalancesToSend.NEO, scriptHash, gasCost).then(
        success => {
          if (success) {
            this.setState({
              participationSuccessful: true
            })
          }
        }
      )
    }
  };

  participateInSale = () => {
    const { participateInSale, tokenBalances } = this.props
    const { assetBalancesToSend, tokenToMint, gasCost } = this.state
    if (tokenToMint) {
      const scriptHash = get(tokenBalances[tokenToMint], 'scriptHash')

      participateInSale(
        assetBalancesToSend.NEO,
        assetBalancesToSend.GAS,
        scriptHash,
        gasCost
      ).then(success => {
        if (success) {
          this.setState({
            participationSuccessful: true
          })
        }
      })
    }
  };

  render () {
    const {
      assetBalancesToSend,
      useVerification,
      tokenToMint,
      participationSuccessful
    } = this.state
    const {
      hideModal,
      tokenBalances,
      assetBalances,
      showTokensModal
    } = this.props

    const shouldDisablePurchaseButton =
      (isZero(assetBalancesToSend.NEO) && isZero(assetBalancesToSend.GAS)) || !tokenToMint

    return (
      <BaseModal
        title={participationSuccessful ? 'Participation successful' : 'Participate in a token sale'}
        hideModal={hideModal}
        style={{ content: { width: '925px', height: '700px' } }}
      >
        {participationSuccessful ? (
          <ParticipationSuccess
            hideModal={hideModal}
            token={tokenBalances[tokenToMint]}
            assetBalancesToSend={
              useVerification
                ? assetBalancesToSend
                : pick(assetBalancesToSend, ASSETS.NEO)
            }
          />
        ) : (
          <div className={styles.tokenSale}>
            <WarningText />

            <SelectToken
              onChangeToken={(symbol: SymbolType) =>
                this.setState({ tokenToMint: symbol })
              }
              onChangeAmount={(symbol: SymbolType, amount: string) =>
                this.setState({
                  assetBalancesToSend: {
                    ...assetBalancesToSend,
                    [symbol]: amount
                  }
                })
              }
              assetBalancesToSend={assetBalancesToSend}
              tokenBalances={tokenBalances}
              assetBalances={
                useVerification
                  ? assetBalances
                  : pick(assetBalances, ASSETS.NEO)
              }
              tokenToMint={tokenToMint}
              showTokensModal={showTokensModal}
            />

            <VerificationOptions
              isVerified={useVerification}
              onChange={useVerification => this.setState({ useVerification })}
            />

            <div className={styles.purchaseButton}>
              <Button
                onClick={
                  useVerification
                    ? this.participateInSale
                    : this.oldParticipateInSale
                }
                disabled={shouldDisablePurchaseButton}
              >
                Purchase!
              </Button>
            </div>
          </div>
        )}
      </BaseModal>
    )
  }
}
