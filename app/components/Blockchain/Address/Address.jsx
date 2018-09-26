// @flow
import React from 'react'
import type { Node } from 'react'
import classNames from 'classnames'

import { openExplorerAddress } from '../../../core/explorer'
import styles from './Address.scss'

type Props = {
  className?: string,
  networkId: NetworkType,
  explorer: ExplorerType,
  address: string,
  asWrapper: boolean,
  children: Array<Node>
}

export default class Address extends React.Component<Props> {
  render = () => {
    const { address, className, asWrapper, children } = this.props

    if (asWrapper) {
      return (
        <div className={className} onClick={this.handleClick}>
          {children}
        </div>
      )
    }

    return (
      <span
        className={classNames(styles.address, className)}
        onClick={this.handleClick}
      >
        {address}
      </span>
    )
  }

  handleClick = () => {
    const { networkId, explorer, address } = this.props
    openExplorerAddress(networkId, explorer, address)
  }
}
