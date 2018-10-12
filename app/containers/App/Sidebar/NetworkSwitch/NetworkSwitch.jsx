// @flow
import React, { Component } from 'react'

import classNames from 'classnames'
import StyledReactSelect from '../../../../components/Inputs/StyledReactSelect/StyledReactSelect'
import { getNetworks } from '../../../../core/networks'
import styles from './NetworkSwitch.scss'

type Props = {
  onChange: Function,
  handleControlledChange: Function,
  className: string,
  disabled: boolean,
  networks: Array<NetworkItemType>,
  transparent: boolean,
  shouldSwitchNetworks: boolean,
  fontSize: number,
  value: NetworkItemType
}

// type State = {
//   option: NetworkItemType
// }

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks(),
    shouldSwitchNetworks: true
  }

  // state = {
  //   option:
  //     this.props.networks.find(
  //       network => network.id === this.props.networkId
  //     ) || this.props.networks[0]
  // }

  render() {
    const {
      networks,
      className,
      disabled,
      transparent,
      fontSize,
      value
    } = this.props

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <StyledReactSelect
          fontSize={fontSize}
          transparent={transparent}
          hideHighlight
          disabled={disabled}
          value={value}
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
    this.props.handleControlledChange(option)
    // return this.setState({ option })
  }
}
