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
  shouldSwitchNetworks: boolean,
  fontSize: number
}

type State = {
  option: NetworkItemType
}

export default class NetworkSwitch extends Component<Props, State> {
  static defaultProps = {
    networks: getNetworks(),
    shouldSwitchNetworks: true
  }

  state = {
    option:
      this.props.networks.find(
        network => network.id === this.props.networkId
      ) || this.props.networks[0]
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

    const { option } = this.state

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <StyledReactSelect
          fontSize={fontSize}
          transparent={transparent}
          hideHighlight
          disabled={disabled}
          value={option}
          onChange={this.handleChange}
          options={networks}
          isSearchable={false}
        />
      </div>
    )
  }

  handleChange = (option: NetworkItemType) => {
    if (this.props.shouldSwitchNetworks) {
      return this.props.onChange(option.id)
    }
    return this.setState({ option })
  }
}
