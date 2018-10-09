// @flow
import React, { Component } from 'react'

import classNames from 'classnames'
import StyledReactSelect from '../../../../components/Inputs/StyledReactSelect/StyledReactSelect'
import { getNetworks } from '../../../../core/networks'
import styles from './NetworkSwitch.scss'

type Props = {
  networkId: string,
  onChange: Function,
  className: string,
  value: string,
  disabled: boolean,
  networks: Array<NetworkItemType>,
  transparent: boolean,
  fontSize: number
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks()
  }

  render() {
    const {
      networks,
      className,
      value,
      disabled,
      transparent,
      fontSize
    } = this.props

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <StyledReactSelect
          fontSize={fontSize}
          transparent={transparent}
          hideHighlight
          disabled={disabled}
          value={value || this.getSelectValue()}
          onChange={this.handleChange}
          options={networks}
          isSearchable={false}
        />
      </div>
    )
  }

  getSelectValue = () => {
    const { networkId, networks } = this.props
    const currentNetwork = networks.find(network => network.id === networkId)
    if (currentNetwork) {
      return currentNetwork
    }
    return networks[0]
  }

  handleChange = (option: NetworkItemType) => {
    this.props.onChange(option.id)
  }
}
