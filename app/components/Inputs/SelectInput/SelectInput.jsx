// @flow
import React from 'react'
import classNames from 'classnames'
import { noop, omit, trim } from 'lodash'
import Sifter from 'sifter'

import Dropdown from './Dropdown'
import styles from './SelectInput.scss'

type Props = {
  className?: string,
  value?: string,
  items?: Array<Object>,
  renderItem?: Function,
  renderAfter?: Function,
  onFocus?: Function,
  onChange?: Function
}

type State = {
  open: boolean,
  searchTerm: string
}

export default class SelectInput extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    onFocus: noop,
    onChange: noop
  }

  state = {
    open: false,
    search: this.props.value || ''
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.value !== this.props.value) {
      this.setState({ search: trim(nextProps.value) })
    }
  }

  render = () => {
    const passDownProps = omit(this.props, 'items', 'renderItem', 'renderAfter')

    return (
      <Dropdown
        className={classNames(styles.selectInput, this.props.className)}
        open={this.state.open}
        onClose={this.handleClose}
        renderDropdown={this.renderDropdown}>
        <div className={styles.inputContainer}>
          <input
            {...passDownProps}
            className={styles.input}
            type='text'
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
          {this.renderAfter()}
        </div>
      </Dropdown>
    )
  }

  renderDropdown = ({ className }) => {
    const items = this.getItems()
    const hasItems = items.length > 0
    const isSearch = this.state.search.length > 0 && this.props.items.length > 0

    if (hasItems) {
      return (
        <div className={classNames(styles.dropdown, className)}>
          {this.renderItems(items)}
        </div>
      )
    } else if (isSearch) {
      return (
        <div className={classNames(styles.dropdown, styles.noSearchResults, className)}>
          No search results.
        </div>
      )
    } else {
      return null
    }
  }

  renderItems = (items) => {
    return items.map((item) => {
      const renderItem = this.props.renderItem || this.renderItem
      return renderItem(item, { onSelect: this.generateSelectHandler(item) })
    })
  }

  renderItem = (item, { onSelect }) => {
    return (
      <div className={styles.dropdownItem} key={item.value} tabIndex={0} onClick={onSelect}>
        <div className={styles.label}>{item.label}</div>
        <div className={styles.value}>{item.value}</div>
      </div>
    )
  }

  renderAfter = () => {
    if (this.props.renderAfter) {
      return (
        <div className={styles.afterInput}>
          {this.props.renderAfter()}
        </div>
      )
    }
  }

  handleFocus = (event: Event, ...args: Array<any>) => {
    this.props.onFocus(event, ...args)
    this.setState({ open: true })
  }

  handleChange = (event: Event, ...args: Array<any>) => {
    this.props.onChange(event.target.value)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  generateSelectHandler = (item) => {
    return (event) => {
      this.props.onChange(item.value)
      this.setState({ open: false })
    }
  }

  getItems = () => {
    const { items } = this.props
    const sifter = new Sifter(items)
    const result = sifter.search(this.state.search, {
      fields: ['label', 'value'],
      sort: [{ field: 'label', direction: 'asc' }]
    })
    return result.items.map((resultItem) => items[resultItem.id])
  }
}
