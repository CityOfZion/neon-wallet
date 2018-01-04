// @flow
import React from 'react'
import classNames from 'classnames'
import { noop, omit, trim } from 'lodash'
import Sifter from 'sifter'

import Dropdown from './Dropdown'
import DropdownButton from './DropdownButton'
import styles from './SelectInput.scss'

type Props = {
  className?: string,
  value?: string,
  items: Array<Object>,
  renderItem: Function,
  renderAfter: Function,
  getItemValue: Function,
  onFocus?: Function,
  onChange?: Function
}

type State = {
  open: boolean,
  search: string
}

export default class SelectInput extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    renderAfter: (props) => <DropdownButton {...props} />,
    getItemValue: (item) => item,
    onFocus: noop,
    onChange: noop
  }

  state = {
    open: false,
    search: ''
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.value !== this.props.value) {
      this.setState({ search: trim(nextProps.value) })
    }
  }

  render = () => {
    const passDownProps = omit(this.props, 'items', 'renderItem', 'renderAfter', 'getItemValue')

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
          <div className={styles.afterInput}>
            {this.props.renderAfter && this.props.renderAfter({ onToggle: this.handleToggle })}
          </div>
        </div>
      </Dropdown>
    )
  }

  renderDropdown = ({ className }: { className: string }) => {
    const items = this.getItems()
    const hasItems = items.length > 0
    const isSearch = this.state.search.length > 0 && this.props.items && this.props.items.length > 0

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

  renderItems = (items: Array<Object>) => {
    return items.map((item) => {
      const renderItem = this.props.renderItem || this.renderItem
      return renderItem(item, { onSelect: this.generateSelectHandler(item) })
    })
  }

  renderItem = (item: Object, { onSelect }: { onSelect: Function }) => {
    const { getItemValue } = this.props
    return (
      <div className={styles.dropdownItem} key={getItemValue(item)} tabIndex={0} onClick={onSelect}>
        {item}
      </div>
    )
  }

  handleFocus = (event: Object, ...args: Array<any>) => {
    const { onFocus } = this.props
    event.persist()
    if (onFocus) {
      onFocus(event, ...args)
    }
    this.handleOpen()
  }

  handleChange = (event: Object, ...args: Array<any>) => {
    const { onChange } = this.props
    if (onChange) {
      onChange(event.target.value)
    }
  }

  handleOpen = () => {
    this.handleToggle(true)
  }

  handleClose = () => {
    this.handleToggle(false)
  }

  handleToggle = (open: boolean = !this.state.open) => {
    this.setState({ open, search: '' })
  }

  generateSelectHandler = (item: Object) => {
    return (event: Object) => {
      const { onChange, getItemValue } = this.props
      if (onChange) {
        onChange(getItemValue(item))
      }
      this.handleClose()
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
