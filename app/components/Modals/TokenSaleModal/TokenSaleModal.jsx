// @flow
import React from 'react'
import { map, every, times, constant } from 'lodash'

import { isZero, isNumber } from '../../../core/math'
import { ASSETS } from '../../../core/constants'

import BaseModal from '../BaseModal'
import Tooltip from '../../Tooltip'
import Button from '../../Button'

import WarningText from './WarningText'
import SelectToken from './SelectToken'
import ParticipationSuccess from './ParticipationSuccess'

import styles from './styles.scss'

const WARNINGS = [
  'I understand that submitting NEO or GAS multiple times may result in a loss of funds or a delayed refund depending on the policy of the ICO company.',
  'I understand that some sales may only accept NEO or GAS, and I have verified which is accepted.',
  'I understand that if I send NEO or GAS to a token sale that has already ended, I will lose my NEO/GAS and will not be refunded.',
  'I understand that I should only click the ‘Purchase!’ button once.',
  'I understand that City of Zion (CoZ) is not responsible for my usage of this feature, and I have consulted this software\'s licenses.'
]

type Props = {
  participateInSale: (string, string, string, string) => Promise<boolean>,
  tokenBalances: {
    [key: SymbolType]: TokenBalanceType
  },
  assetBalances: {
    [key: SymbolType]: string
  },
  hideModal: () => void
}

type State = {
  assetBalancesToSend: {
    [key: SymbolType]: string
  },
  scriptHash: string,
  participationSuccessful: boolean,
  gasCost: string,
  loaded: boolean,
  agreements: Array<boolean>
}

const initialBalancesToSend = { [ASSETS.NEO]: '', [ASSETS.GAS]: '' }

export default class TokenSale extends React.Component<Props, State> {
  state = {
    assetBalancesToSend: initialBalancesToSend,
    scriptHash: '',
    participationSuccessful: false,
    loaded: false,
    gasCost: '0', // hard coded for now
    agreements: times(WARNINGS.length, constant(false))
  }

  participateInSale = async () => {
    const { participateInSale } = this.props
    const { assetBalancesToSend, scriptHash, gasCost } = this.state

    if (scriptHash) {
      const amountNEO = assetBalancesToSend[ASSETS.NEO] || '0'
      const amountGAS = assetBalancesToSend[ASSETS.GAS] || '0'
      const success = await participateInSale(amountNEO, amountGAS, scriptHash, gasCost)

      if (success) {
        this.setState({ participationSuccessful: true })
      }
    }
  }

  isValid = () => {
    const { assetBalancesToSend } = this.state
    const NEO = assetBalancesToSend.NEO || '0'
    const GAS = assetBalancesToSend.GAS || '0'

    if (!isNumber(NEO) || !isNumber(GAS)) {
      return false
    }

    if (isZero(NEO) && isZero(GAS)) {
      return false
    }

    if (!every(this.state.agreements)) {
      return false
    }

    return true
  }

  render () {
    const { participationSuccessful } = this.state

    return (
      <BaseModal
        title={participationSuccessful ? 'Participation successful' : 'Participate in a token sale'}
        hideModal={this.props.hideModal}
        style={{ content: { width: '925px', height: '700px' } }}
      >
        {participationSuccessful ? this.renderSuccess() : this.renderPurchase()}
      </BaseModal>
    )
  }

  renderSuccess = () => {
    const { hideModal } = this.props
    const { assetBalancesToSend, scriptHash } = this.state

    return (
      <ParticipationSuccess
        hideModal={hideModal}
        scriptHash={scriptHash}
        assetBalancesToSend={assetBalancesToSend}
      />
    )
  }

  renderPurchase = () => {
    const { assetBalancesToSend, scriptHash } = this.state
    const { tokenBalances, assetBalances } = this.props
    const valid = this.isValid()

    return (
      <div className={styles.tokenSale}>
        <SelectToken
          onChangeScriptHash={(scriptHash: string) => this.setState({ scriptHash })}
          onChangeAmount={(symbol: SymbolType, amount: string) =>
            this.setState({ assetBalancesToSend: { ...initialBalancesToSend, [symbol]: amount } })
          }
          assetBalancesToSend={assetBalancesToSend}
          tokenBalances={tokenBalances}
          assetBalances={assetBalances}
          scriptHash={scriptHash}
        />

        <WarningText>
          {map(WARNINGS, this.renderWarning)}
        </WarningText>

        <div className={styles.purchaseButton}>
          <Tooltip title='Please agree to the terms of purchase' position='top' disabled={valid}>
            <Button onClick={this.participateInSale} disabled={!valid}>
              Purchase!
            </Button>
          </Tooltip>
        </div>
      </div>
    )
  }

  renderWarning = (message: string, index: number) => {
    return (
      <li key={index}>
        <label>
          <input
            type='checkbox'
            checked={this.state.agreements[index]}
            onChange={this.handleChangeAgreementCurry(index)}
          />
          {message}
        </label>
      </li>
    )
  }

  handleChangeAgreementCurry = (index: number) => {
    return (event: Object) => {
      const agreements = [...this.state.agreements]
      agreements.splice(index, 1, event.target.checked)
      this.setState({ agreements })
    }
  }
}
