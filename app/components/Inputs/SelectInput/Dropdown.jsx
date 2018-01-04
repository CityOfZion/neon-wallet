// @flow
import React from 'react'
import classNames from 'classnames'
import withClickOutside from 'react-click-outside'
import { noop } from 'lodash'

import styles from './Dropdown.scss'

declare type NodeOrNodes = React$Node | Array<React$Node>

type Props = {
  className: string,
  children: NodeOrNodes,
  open: boolean,
  onClose: Function,
  renderDropdown: Function
}

class Dropdown extends React.Component<Props> {
  static defaultProps = {
    open: false,
    onClose: noop,
    renderDropdown: noop
  }

  render = () => {
    return (
      <div className={classNames(styles.dropdown, this.props.className)}>
        <div className={styles.anchor}>
          {this.props.children}
        </div>
        {this.renderContent()}
      </div>
    )
  }

  renderContent = () => {
    if (this.props.open) {
      const DropdownContent = this.props.renderDropdown
      return <DropdownContent className={styles.content} />
    }
  }

  handleClickOutside = () => {
    this.props.onClose()
  }
}

export default withClickOutside(Dropdown)
