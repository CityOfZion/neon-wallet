// @flow
import React, { Component } from 'react'
import { FormattedMessage, IntlShape } from 'react-intl'
import { api } from '@cityofzion/neon-js-legacy-latest'
import { rpc as n3Rpc, u as n3U } from '@cityofzion/neon-js'

import Button from '../../components/Button'
import Tooltip from '../../components/Tooltip'
import { formatGAS } from '../../core/formatters'
import { toBigNumber } from '../../core/math'
import ClaimIcon from '../../assets/icons/claim.svg'
import { getNode, getRPCEndpoint } from '../../actions/nodeStorageActions'

type Props = {
  className: ?string,
  GAS: number,
  doGasClaim: Function,
  disableClaimButton: boolean,
  claimAmount: string,
  isWatchOnly?: boolean,
  intl: IntlShape,
  chain: string,
}

type State = {
  claimAmount: string,
}

export default class Claim extends Component<Props, State> {
  intervalId: ?number

  state = {
    claimAmount: 0,
  }

  render() {
    const { className, isWatchOnly, chain } = this.props
    const { claimAmount } = this.state
    const disabled = this.isDisabled()

    // console.log('claimAmount', { disabled })

    return (
      <div>
        <Tooltip
          title={this.tooltipText(isWatchOnly, claimAmount, chain)}
          disabled={!disabled}
        >
          <Button
            id="claim"
            className={className}
            disabled={disabled}
            primary
            renderIcon={ClaimIcon}
            onClick={isWatchOnly ? () => {} : this.handleClaim}
          >
            <FormattedMessage
              id="dashboardGasClaimButton"
              values={{ amount: this.getFormattedAmount() }}
            />
          </Button>
        </Tooltip>
      </div>
    )
  }

  // let endpoint = await getNode(net)
  // if (!endpoint) {
  //   endpoint = await getRPCEndpoint(net)
  // }

  // if (chain === 'neo2') {
  //   const unclaimed = await api.neoCli.getMaxClaimAmount(endpoint, address)
  //   return { total: unclaimed.toRawNumber().toString() }
  // }

  // const rpcClient = new n3Rpc.RPCClient(endpoint)
  // try {
  //   const query = {
  //     method: 'getunclaimedgas',
  //     params: [address],
  //   }

  //   const response = await rpcClient.execute(new n3Rpc.Query(query))

  //   const { unclaimed } = response

  //   return {
  //     total: n3U.BigInteger.fromNumber(unclaimed).toDecimal(8),
  //   }
  // } catch (e) {
  //   console.error(e)
  //   return { total: '0' }
  // }

  async componentDidMount() {
    const { chain, net, address } = this.props
    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }

    if (chain === 'neo2') {
      const unclaimed = await api.neoCli.getMaxClaimAmount(endpoint, address)
      console.log({ unclaimed })
      // console.log({ unclaimed })
      // return { total: unclaimed.toRawNumber().toString() }
      return this.setState({ claimAmount: unclaimed.toRawNumber().toString() })
    }

    const rpcClient = new n3Rpc.RPCClient(endpoint)
    try {
      const query = {
        method: 'getunclaimedgas',
        params: [address],
      }

      const response = await rpcClient.execute(new n3Rpc.Query(query))

      const { unclaimed } = response

      console.log({ unclaimed })

      return this.setState({
        claimAmount:
          unclaimed === '0'
            ? 0
            : n3U.BigInteger.fromNumber(unclaimed).toDecimal(8),
      })
    } catch (e) {
      console.error(e)
      return this.setState({ claimAmount: 0 })
      // return { total: '0' }
    }
  }

  handleClaim = () => {
    const { chain } = this.props
    this.props.doGasClaim(chain)
  }

  isDisabled = () => {
    const { disableClaimButton, isWatchOnly, chain, GAS } = this.props
    const { claimAmount } = this.state
    // console.log('claimAmount', { chain })
    if (chain === 'neo3') {
      return (
        disableClaimButton ||
        toBigNumber(GAS).lt(0.01120527) ||
        isWatchOnly ||
        !claimAmount
      )
    }
    // debugger
    // console.log({ claimAmount })

    // console.log(
    //   'claimAmount',
    //   disableClaimButton ||
    //     toBigNumber(claimAmount).eq(0) ||
    //     isWatchOnly ||
    //     claimAmount === '0',
    // )
    return (
      disableClaimButton ||
      toBigNumber(claimAmount).eq(0) ||
      isWatchOnly ||
      !claimAmount
    )
  }

  getFormattedAmount = () => formatGAS(this.state.claimAmount)

  tooltipText = (
    isWatchOnly?: boolean,
    claimAmount: string,
    chain: string,
  ): string => {
    const { intl } = this.props
    if (isWatchOnly)
      return intl.formatMessage({ id: 'claimUnavailableInWatch' })
    if (chain === 'neo3') {
      if (toBigNumber(claimAmount).eq(0)) {
        return intl.formatMessage({ id: 'noClaimableGas' })
      }
      if (toBigNumber(claimAmount).lte(0.01120527)) {
        return intl.formatMessage({ id: 'claimFeeGreater' })
      }
      return intl.formatMessage({ id: 'claimFeeDisclaimerN3' })
    }
    return toBigNumber(claimAmount).eq(0)
      ? intl.formatMessage({ id: 'noClaimableGas' })
      : intl.formatMessage({ id: 'claimTimeDisclaimer' })
  }
}
