// @flow
import React from 'react'
import classNames from 'classnames'
import { noop, omit, trim, includes, lowerCase } from 'lodash'

import Dropdown from './Dropdown'
import DropdownButton from './DropdownButton'
import styles from './SelectInput.scss'

type Props = {
  className?: string,
  value?: string,
  items: Array<any>,
  renderItem: Function,
  renderAfter: Function,
  getItemValue: Function,
  getSearchResults: Function,
  onFocus?: Function,
  onChange?: Function
}

type State = {
  open: boolean,
  search: string
}

const defaultRenderAfter = (props) => <DropdownButton {...props} />

const defaultItemValue = (item) => item

const defaultSearchResults = (items, term) => {
  return items.filter((item) => includes(lowerCase(item), lowerCase(term)))
}

export default class SelectInput extends React.Component<Props, State> {
  static defaultProps = {
    items: [],
    renderAfter: defaultRenderAfter,
    getItemValue: defaultItemValue,
    getSearchResults: defaultSearchResults,
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
    const passDownProps = omit(this.props, 'items', 'renderItem', 'renderAfter', 'getItemValue', 'getSearchResults')

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

  renderItems = (items: Array<any>) => {
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
    const { search } = this.state

    if (search.length === 0) {
      return items
    } else {
      return this.props.getSearchResults(items, search)
    }
  }
}
